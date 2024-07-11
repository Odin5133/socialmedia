from rest_framework import serializers
from ..models import User
from rest_framework.validators import UniqueValidator

class loginInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class signupSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {
            'username' : {'unique': True},
        }
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance