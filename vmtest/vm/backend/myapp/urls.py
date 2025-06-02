# myapp/urls.py
from django.urls import path
from . import views
from .views import SignUpView, LoginView
from .api_jaccard_recommendation import jaccard_recommendations
from .views import save_detail
urlpatterns = [
   path('signup/', SignUpView.as_view()),
    path('login/', LoginView.as_view()),
    # path('register/', views.register, name='register'),
    path('venues/', views.venue_list, name='venue_list'),  # New endpoint
    path('quiz/', views.quiz_on_summary, name="quiz"),
    path('update/', views.update_data, name="update"),
    path('delete/', views.delete_data, name="delete"),
    path('checkout/',views.order_items,name="checkout"),
    path('cart/', views.cart_list, name='cart_list'),
    path('recommend/', jaccard_recommendations, name='jaccard_recommendation'),
    path('save-detail/', views.save_detail, name='save_detail')
]