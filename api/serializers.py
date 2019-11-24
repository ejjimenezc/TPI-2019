from rest_framework import serializers
from api.models import *
from datetime import datetime

class Response(object):
    def __init__(self, question_code, response):
        self.question_code = question_code
        self.response = response

class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ResponseSerializer(serializers.Serializer):
    question_code = serializers.CharField(max_length=20)
    response = serializers.IntegerField()

    def create(self, validated_data):
        return Response(**validated_data)
