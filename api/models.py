from django.db import models
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.validators import MaxValueValidator, MinValueValidator

class Category(models.Model):
    code = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name

class Brand(models.Model):
    code = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=200,unique=True)
    description = models.TextField()
    url =  models.URLField(max_length=500,null=True)
    
    def __str__(self):
        return self.name



class Solution(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE,related_name='categories_a')
    url =  models.URLField(max_length=1000,null=True)
    image =  models.URLField(max_length=1000,null=True)
    price = models.IntegerField(default=0)
    rating = models.IntegerField(default=3, validators=[MinValueValidator(0), MaxValueValidator(5)])

    def __str__(self):
        return self.name



class CategoryQuestion(models.Model):

    name = models.CharField(max_length=200,unique=True)
    question = models.CharField(max_length=500)
    labels = models.CharField(default="Si,No", max_length=50)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='categories_a')

    def __str__(self):
        return self.name


class SolutionQuestion(models.Model):
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

    name = models.CharField(max_length=200,unique=True)
    question = models.CharField(max_length=1000)
    question_type = models.CharField(
        max_length=10,
        choices=FORM_TYPES,
        default="INT",
    )
    min_value = models.IntegerField(default=0,null=True,blank=True)
    max_value = models.IntegerField(default=0,null=True,blank=True)
    default_value = models.IntegerField(default=0,null=True,blank=True)
    boolean_labels = models.CharField(default="Si,No", max_length=50,null=True,blank=True)
    choices_labels = models.CharField(default="Si,No",max_length=50,null=True,blank=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='categories_b')
    solution_field = models.CharField(max_length=100,null=True,blank=True)
    comparator = models.CharField(
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

    categories = list(CategoryQuestion.objects.filter(name__in=list(results.keys())).values('category'))
    unique_categories = list(set(val for dic in categories for val in dic.values())) 
    solutionQuestions = SolutionQuestion.objects.filter(category__in=unique_categories).values()

    return solutionQuestions

#https://www.smarthomegadgets.shop/
def solution_analysis(data):
    solutions = {}
    questions = {}

    for item in data:
        questionObj = SolutionQuestion.objects.filter(name=item["name"])
        cat = questionObj[0].category_id
        if not cat in questions:
            questions[cat] = []
        questions[cat] += [item]

    for category in questions:
        solutions[category] = Solution.objects.filter(category=category)
        sol_per_cat = Solution.objects.filter(category=category)
        for question in questions[category]:
            qobj = SolutionQuestion.objects.get(name=question["name"])
            if qobj.solution_field == '' or qobj.solution_field == None:
                continue

            if qobj.question_type == "INT":
                response = int(question["response"])
                a = sol_per_cat.filter(**{create_arg(qobj.solution_field,qobj.comparator): response })
                solutions[category] = solutions[category].intersection(a)

            elif qobj.question_type == "BOOLEAN":
                response = bool(question["response"])
                a = sol_per_cat.filter(**{create_arg(qobj.solution_field,"EQUAL"): response })
                solutions[category] = solutions[category].intersection(a)

            elif qobj.question_type == "MULTIPLE":
                response = question["response"]
                a = sol_per_cat.filter(**{create_arg(qobj.solution_field,"EQUAL"): response })
                solutions[category] = solutions[category].intersection(a)

    response = []

    for cat, sol in solutions.items():
        response += list(sol)

    return list(set(response))

def create_arg(field,operation):
    if operation == "EQUAL":
        return field
    elif operation == "GREATER":
        return field + "__gte"
    elif operation == "LOWER":
        return field + "__lte"