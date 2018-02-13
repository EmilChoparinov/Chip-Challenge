# Chip-Challenge
Winner of Coding Dojos' 2017 Hackathon. With about 16 hours in development, we produced an **in-browser game** and **messaging system** 
that
utilized vanilla javascript websockets and the new Django Channels library for the Django web framework.

## Interesting Features
1. Rendering engine was built with only vanilla javascript and divs - no libraries such as WebGl or canvas were used
2. Uses redis for quick db caching of daphne response identifiers! (websocket session)

## Setup
You will need [Python 2](https://www.python.org/downloads/) in order to run this project, please install this beforehand. You will also
need a functioning version of [Redis](https://github.com/MicrosoftArchive/redis/releases). This project was tested on Microsoft's redis
port.
1. Clone the repository using the helpful command `git clone https://github.com/EmilChoparinov/Chip-Challenge`
2. Once thats done, make a python virtual environment in the root folder using the command `py -2 -m virtualenv chipenv`
3. Now activate this environment. The windows command would be `. ./chipenv/Scripts/activate`
4. Install the listed dependencies using this pip command: `py -2 -m pip install -r r.txt`
5. If everything went well, you should be able to now run the server by doing `py -2 manage.py runserver`
6. Game will be live on the route `localhost:(portyouchose)/play`

## Images
<img src='https://i.imgur.com/Jw1JUtC.jpg'>

## TroubleShooting
### Redis
1. If you're having problems redis related try manually launching the server locally at this path `C:\Program Files\Redis` and run the
redis-server.exe executable. It should open and close.
2. Check if its running as a service now by searching for **services** on your pc. Search for redis and you should see this:
      <img src='https://i.imgur.com/vld9qxF.jpg' width='600'>
### Python
1. If you can't build a virtual environment you might not have the Python package installed. 
Try the command `py -2 -m pip install virtualenv` and running again

**Contributors:** [@Connor Zimmerman](https://github.com/ConnorZimmerman) 
[@EmilChoparinov](https://github.com/EmilChoparinov) 
[@Ayadlin](https://github.com/ayadlin)
