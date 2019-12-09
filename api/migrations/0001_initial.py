# Generated by Django 2.2.7 on 2019-12-09 23:18

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
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
            name='SolutionQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('question', models.CharField(max_length=500)),
                ('question_type', models.CharField(choices=[('INT', 'Integer'), ('BOOLEAN', 'Boolean'), ('MULTIPLE', 'Multiple Choice')], default='INT', max_length=10)),
                ('min_value', models.IntegerField(blank=True, default=0, null=True)),
                ('max_value', models.IntegerField(blank=True, default=0, null=True)),
                ('default_value', models.IntegerField(blank=True, default=0, null=True)),
                ('boolean_labels', models.CharField(blank=True, default='Si,No', max_length=50, null=True)),
                ('choices_labels', models.CharField(blank=True, default='Si,No', max_length=50, null=True)),
                ('solution_field', models.CharField(blank=True, max_length=100, null=True)),
                ('comparator', models.CharField(choices=[('EQUAL', 'Equal'), ('LOWER', 'Lower'), ('GREATER', 'Greater')], default='EQUAL', max_length=10)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories_b', to='api.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('url', models.URLField(max_length=100, null=True)),
                ('image', models.URLField(max_length=100, null=True)),
                ('price', models.IntegerField(default=0)),
                ('rating', models.IntegerField(default=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories_a', to='api.Brand')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Category')),
            ],
        ),
        migrations.CreateModel(
            name='CategoryQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('question', models.CharField(max_length=200)),
                ('labels', models.CharField(default='Si,No', max_length=50)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories_a', to='api.Category')),
            ],
        ),
    ]
