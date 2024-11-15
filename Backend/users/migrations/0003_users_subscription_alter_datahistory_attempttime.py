# Generated by Django 5.0.1 on 2024-10-18 21:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_alter_datahistory_attempttime"),
    ]

    operations = [
        migrations.AddField(
            model_name="users",
            name="subscription",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="users.subscription",
            ),
        ),
        migrations.AlterField(
            model_name="datahistory",
            name="attemptTime",
            field=models.CharField(
                blank=True, default="19/10/2024 12:30 AM", max_length=50, null=True
            ),
        ),
    ]
