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
    min_value = models.IntegerField()
    max_value = models.IntegerField()
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return ("test_"+str(self.name))


class QuestionTypeB(models.Model):
    code = models.CharField(max_length=10,primary_key=True)
    name = models.CharField(max_length=20)
    question = models.CharField(max_length=100)
    min_value = models.IntegerField()
    max_value = models.IntegerField()
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return ("test_"+str(self.name))

def test_analysis(data):

    return data[0]
