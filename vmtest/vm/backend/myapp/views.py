from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import FoodItem, CartItem
from .serializers import FoodItemSerializer, CartItemSerializer

# ViewSet for FoodItem
class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer

# ViewSet for CartItem
class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

# Custom delete endpoint for removing by food_item ID
@api_view(['DELETE'])
def remove_from_cart(request):
    food_item = request.data.get("food_item")
    if not food_item:
        return Response({"error": "food_item is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        cart_item = CartItem.objects.get(food_item=food_item)
        cart_item.delete()
        return Response({"message": "Item removed from cart."}, status=status.HTTP_200_OK)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)
