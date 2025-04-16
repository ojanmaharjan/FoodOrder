from rest_framework import serializers
from .models import FoodItem, CartItem

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    food_item_detail = FoodItemSerializer(source='food_item', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'food_item', 'quantity', 'food_item_detail']
