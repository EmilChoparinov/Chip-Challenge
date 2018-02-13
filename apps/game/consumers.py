from channels import Channel, Group
from channels.auth import http_session
from channels.sessions import channel_session
import json
from boards import WORLD_1

def ws_connect(message):
    """Handles new websocket connections for the game portion
    
    Arguments:
        message {Message} -- channel message object
    """
    Group('player').add(message.reply_channel)
    # message.reply_channel.send({"accept": True})
    message.reply_channel.send({
        "text": json.dumps({
            "world": WORLD_1,
            "player_2_pos": json.dumps({
                "row": 2,
                "col": 2,
            }),
            "identifier": str(message.reply_channel)
        })
    })

def ws_recieve(message):
    """Handles incomming connections and broadcasts change
    
    Arguments:
        message {Message} -- channel message object
    """ 
    Group('player').send({
        "text": json.dumps({
            "identifier": str(message.reply_channel),
            "pos": json.loads(message['text'])
        })
    })

def ws_disconnect(message):
    """Handles disconnections for the game portion
    
    Arguments:
        message {Message} -- channel message object
    """
    Group('player').discard(message.reply_channel)
    Group('player').send({
        "text": "DISCONNECT"
    })

@channel_session
@http_session
def ws_connect_chat(message):
    """Handles new websocket connections for the instant messaging portion
    
    Arguments:
        message {Message} -- channel message object
    """
    Group('chat').add(message.reply_channel)
    Group('chat').send({
        "text": json.dumps({
            "message": 'Someone joined the chat!',
            "identifier": str(message.reply_channel)
        })
    })

@channel_session
def ws_recieve_chat(message):
    """Handles new global messages sent for messaging
    
    Arguments:
        message {Message} -- channel message object
    """
    Group('chat').send({
        "text": json.dumps({
            "message": message['text'],
            "identifier": str(message.reply_channel)
        })
    })

@channel_session
def ws_disconnect_chat(message):
    print message.channel_session
    Group('chat').send({
        "text": json.dumps({
            "message": 'Someone left the chat!',
            "identifier": str(message.reply_channel)
        })
    })