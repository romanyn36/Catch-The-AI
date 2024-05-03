# Generated by Django 5.0.1 on 2024-05-03 08:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ai_media_detection", "0016_alter_datahistory_options"),
    ]

    operations = [
        migrations.AlterField(
            model_name="users",
            name="subscription",
            field=models.ForeignKey(
                default=2,
                on_delete=django.db.models.deletion.CASCADE,
                to="ai_media_detection.subscription",
            ),
        ),
    ]
