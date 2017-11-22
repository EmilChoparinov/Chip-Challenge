# Push to branch

from scipy.spatial.distance import pdist, cdist
from random import randrange
import numpy as np



world=np.array([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]])


p1 = {'x':3, 'y':14 }
p2 = {'x':8, 'y':3 }
start_1=[randrange(3,12), randrange(3,12)]
def distance(p1,p2, start):   
    p1 = [p1['x'], p1['y']]
    p2 = [p2['x'], p2['y']]
    dist = cdist([p1,p2],[start],'cityblock')
    return dist

#print distance(p1,p2, start_1)

def move(world,p,s):
    if p['x']<s[0] & (s[0]-1!=3 | s[0]-1!=5):
        s[0]-=1
    elif p['x']>s[0] & (s[0]+1!=3 | s[0]+1!=5):
        s[0]+=1
    else:
        if p['y']<s[0] & (s[1]-1!=3 | s[1]-1!=5):
            s[1]-=1
        elif p['y']>s[0] & (s[1]+1!=3 | s[1]+1!=5):
            s[1]+=1
    return s


def pursue(world, p1, p2, start=[]):
    if len(start)==0:
        start=[randrange(3,12), randrange(3,12)]
        while world[start[0],start[1]] == 3:
            start=[randrange(3,12), randrange(3,12)]
    print "start", start
    dist = distance(p1,p2,start)
    print 'dist', dist
    if dist[0]<dist[1]:
        player =1
        new_start = move(world,p1,start)
    else:
        player =2
        new_start = move(world,p1,start)
    start=new_start
    return (player,start)

    
print pursue(world, p1, p2)


    