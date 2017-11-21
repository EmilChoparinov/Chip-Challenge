from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^$', views.render_game),
]