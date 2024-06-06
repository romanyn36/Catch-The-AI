# Generated by Django 5.0.1 on 2024-06-06 07:42

import django.db.models.deletion
import users.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Users",
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
                ("age", models.IntegerField()),
                ("country", models.CharField(max_length=100)),
                ("subscription_start_date", models.DateField(blank=True, null=True)),
                ("subscription_end_date", models.DateField(blank=True, null=True)),
                ("remain_attempts", models.IntegerField(default=5)),
                (
                    "image",
                    models.ImageField(
                        default="default.png",
                        upload_to=users.models.user_directory_path,
                    ),
                ),
                (
                    "subscription",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="users.subscription",
                    ),
                ),
            ],
        ),
    ]