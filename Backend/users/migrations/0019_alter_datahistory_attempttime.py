# Generated by Django 5.0.1 on 2024-07-08 20:06

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0018_alter_datahistory_attempttime"),
    ]

    operations = [
        migrations.AlterField(
            model_name="datahistory",
            name="attemptTime",
            field=models.TextField(
                blank=True, default="08/07/2024 11:06 PM", null=True
            ),
        ),
    ]