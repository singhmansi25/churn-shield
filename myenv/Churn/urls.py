from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('ChurnShield/',views.homepage,name='home'),
    path('ChurnShield/services/telecompage',views.telecompage,name='telecom'),
    path('ChurnShield/services/customerpage',views.customerpage,name='employee'),
    path('ChurnShield/login',views.loginpage,name='login'),
    path('ChurnShield/save/',views.savepage,name='save'),
    path('ChurnShield/contact',views.contactpage,name='contact'),
    path('ChurnShield/about',views.aboutpage,name='about'),
    path('ChurnShield/custom',views.custompage,name='custom'),
    path('ChurnShield/faq',views.faqpage,name='faq'),
    path('logout/', views.logout_view, name='logout'),
]

