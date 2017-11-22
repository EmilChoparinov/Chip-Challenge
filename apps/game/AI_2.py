import heapq
from scipy.spatial.distance import pdist, cdist
from random import randrange
import numpy as np


world=np.array([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],  
[5,1,3,3,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,1,3,1,1,1,1,1,1,1,1,1,1,5],  
[5,1,1,3,1,1,1,1,1,1,1,1,1,1,5],  
[5,3,1,3,1,1,1,1,1,3,1,1,1,1,5],  
[5,1,1,1,1,1,1,1,1,1,1,1,1,1,5], 
[5,1,3,3,3,3,3,3,1,1,1,1,1,1,5], 
[5,1,1,1,3,1,1,3,1,1,1,1,1,1,5],  
[5,1,1,1,1,1,3,3,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,3,1,1,1,1,1,1,1,5], 
[5,1,1,1,1,1,3,1,1,1,3,1,1,1,5], 
[5,1,1,1,1,1,3,1,1,1,1,1,1,1,5], 
[5,1,1,3,1,1,3,1,3,3,3,1,1,1,5],  
[5,1,1,1,1,1,1,1,3,1,1,1,1,1,5], 
[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]])

p1 = {'row':3, 'col':13 }
p2 = {'row':8, 'col':3 }

def distance(p1,p2, start):   
    p1 = [p1['row'], p1['col']]
    p2 = [p2['row'], p2['col']]
    dist = cdist([p1,p2],[start],'cityblock')
    return dist

def get_walls(world):
    """ from world gird get wall cells"""
    wall = []
    for x in range(world.shape[0]):
        for y in range(world.shape[1]):
            #print world[x][y]
            if (world[x][y] == 3 or world[x][y]==5):
                wall.append((x,y))
    return tuple(wall)



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
    def __init__(self, world, p1, p2):
        self.opened = []
        heapq.heapify(self.opened)
        self.closed = set()
        self.cells = []
        self.world = world
        self.grid_height = world.shape[1]  
        self.grid_width = world.shape[0] 
        self.start = None
        self.p1 = p1
        self.p2 = p2
        

    # def init_grid(self):
    #     walls = get_walls(self.world)
    #     #walls = ((0, 5), (1, 0), (1, 1), (1, 5), (2, 3),
    #     #     (3, 1), (3, 2), (3, 5), (4, 1), (4, 4), (5, 1))
    #     for x in range(self.grid_width):
    #         for y in range(self.grid_height):
    #             if (x, y) in walls:
    #                 reachable = False
    #             else:
    #                 reachable = True
    #             self.cells.append(Cell(x, y, reachable))
    #     self.start = self.get_cell(1, 1)
    #     self.end = self.get_cell(13, 13)




    def init_grid(self):
        """ initializes grid based on current world
            parmeter world
            retruns cell grid
        """

        walls = get_walls(self.world)
        for x in range(self.grid_width):
            for y in range(self.grid_height):
                if (x, y) in walls:
                    reachable = False
                else:
                    reachable = True
                self.cells.append(Cell(x, y, reachable))
        if not(self.start):
            print 'hola'
            start=[randrange(3,12), randrange(3,12)]
            self.start = self.get_cell(start[0],start[1])
            while world[start[0],start[1]] == 3:
                start=[randrange(3,12), randrange(3,12)]
                self.start = self.get_cell(start[0], start[1])
        dist = distance(self.p1,self.p2,start)
        if dist[0]<dist[1]:
            self.end = self.get_cell(self.p1['row'],self.p1['col'])
        else:
            self.end = self.get_cell(self.p2['row'],self.p2['col'])
        print self.end.x, self.end.y
        print self.start.x, self.start.y

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
        param adj adjacent cell to current cell
        param cell current cell being processed
        """
        adj.g = cell.g + 10
        adj.h = self.get_heuristic(adj)
        adj.parent = cell
        adj.f = adj.h + adj.g

    def process(self):
        """ implements the algortihm to find shortest disatnce between start and players"""

        # add starting cell to open heap queue
        heapq.heappush(self.opened, (self.start.f, self.start))
        while len(self.opened):
            # pop cell from heap queue
            f, cell = heapq.heappop(self.opened)
            # add cell to closed list so we don't process it twice
            self.closed.add(cell)
            # if ending cell, display found path
            if cell is self.end:
                self.display_path()
                break
            # get adjacent cells for cell
            adj_cells = self.get_adjacent_cells(cell)
            for adj_cell in adj_cells:
                if adj_cell.reachable and adj_cell not in self.closed:
                    if (adj_cell.f, adj_cell) in self.opened:
                        # if adj cell in open list, check if current path is
                        # better than the one previously found for this adj
                        # cell.
                        if adj_cell.g > cell.g + 10:
                            self.update_cell(adj_cell, cell)
                    else:
                        self.update_cell(adj_cell, cell)
                        # add adj cell to open list
                        heapq.heappush(self.opened, (adj_cell.f, adj_cell))
            


grid = AStar(world,p1,p2)
grid.init_grid()
grid.process()

















