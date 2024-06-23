# Generated by Django 5.0.1 on 2024-06-20 15:17

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0008_contactmessage"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserAttempt",
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
                ("session_key", models.CharField(max_length=40, unique=True)),
                ("attempts", models.IntegerField(default=0)),
                (
                    "last_attempt",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
            ],
        ),
    ]