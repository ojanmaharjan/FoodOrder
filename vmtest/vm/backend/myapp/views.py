from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect,render
from django.contrib import messages
from .api_venue import *
from .api_quiz import *
from .api_update_food import *
from .api_delete import *
from .api_order_item import *

from django.contrib.auth.models import User

from .serializers import CartSerializer

import json

class SignUpView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=email).exists():
            return Response({'message': 'User already exists'}, status=400)

        user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
        return Response({'message': 'User created successfully'}, status=201)

# class LoginView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         user = authenticate(request,username=email, password=password)

#         if user is None:
#             return Response({'message': 'Invalid credentials'}, status=400)

#         refresh = RefreshToken.for_user(user)
#         return Response({
#             'token': str(refresh.access_token),
#             'name': user.first_name,
#         })
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)

        if user is None:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            # 'token': str(refresh.access_token),
            # 'name': user.first_name
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'name': user.first_name,
            'is_admin':user.is_staff
        }, status=status.HTTP_200_OK)


# myapp/views.py



@api_view(['GET'])
def venue_list(request):
    return Response(api_venue_list(request=request))


from rest_framework.parsers import MultiPartParser, FormParser

@api_view(['POST'])
def quiz_on_summary(request):
    # Accept both form-data and file uploads
    if request.content_type.startswith('multipart/form-data'):
        data = request.data.copy()
        files = request.FILES
    else:
        data = request.data
        files = None
    return Response(quiz(data, files))

@api_view(['POST'])
def update_data(request):
    if request.content_type.startswith('multipart/form-data'):
        data = request.data.copy()
        files = request.FILES
    else:
        data = request.data
        files = None
    return Response(update_food_data(data, files))

@api_view(['POST'])
def delete_data(request):
    return Response(delete_food_data(request.data))

@api_view(['GET'])
def cart_list(request):
    from .models import Cart
    carts = Cart.objects.all().order_by('-created_at')
    data = []
    for cart in carts:
        data.append({
            'id': cart.id,
            'user': cart.username,
            'name': cart.name,
            'price': float(cart.price),
            'quantity': cart.quantity,
            'total_price': float(cart.price) * cart.quantity,
            'created_at': cart.created_at,
        })
    return Response(data)

@api_view(['POST'])
def order_items(request):


    # prakash
    print("user",request.user)
    st = request.body
    print("type",st.decode('utf-8'))
    st_json = json.loads(st)        
    order = st_json.get('order')
    print("order",order)
    for i in order:
        id = request.user.id
        user = request.user
        name = i.get('name')
        price = i.get('price')
        quantity = i.get('quantity')
        print(id,user,name,price,quantity)

        Cart.objects.create(
            username=user.username,
            name=name,
            price=price,
            quantity=quantity,
            user_id = id
        )

    return Response({'status':request.body})