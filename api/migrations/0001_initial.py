# Generated by Django 2.2.7 on 2019-11-25 00:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=60)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=60)),
                ('description', models.TextField()),
                ('url', models.URLField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('description', models.TextField()),
                ('value', models.IntegerField()),
                ('url', models.URLField(max_length=250, null=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Category')),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Company')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionTypeB',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('question', models.CharField(max_length=100)),
                ('min_value', models.IntegerField()),
                ('max_value', models.IntegerField()),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionTypeA',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('question', models.CharField(max_length=100)),
                ('min_value', models.IntegerField()),
                ('max_value', models.IntegerField()),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
