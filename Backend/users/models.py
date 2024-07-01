from django.db import models
from datetime import timedelta, datetime
from django.utils import timezone
# Create your models here.
from django.db import models
import os
import shutil


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
    is_activated = models.BooleanField(default=False)
    basic_blan_id=Subscription.objects.filter(plan_name='Basic').first().id
    subscription = models.ForeignKey(Subscription,on_delete=models.CASCADE,default=basic_blan_id)
    subscription_start_date = models.DateField(null=True,blank=True)
    subscription_end_date = models.DateField(null=True,blank=True)
    remain_attempts = models.IntegerField(default=5)
    image=models.ImageField(upload_to=user_directory_path,default='default.png')
    reset_code=models.CharField(max_length=50,blank=True,null=True)
    reset_expire=models.DateTimeField(blank=True,null=True)

    def generate_reset_code(self):
        import random
        import string
        code = ''.join(random.choices(string.digits , k=6))
        self.reset_code = code
        # set expire time to 1 hour
        self.reset_expire = timezone.now() + timedelta(minutes=15)
        self.save()
        return code,self.reset_expire
        
    def delete(self, *args, **kwargs):
        user_folder_path = f'media/user_{self.pk}'
        if os.path.isdir(user_folder_path):
            # Force delete the folder even if it is not empty
            shutil.rmtree(user_folder_path)
        super().delete(*args, **kwargs)

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

    def delete(self, *args, **kwargs):
        admin_folder_path = f'media/staff_{self.pk}'
        if os.path.isdir(admin_folder_path):
            # Force delete the folder even if it is not empty
            shutil.rmtree(admin_folder_path)
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.name
    


class AnonymousAttempt(models.Model):
    ip_address = models.CharField(max_length=40)  # Store user's IP address
    attempts_left = models.PositiveIntegerField(default=5)  # Number of attempts allowed
    last_attempt = models.DateTimeField(default=timezone.now)  # Timestamp of last attempt

    def __str__(self):
        return f"Anonymous User (IP: {self.ip_address}) - Attempts Left: {self.attempts_left}"

    def can_make_request(self):
        # reset the attempts if the last attempt was more than 1 minute ago
        # Check if the attempt date is older than today
        if self.last_attempt.date() < timezone.now().date():
            self.attempts_left = 5  # Reset attempts if a new day
            self.last_attempt = timezone.now()
        if self.attempts_left > 0:
            self.attempts_left -= 1
            self.last_attempt = timezone.now()
            self.save()
            return True
        return False

class DataHistory(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    media_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    audio = models.FileField(upload_to=user_directory_path, null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    attemptTime = models.DateTimeField(auto_now_add=True)
    modelResult = models.CharField(max_length=100)
    media_size = models.CharField(max_length=100,default='0 KB')

    def __str__(self):
        return self.media_name
    # make when delete the record delete the file from the media
    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        if self.audio:
            if os.path.isfile(self.audio.path):
                os.remove(self.audio.path)
        super().delete(*args, **kwargs)
    
    class Meta:
        ordering = ['-attemptTime']


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']