from channels.routing import include, route

routing = [
    include('apps.game.routing.routing', path=r'^/play/')
]