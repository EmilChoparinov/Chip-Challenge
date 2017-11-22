import heapq
from scipy.spatial.distance import pdist, cdist
from random import randrange
import numpy as np


world=np.array([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,3,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,3,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,3,1,1,1,5], 
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,3,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]])


class Cell(object):

    """ each grid position is conisdered a cell """
    def __init__(self, x, y, reachable):
        """
        Initialize new cell
        x cell x coordinate
        y cell y coordinate
        reachable is cell reachable? not a wall?
        """
        self.reachable = reachable
        self.x = x
        self.y = y
        self.parent = None
        self.g = 0
        self.h = 0
        self.f = 0


def get_walls(world):
    for x in range world.shape[0]:
        for y in range world.shape[1]:






