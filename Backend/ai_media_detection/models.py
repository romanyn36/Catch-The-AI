from django.db import models
import os


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    try:
        return f'user_{instance.user.name}/{filename}'
    except:
        return f'user_{instance.name}/{filename}'

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
                old_course = Users.objects.get(pk=self.pk)
                if old_course.image != self.image:
                    if old_course.image.name != 'default.jpg':
                        # Delete the old image file if it exists
                        if os.path.isfile(old_course.image.path):
                            os.remove(old_course.image.path)
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
    permission = models.CharField(max_length=50)

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