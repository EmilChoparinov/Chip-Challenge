from __future__ import unicode_literals

from django.shortcuts import render,redirect

# Create your views here.

# Main views that will handle static requests
def render_game(request):
    return render(request, 'game/game.html')

def connect(request):
    return render(request, 'game/connect.html')

def connecter(request):
    return redirect('/play')
