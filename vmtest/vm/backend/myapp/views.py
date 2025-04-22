from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect,render
from django.contrib import messages

@api_view(['POST'])
def signup(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not name or not email or not password:
        return Response({'message': 'All fields are required'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'message': 'Email already exists'}, status=400)

    username = email.split('@')[0]  # use first part of email as username
    user = User.objects.create_user(username=username, email=email, password=password, first_name=name)
    return Response({'message': 'Signup successful'}, status=201)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username=email, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({'access_token': access_token}, status=200)  # Sending the token back
    else:
        return Response({'message': 'Invalid email or password'}, status=401)
    

def register(request):
    if request.method=='POST':
        name1 = request.POST['name']
        email1 = request.POST['email']
        password = request.POST['password']

        if User.objects.filter(email=email1).exists(): #check from the database User.
            messages.info(request,'email already exit')
        elif User.objects.filter(name=name1).exists():
            messages.info(request,'User Name already Exits')
        else:
            user = User.objects.create_user(name=name1, email=email1,password=password)
            user.save()
            return redirect('Login')

    else:
        return render(request,'')
