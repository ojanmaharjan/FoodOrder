from django.contrib import admin
from .models import FoodItem

models_list = [FoodItem]

admin.site.register(FoodItem)

class StudentItems(admin.ModelAdmin):
    list_display = ['id',
                  'Items',
                  'Titles',
                  'Price',
                  'Quantity',
                  'Total']


