from django.db import models

# Create your models here.
class Users(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=50)
    age = models.IntegerField()
    country = models.CharField(max_length=100)
    subscription = models.ForeignKey('Subscription',on_delete=models.CASCADE,null=True,blank=True)
    subscription_start_date = models.DateField(null=True,blank=True)
    subscription_end_date = models.DateField(null=True,blank=True)
    remain_attempts = models.IntegerField(default=5)



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

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return f'user_{instance.user.name}/{filename}'

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