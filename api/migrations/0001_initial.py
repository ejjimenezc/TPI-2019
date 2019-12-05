# Generated by Django 2.2.7 on 2019-12-05 21:33

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('code', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField()),
                ('url', models.URLField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('code', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('url', models.URLField(max_length=100, null=True)),
                ('price', models.IntegerField()),
                ('rating', models.IntegerField(default=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories_a', to='api.Brand')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Category')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionTypeB',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('question', models.CharField(max_length=500)),
                ('question_type', models.CharField(choices=[('INT', 'Integer'), ('BOOLEAN', 'Boolean'), ('MULTIPLE', 'Multiple Choice')], default='INT', max_length=10)),
                ('min_value', models.IntegerField(blank=True, default=0, null=True)),
                ('max_value', models.IntegerField(blank=True, default=0, null=True)),
                ('boolean_choice', models.CharField(blank=True, default=' , ', max_length=30, null=True)),
                ('multiple_choice', models.CharField(blank=True, default=' , ', max_length=30, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories_b', to='api.Category')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionTypeA',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('question', models.CharField(max_length=500)),
                ('question_type', models.CharField(choices=[('INT', 'Integer'), ('BOOLEAN', 'Boolean'), ('MULTIPLE', 'Multiple Choice')], default='INT', max_length=10)),
                ('default_value', models.IntegerField(default=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('min_value', models.IntegerField(blank=True, default=0, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('max_value', models.IntegerField(blank=True, default=0, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('boolean_choice', models.CharField(blank=True, default=' , ', max_length=30, null=True)),
                ('multiple_choice', models.CharField(blank=True, default=' , ', max_length=30, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories_a', to='api.Category')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
