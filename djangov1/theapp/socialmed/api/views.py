from rest_framework.viewsets import ModelViewSet
from ..models import User
from .serializers import loginInfoSerializer, signupSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed, APIException
import jwt, datetime
from .authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
from rest_framework.authentication import get_authorization_header

"""
class LoginInfoViewSet(ModelViewSet):
    queryset=User.objects.all() # probably needs changes, since no longer using this model
    serializer_class=loginInfoSerializer # what's the purpose of this class?
"""

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()
        response.set_cookie(key='refreshToken', value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }
        return response
        # payload = {
        #     'id': user.id,
        #     'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=30),
        #     'iat': datetime.datetime.utcnow()
        # }

        # token = jwt.encode(payload, 'secret', algorithm='HS256') #.decode('utf-8')

        # response = Response()
        # response.set_cookie(key='jwt', value=token, httponly=True)
        # response.data = {
        #     'jwt': token
        # }
        # return response
    
class UserView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()
            return Response(UserSerializer(user).data)
        raise AuthenticationFailed('Unauthenticated!')
        # token = request.COOKIES.get('jwt')

        # if not token:
        #     raise(AuthenticationFailed('Unauthenticated!'))
        
        # try:
        #     payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        # except jwt.ExpiredSignatureError:
        #     raise(AuthenticationFailed('Unauthenticated!'))
        
        # user = User.objects.filter(id=payload['id']).first()
        # serializer = UserSerializer(user)
        # return Response(serializer.data)

class LogoutView(APIView):
    def post(self, _):
        response = Response()
        response.delete_cookie(key='refreshToken')
        response.data = {
            'message': 'success'
        }
        return response
    # def post(self, request):
    #     response = Response()
    #     response.delete_cookie('jwt')
    #     response.data = {
    #         'message': 'success'
    #     }
    #     return response

class RefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        print(refresh_token)
        id = decode_refresh_token(refresh_token) # raises exception if cookie expired
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })
"""@api_view(['POST'])
def verify(request):
    if(request.method == 'POST'):
        serializer = loginInfoSerializer(data=request.data)
        if serializer.is_valid():
            user = request.data.get('username')
            userobj = None
            userobj = loginInfo.objects.filter(username=user).first()
            if userobj is not None: 
                passw = request.data.get('password')
                if userobj.password == passw:
                    return Response({'message': 'success'}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'incorrectPassword'}, status=status.HTTP_200_OK)
            return Response({'message': 'userNotFound'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status= status.HTTP_405_METHOD_NOT_ALLOWED)
    # return Response({'message': 'Incorrect Password'}, status=status.HTTP_400_BAD_REQUEST)
    #     return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)"""

"""@api_view(['POST'])
def signup(request):
    if(request.method == 'POST'):
        serializer = signupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'userCreated'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status= status.HTTP_405_METHOD_NOT_ALLOWED)""" # found a better way for authentication


"""
@api_view(['POST'])
def signup_view(request):
    if(request.method == 'POST'):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            login(request, form.save())
            return Response({'message': 'userCreated'}, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status= status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def login_view(request):
    if(request.method == 'POST'):
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
        return Response(form.errors, status=status.HTTP_200_OK)
    return Response(status= status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def logout_view(request):
    if(request.method == 'POST'):
        logout(request)


        """