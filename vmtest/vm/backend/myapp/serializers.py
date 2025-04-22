# api/serializers.py

from rest_framework import serializers
from .models import Signup,Login

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signup
        fields = '__all__'
class loginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'
