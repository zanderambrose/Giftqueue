# Generated by Django 4.1.2 on 2024-01-21 22:29

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_remove_friendship_date_accepted_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activityfeed',
            name='action',
            field=models.CharField(choices=[('GIFT', 'GIFT'), ('DAY', 'DAY'), ('GIFT_DELETE', 'GIFT_DELETE'), ('DAY_DELETE', 'DAY_DELETE')], max_length=255),
        ),
        migrations.CreateModel(
            name='ProfileImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to=api.models.upload_to)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
