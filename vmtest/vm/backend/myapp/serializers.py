# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import Login

# create a serializer class
class LoginSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Login
        fields = ('id', 'Name','Email','Password')
