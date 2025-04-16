from django.db import models

class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name

class CartItem(models.Model):
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.food_item.name} x{self.quantity}"

    @property
    def total(self):
        return self.food_item.price * self.quantity
