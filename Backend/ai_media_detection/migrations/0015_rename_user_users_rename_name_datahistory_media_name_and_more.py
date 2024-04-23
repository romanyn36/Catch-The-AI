# Generated by Django 5.0.2 on 2024-04-22 19:26

import ai_media_detection.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ai_media_detection", "0014_alter_datahistory_image"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="User",
            new_name="Users",
        ),
        migrations.RenameField(
            model_name="datahistory",
            old_name="name",
            new_name="media_name",
        ),
        migrations.AlterField(
            model_name="datahistory",
            name="audio",
            field=models.FileField(
                blank=True,
                null=True,
                upload_to=ai_media_detection.models.user_directory_path,
            ),
        ),
        migrations.AlterField(
            model_name="datahistory",
            name="image",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to=ai_media_detection.models.user_directory_path,
            ),
        ),
    ]