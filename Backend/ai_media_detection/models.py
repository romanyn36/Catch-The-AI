from django.db import models
import os


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    # check inistane type
    if isinstance(instance, Users):
         # in case of user or user and admin table 
        return f'user_{instance.pk}/{filename}'
    elif isinstance(instance, Admin):
        # in case of admin table
        return f'staff_{instance.pk}/{filename}'
    elif isinstance(instance, DataHistory):
        # in data history table
        # cjeck the media type that is not null or empty
        if instance.image:
            media_type = 'image'
        elif instance.audio:
            media_type = 'audio'
        return f'user_{instance.user.pk}/{media_type}/{filename}'
       

class Subscription(models.Model):
    plan_name = models.CharField(max_length=100)
    price = models.IntegerField()
    size_limit = models.IntegerField()
    attempts_limits = models.IntegerField()
    duration = models.IntegerField()
    # save numeber of attempts
    history_limit = models.IntegerField()

    def __str__(self):
        return self.plan_name
    


# Create your models here.
class Users(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=50)
    age = models.IntegerField()
    country = models.CharField(max_length=100)
    basic_blan_id=Subscription.objects.filter(plan_name='Basic').first().id
    subscription = models.ForeignKey(Subscription,on_delete=models.CASCADE,default=basic_blan_id)
    subscription_start_date = models.DateField(null=True,blank=True)
    subscription_end_date = models.DateField(null=True,blank=True)
    remain_attempts = models.IntegerField(default=5)
    image=models.ImageField(upload_to=user_directory_path,default='default.png')

    # replace the image if alreeady exist
    def save(self, *args, **kwargs):
        # Check if a new image was uploaded
        if self.pk:
            try:
                old_user = Users.objects.get(pk=self.pk)
           
                if old_user.image != self.image :
                    if old_user.image.name != 'default.png':
                        # Delete the old image file if it exists
                        if os.path.isfile(old_user.image.path):
                            os.remove(old_user.image.path)
            except Users.DoesNotExist:
                pass
        super().save(*args, **kwargs)



    def __str__(self):
        return self.name
    
class Admin(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=50)
    role = models.CharField(max_length=50,default='staff')
    image=models.ImageField(upload_to=user_directory_path,default='default.png')
     # replace the image if alreeady exist
    def save(self, *args, **kwargs):
        # Check if a new image was uploaded
        if self.pk:
            try:
                old_admin = Admin.objects.get(pk=self.pk)
                if old_admin.image != self.image:
                    if old_admin.image.name != 'default.png':
                        # Delete the old image file if it exists
                        if os.path.isfile(old_admin.image.path) :
                            os.remove(old_admin.image.path)
            except Users.DoesNotExist:
                pass
        super().save(*args, **kwargs)


    def __str__(self):
        return self.name
    






class DataHistory(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    media_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    audio = models.FileField(upload_to=user_directory_path, null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    attemptTime = models.DateTimeField(auto_now_add=True)
    modelResult = models.CharField(max_length=100)
    media_size = models.IntegerField()

    def __str__(self):
        return self.media_name
    
    class Meta:
        ordering = ['-attemptTime']