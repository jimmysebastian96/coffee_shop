# Generated by Django 4.1.7 on 2023-04-10 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profileapp', '0002_transaction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='loyalty_point',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
