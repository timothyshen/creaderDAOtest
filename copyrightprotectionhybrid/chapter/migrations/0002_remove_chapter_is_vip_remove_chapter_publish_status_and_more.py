# Generated by Django 4.0.6 on 2022-07-16 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chapter', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chapter',
            name='is_vip',
        ),
        migrations.RemoveField(
            model_name='chapter',
            name='publish_status',
        ),
        migrations.AddField(
            model_name='chapter',
            name='arID',
            field=models.CharField(default='', max_length=43, verbose_name='Chapter address'),
        ),
        migrations.AddField(
            model_name='chapter',
            name='bookID',
            field=models.CharField(default='', max_length=40, verbose_name='Book address'),
        ),
        migrations.AlterField(
            model_name='chapter',
            name='last_update',
            field=models.DateTimeField(auto_now=True, verbose_name='Last update'),
        ),
    ]
