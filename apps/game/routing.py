from . import consumers
from channels.routing import route

routing = [
    route('websocket.receive', consumers.ws_recieve, path=r'^'),
    route('websocket.connect', consumers.ws_connect, path=r'^'),
    route('websocket.disconnect', consumers.ws_disconnect, path=r'^')
]