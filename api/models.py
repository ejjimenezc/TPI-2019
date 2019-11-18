from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField()

    def __str__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField()


    def __str__(self):
        return (str(self.id)+' - '+self.name)



class Solution(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField()
    value = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.name


class Test(models.Model):
    question_a = models.IntegerField()
    question_b = models.IntegerField()
    question_c = models.IntegerField()
    question_d = models.IntegerField()
    question_e = models.IntegerField()
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return ("test_"+str(self.id))


def test_analysis(data):
    return data
    #return {'rta': 'The One Piece exists'}