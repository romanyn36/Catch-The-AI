# Generated by Django 5.0.1 on 2024-06-20 16:32

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0010_alter_userattempt_attempts"),
    ]

    operations = [
        migrations.CreateModel(
            name="AnonymousAttempt",
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
                ("ip_address", models.CharField(max_length=40)),
                ("attempts_left", models.PositiveIntegerField(default=5)),
                (
                    "last_attempt",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
            ],
        ),
    ]
