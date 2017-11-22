from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^play/$', views.render_game),
    url(r'^connect/$', views.connect),
    url(r'^connect/user/$', views.connecter)
]