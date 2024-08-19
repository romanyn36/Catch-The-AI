# Generated by Django 5.0.1 on 2024-06-06 07:44

import django.db.models.deletion
import users.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_users"),
    ]

    operations = [
        migrations.CreateModel(
            name="Admin",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("username", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("password", models.CharField(max_length=50)),
                ("role", models.CharField(default="staff", max_length=50)),
                (
                    "image",
                    models.ImageField(
                        default="default.png",
                        upload_to=users.models.user_directory_path,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="DataHistory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("media_name", models.CharField(max_length=100)),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=users.models.user_directory_path,
                    ),
                ),
                (
                    "audio",
                    models.FileField(
                        blank=True,
                        null=True,
                        upload_to=users.models.user_directory_path,
                    ),
                ),
                ("text", models.TextField(blank=True, null=True)),
                ("attemptTime", models.DateTimeField(auto_now_add=True)),
                ("modelResult", models.CharField(max_length=100)),
                ("media_size", models.IntegerField()),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="users.users"
                    ),
                ),
            ],
            options={
                "ordering": ["-attemptTime"],
            },
        ),
    ]
