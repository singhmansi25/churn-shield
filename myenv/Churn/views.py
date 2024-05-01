from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail

# Create your views here.

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required

def homepage(request):
    # logout(request)
    context = {'page': {}}
    return render(request, 'Churn/index.html', context)

def logout_view(request):
    logout(request) 
    return redirect('login')


def telecompage(request):
    if not request.user.is_authenticated:
        return redirect('login')
    context = {'page': {}}
    return render(request, 'Churn/Telecom.html', context)


def customerpage(request):
    if not request.user.is_authenticated:
        return redirect('login')
    context = {'page': {}}
    return render(request, 'Churn/Customer.html', context)


def loginpage(request):
    context = {'page': {}}
    return render(request, 'Churn/Sign.html', context)

def savepage(request):
    if request.method == 'POST' and not request.POST.get("username"):
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        user = User.objects.get(email=email)

        user = authenticate(request, username=user.username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
    elif request.method == 'POST' and request.POST.get("username"):
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.create_user(username,email,password)

        user.save()
        
    return render(request, 'Churn/Sign.html')


def contactpage(request):
    context = {'page': {}}
    return render(request, 'Churn/Contact.html', context)

def aboutpage(request):
    context = {'page': {}}
    return render(request, 'Churn/About us.html', context)

def custompage(request):
    context = {'page': {}}
    return render(request, 'Churn/Custom.html', context)

def faqpage(request):
    context = {'page': {}}
    return render(request, 'Churn/FAQs.html', context)
