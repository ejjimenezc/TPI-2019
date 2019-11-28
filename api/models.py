from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    code = models.CharField(max_length=10,primary_key=True)
    name = models.CharField(max_length=60)
    description = models.TextField()

    def __str__(self):
        return self.name

class Company(models.Model):
    code = models.CharField(max_length=10,primary_key=True)
    name = models.CharField(max_length=60)
    description = models.TextField()
    url =  models.URLField(max_length=250,null=True)
    
    def __str__(self):
        return (str(self.id)+' - '+self.name)



class Solution(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField()
    value = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE,null=True)
    url =  models.URLField(max_length=250,null=True)

    def __str__(self):
        return self.name



class QuestionTypeA(models.Model):
    code = models.CharField(max_length=10,primary_key=True)
    name = models.CharField(max_length=20)
    question = models.CharField(max_length=100)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    category_code = models.CharField(max_length=20)

    def __str__(self):
        return ("test_"+str(self.name))


class QuestionTypeB(models.Model):
    FORM_TYPES = [
        ('IN', 'Integer'),
        ('BO', 'Boolean'),
        ('MC', 'Multiple Choice'),
    ]

    code = models.CharField(max_length=10,primary_key=True)
    name = models.CharField(max_length=20)
    question = models.CharField(max_length=100)
    question_type = models.CharField(
        max_length=2,
        choices=FORM_TYPES,
        default="IN",
    )
    min_value = models.IntegerField(default=0,null=True,blank=True)
    max_value = models.IntegerField(default=0,null=True,blank=True)
    boolean_choice = models.CharField(default=" , ", max_length=30,null=True,blank=True)
    multiple_choice = models.CharField(default=" , ",max_length=30,null=True,blank=True)
    category_code = models.CharField(max_length=20)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return ("test_"+str(self.name))

def category_analysis(data):
    results = {}

    for question in data:
        if question["response"]:
            if not question["question_code"] in results.keys():
                results[question["question_code"]]=0
            results[question["question_code"]]+=1

    categories = list(QuestionTypeA.objects.filter(pk__in=list(results.keys())).values('category_code'))
    unique_categories = list(set(val for dic in categories for val in dic.values())) 

    questionsB = QuestionTypeB.objects.filter(category_code__in=unique_categories).values()

    return questionsB


def solution_analysis(data):
    return data
