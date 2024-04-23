# Generated by Django 5.0.2 on 2024-04-22 18:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ai_media_detection", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="remain_attempts",
            field=models.IntegerField(default=5),
        ),
        migrations.AlterField(
            model_name="user",
            name="subscription_end_date",
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="subscription_start_date",
            field=models.DateField(blank=True),
        ),
    ]