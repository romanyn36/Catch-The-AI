# Generated by Django 5.0.1 on 2024-07-04 18:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0013_admin_about_admin_social_links_admin_sub_title_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="admin",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="admin",
            name="is_team_member",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="admin",
            name="is_verified",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="admin",
            name="reset_code",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="admin",
            name="reset_expire",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]