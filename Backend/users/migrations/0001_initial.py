# Generated by Django 5.0.1 on 2024-06-06 07:35

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Subscription",
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
                ("plan_name", models.CharField(max_length=100)),
                ("price", models.IntegerField()),
                ("size_limit", models.IntegerField()),
                ("attempts_limits", models.IntegerField()),
                ("duration", models.IntegerField()),
                ("history_limit", models.IntegerField()),
            ],
        ),
    ]