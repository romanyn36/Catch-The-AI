# Generated by Django 5.0.1 on 2024-06-20 15:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0009_userattempt"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userattempt",
            name="attempts",
            field=models.IntegerField(default=5),
        ),
    ]
