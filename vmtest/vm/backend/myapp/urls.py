from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FoodItemViewSet, CartItemViewSet, remove_from_cart

router = DefaultRouter()
router.register(r'food-items', FoodItemViewSet)
router.register(r'cart', CartItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('remove-from-cart/', remove_from_cart),  # Custom delete endpoint
]
