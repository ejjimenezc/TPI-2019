# Generated by Django 2.2.7 on 2019-11-28 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20191128_2110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questiontypeb',
            name='boolean_choice',
            field=models.CharField(blank=True, default=' , ', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='questiontypeb',
            name='max_value',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='questiontypeb',
            name='min_value',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='questiontypeb',
            name='multiple_choice',
            field=models.CharField(blank=True, default=' , ', max_length=30, null=True),
        ),
    ]
