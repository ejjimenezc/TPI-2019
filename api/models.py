from django.db import models
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.validators import MaxValueValidator, MinValueValidator

class Category(models.Model):
    code = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Brand(models.Model):
    code = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField()
    url =  models.URLField(max_length=100,null=True)
    
    def __str__(self):
        return self.name



class Solution(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE,related_name='categories_a')
    url =  models.URLField(max_length=100,null=True)
    price = models.IntegerField()
    rating = models.IntegerField(default=3, validators=[MinValueValidator(0), MaxValueValidator(5)])

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
    default_value = models.IntegerField(default=3, validators=[MinValueValidator(0), MaxValueValidator(5)])
    min_value = models.IntegerField(default=0,validators=[MinValueValidator(0)],null=True,blank=True)
    max_value = models.IntegerField(default=0,validators=[MinValueValidator(0)],null=True,blank=True)
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
    ARG_TYPES = [
        ('EQUAL', 'Equal'),
        ('LOWER', 'Lower'),
        ('GREATER', 'Greater'),
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
    field = models.CharField(max_length=100,null=True,blank=True)
    argument = models.CharField(
        max_length=10,
        choices=ARG_TYPES,
        default="EQUAL",
    )

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

#https://www.smarthomegadgets.shop/
def solution_analysis(data):
    

    products = []

    for question in data:
        question_obj = QuestionTypeB.objects.get(name=question["name"])
        cat_solutions = Solution.objects.filter(category=question_obj.category)
        
        if question_obj.field == '' or question_obj.field == None:
            continue

        if question_obj.question_type == "INT":
            response = int(question["response"])
            products += list(Solution.objects.filter(**{create_arg(question_obj.field,question_obj.argument): response }))

        elif question_obj.question_type == "BOOLEAN":
            response = bool(question["response"])
            products += list(Solution.objects.filter(**{create_arg(question_obj.field,"EQUAL"): response }))

        elif question_obj.question_type == "MULTIPLE":
            response = question["response"]
            products += list(Solution.objects.filter(**{create_arg(question_obj.field,"EQUAL"): response }))

    return list(set(products))

def create_arg(field,operation):
    if operation == "EQUAL":
        return field
    elif operation == "GREATER":
        return field + "__gte"
    elif operation == "LOWER":
        return field + "__lte"