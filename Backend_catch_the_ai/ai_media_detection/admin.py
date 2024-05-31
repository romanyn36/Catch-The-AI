from django.contrib import admin
from .models import Users, Admin, Subscription,DataHistory   


# Register your models here.
admin.site.register(Users)
admin.site.register(Admin)
admin.site.register(Subscription)
admin.site.register(DataHistory)


# customizing the admin panel
admin.site.site_header = "AI Media Detection"
admin.site.site_title = "AI Media Detection"