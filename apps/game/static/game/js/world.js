class world {
    constructor() {
        this.PLAYER1_VIEW = `<img src="/static/game/sprites/player1.png">`;
        // PLAYER2_VIEW = `<img src="/static/game/sprites/player2.png">`;
        this.SPACE_VIEW = `<img src="/static/game/sprites/space.png">`;
        this.VIEW_BOUND_EDGE_VIEW = `<img src="/static/game/sprites/view_bound_edge.png">`;
        this.VIEW_BOUND_VIEW = `<img src="/static//game/sprites/view_bound.png">`;
        this.WALL_VIEW = `<img src="/static/game/sprites/wall.png">`;
        this.world = [
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 5],
            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        ]
        this.STATIC_VIEW = []

        this.player = {
            'row': 10,
            'col': 10,
        }
        this.world[this.player['row']][this.player['col']] = 1
    }

    render() {
        console.log('hello')
        var nextFrame = '';
        for (var row = 0; row < this.world.length; row++) {
            nextFrame += `<div class="game_row">`
            for (var col = 0; col < this.world[row].length; col++) {
                if (this.world[row][col] == 5) nextFrame += this.VIEW_BOUND_EDGE_VIEW;
                if (this.world[row][col] == 0) nextFrame += this.SPACE_VIEW;
                if (this.world[row][col] == 1) nextFrame += this.PLAYER1_VIEW;
                if (this.world[row][col] == 2) nextFrame += this.PLAYER2_VIEW;
                if (this.world[row][col] == 3) nextFrame += this.WALL_VIEW;
            }
            nextFrame += `</div>`
        }
        $('#game').html(nextFrame)
    }

    cornerRender() {
    }

    mainRender() {
    }

    moveRowBy(val) {
        this.world[this.player['row']][this.player['col']] = 0
        this.player['row'] += val;
        this.world[this.player['row']][this.player['col']] = 1
    }

    moveColBy(val) {
        this.world[this.player['row']][this.player['col']] = 0
        this.player['col'] += val;
        this.world[this.player['row']][this.player['col']] = 1        
    }
}