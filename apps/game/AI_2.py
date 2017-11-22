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

def distance(p1,p2, start):   
    p1 = [p1['x'], p1['y']]
    p2 = [p2['x'], p2['y']]
    dist = cdist([p1,p2],[start],'cityblock')
    return dist

def get_walls(world):
    """ from world gird get wall cells"""
    wall = []
    for x in range(world.shape[0]):
        for y in range(world.shape[1]):
            #print world[x][y]
            if (world[x][y] == 3 or world[x][y]==5):
                print world[x][y]
                wall.append((x,y))
    return tuple(wall)
print get_walls(world)



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


class AStar(object):
    def __init__(self, world):
        self.opened = []
        heapq.heapify(self.opened)
        self.closed = set()
        self.cells = []
        self.grid_height = world.shape[1] 
        self.grid_width = world.shape[0]

    def init_grid(self, world):
        """ initializes grid based on current world
            parmeter world
            retruns cell grid
        """

        walls = get_walls(world)
        for x in range(self.grid_width):
            for y in range(self.grid_height):
                if (x, y) in walls:
                    reachable = False
                else:
                    reachable = True
                    self.cells.append(Cell(x, y, reachable))
        if not(self.start):
            start=[randrange(3,12), randrange(3,12)]
            while world[start[0],start[1]] == 3:
                start=[randrange(3,12), randrange(3,12)]
                self.start = self.get_cell(start[0], start[1])
        dist = distance(p1,p2,start)
        if dist[0]<dist[1]:
            self.end = self.get_cell(p1[0],p1[1])
        else:
            self.end = self.get_cell(p2[0],p2[1])

    def get_heuristic(self, cell):
        """
        Compute the heuristic value H for a cell: distance between this cell and the ending cell multiply by 10.
        parameter cell
        returns heuristic value H
        """
        return 10 * (abs(cell.x - self.end.x) + abs(cell.y - self.end.y))

    def get_cell(self, x, y):
        """
        Returns a cell from the cells list
        @param x cell x coordinate
        @param y cell y coordinate
        @returns cell
        """
        return self.cells[x * self.grid_height + y]


    def get_adjacent_cells(self, cell):
        """
        Returns adjacent cells to a cell. Clockwise starting
        from the one on the right.
        param cell get adjacent cells for this cell
        returns adjacent cells list
        """
        cells = []
        if cell.x < self.grid_width-1:
            cells.append(self.get_cell(cell.x+1, cell.y))
        if cell.y > 0:
            cells.append(self.get_cell(cell.x, cell.y-1))
        if cell.x > 0:
            cells.append(self.get_cell(cell.x-1, cell.y))
        if cell.y < self.grid_height-1:
            cells.append(self.get_cell(cell.x, cell.y+1))
        return cells

    def display_path(self):
        """ simple display of path """
        cell = self.end
        while cell.parent is not self.start:
            cell = cell.parent
        print 'path: cell: %d,%d' % (cell.x, cell.y)

    def update_cell(self, adj, cell):
        """
        Update adjacent cell
        @param adj adjacent cell to current cell
        @param cell current cell being processed
        """
        adj.g = cell.g + 10
        adj.h = self.get_heuristic(adj)
        adj.parent = cell
        adj.f = adj.h + adj.g















