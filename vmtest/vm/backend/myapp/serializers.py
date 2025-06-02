# api/serializers.py

from rest_framework import serializers
# from .models import Signup,Login,Cart

from .models import Cart,Detail

# class SignupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Signup
#         fields = '__all__'
# class loginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Login
#         fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
 
class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detail
        fields = '__all__'
        read_only_fields = ['user']