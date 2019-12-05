from django.db import models
from django.contrib.auth.models import User
from django.http import JsonResponse

class Category(models.Model):
    code = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField()
    url =  models.URLField(max_length=100,null=True)
    
    def __str__(self):
        return (str(self.id)+' - '+self.name)



class Solution(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    url =  models.URLField(max_length=100,null=True)
    value = models.IntegerField()

    def __str__(self):
        return self.name



class QuestionTypeA(models.Model):
    FORM_TYPES = [
        ('INT', 'Integer'),
        ('BOOLEAN', 'Boolean'),
        ('MULTIPLE', 'Multiple Choice'),
    ]

    name = models.CharField(max_length=100,unique=True)
    question = models.CharField(max_length=500)
    question_type = models.CharField(
        max_length=10,
        choices=FORM_TYPES,
        default="INT",
    )
    min_value = models.IntegerField(default=0,null=True,blank=True)
    max_value = models.IntegerField(default=0,null=True,blank=True)
    boolean_choice = models.CharField(default=" , ", max_length=30,null=True,blank=True)
    multiple_choice = models.CharField(default=" , ",max_length=30,null=True,blank=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='categories_a')
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.name


class QuestionTypeB(models.Model):
    FORM_TYPES = [
        ('INT', 'Integer'),
        ('BOOLEAN', 'Boolean'),
        ('MULTIPLE', 'Multiple Choice'),
    ]

    name = models.CharField(max_length=100,unique=True)
    question = models.CharField(max_length=500)
    question_type = models.CharField(
        max_length=10,
        choices=FORM_TYPES,
        default="INT",
    )
    min_value = models.IntegerField(default=0,null=True,blank=True)
    max_value = models.IntegerField(default=0,null=True,blank=True)
    boolean_choice = models.CharField(default=" , ", max_length=30,null=True,blank=True)
    multiple_choice = models.CharField(default=" , ",max_length=30,null=True,blank=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='categories_b')
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.name

def category_analysis(data):
    results = {}
    for question in data:
        if int(question["response"]):
            if not question["name"] in results.keys():
                results[question["name"]]=0
            results[question["name"]]+=1

    categories = list(QuestionTypeA.objects.filter(name__in=list(results.keys())).values('category'))
    unique_categories = list(set(val for dic in categories for val in dic.values())) 
    questionsB = QuestionTypeB.objects.filter(category__in=unique_categories).values()

    return questionsB


def solution_analysis(data):
    return data
