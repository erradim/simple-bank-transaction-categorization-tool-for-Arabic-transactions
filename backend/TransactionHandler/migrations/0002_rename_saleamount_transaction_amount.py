# Generated by Django 4.1.13 on 2024-01-29 06:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('TransactionHandler', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='transaction',
            old_name='saleAmount',
            new_name='amount',
        ),
    ]
