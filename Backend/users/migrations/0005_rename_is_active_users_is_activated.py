# Generated by Django 5.0.1 on 2024-06-06 12:32

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0004_users_is_active"),
    ]

    operations = [
        migrations.RenameField(
            model_name="users",
            old_name="is_active",
            new_name="is_activated",
        ),
    ]
