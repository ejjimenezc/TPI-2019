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


class QuestionASerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTypeA
        fields = '__all__'

class QuestionBSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTypeB
        fields = '__all__'

class ResponseSerializer(serializers.Serializer):
    question_code = serializers.CharField(max_length=20)
    response = serializers.CharField(max_length=20)

    def create(self, validated_data):
        return Response(**validated_data)


class matchSerializer(serializers.Serializer):
    question_code = serializers.CharField(max_length=20)
    response = serializers.CharField(max_length=20)

    def create(self, validated_data):
        return Response(**validated_data)