from channels import Channel, Group
import json
from boards import WORLD_1
def ws_connect(message):
    Group('player').add(message.reply_channel)
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
    Group('player').send({
        "text": json.dumps({
            "identifier": str(message.reply_channel),
            "pos": json.loads(message['text'])
        })
    })

def ws_disconnect(message):
    Group('player').discard(message.reply_channel)
    Group('player').send({
        "text": "DISCONNECT"
    })