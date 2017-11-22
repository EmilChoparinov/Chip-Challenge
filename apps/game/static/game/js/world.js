class world {
    constructor(world) {
        this.PLAYER1_VIEW = `<img src="/static/game/sprites/robot1_left.png">`;
        this.PLAYER2_VIEW = `<img src="/static/game/sprites/robot2_right.png">`;
        this.SPACE_VIEW = `<img src="/static/game/sprites/space.png">`;
        this.VIEW_BOUND_EDGE_VIEW = `<img src="/static/game/sprites/wall1.png">`;
        this.WALL_VIEW = `<img src="/static/game/sprites/wall1.png">`;
        this.COIN_VIEW = `<img src="/static/game/sprites/coin1.png">`
        this.world = world
        this.player = {
            'row': 2,
            'col': 2,
        }
        this.player2 = {}
        this.points = new PointSystem()
    }

    render() {
        this.world[this.player['row']][this.player['col']] = 1
        var nextFrame = '';
        var startPoint = this.getStartPoint(5, 5)
        if (startPoint['row'] < 0) startPoint['row'] = 0;
        if (startPoint['col'] < 0) startPoint['col'] = 0;
        if (startPoint['col'] > 60 - startPoint['eCol']) startPoint['col'] = 60 - startPoint['eCol'];
        if (startPoint['row'] > 60 - startPoint['eRow']) startPoint['row'] = 60 - startPoint['eRow'];
        for (var row = startPoint['row']; row < startPoint['row'] + startPoint['eRow']; row++) {
            nextFrame += `<div class="game_row">`
            for (var col = startPoint['col']; col < startPoint['col'] + startPoint['eCol']; col++) {
                if (this.world[row][col] == 5) nextFrame += this.VIEW_BOUND_EDGE_VIEW;
                if (this.world[row][col] == 0) nextFrame += this.SPACE_VIEW;
                if (this.world[row][col] == 1) nextFrame += this.PLAYER1_VIEW;
                if (this.world[row][col] == 2) nextFrame += this.PLAYER2_VIEW;
                if (this.world[row][col] == 3) nextFrame += this.WALL_VIEW;
                if (this.world[row][col] == 6) nextFrame += this.COIN_VIEW;
            }
            nextFrame += `</div>`
        }
        $('#game').html(nextFrame)
    }


    getStartPoint(rRow, rCol) {
        var startPoint = {
            'row': this.player['row'] - rRow,
            'col': this.player['col'] - rCol,
            'eRow': rRow * 2 + 1,
            'eCol': rCol * 2 + 1,
        }
        return startPoint;
    }
    moveRowBy(val) {
        if (this.player['row'] == this.player2['row'] && this.player['col'] == this.player2['col']) {
            this.world[this.player['row']][this.player['col']] = 2
        } else {
            this.world[this.player['row']][this.player['col']] = 0
        }
        if(this.world[this.player['row'] + val][this.player['col']] == 6){
            this.points.AddPoints(1);
        }
        this.player['row'] += val;
        this.world[this.player['row']][this.player['col']] = 1
    }

    moveColBy(val) {
        if (this.player['row'] == this.player2['row'] && this.player['col'] == this.player2['col']) {
            this.world[this.player['row']][this.player['col']] = 2
        } else {
            this.world[this.player['row']][this.player['col']] = 0
        }
        if(this.world[this.player['row']][this.player['col'] + val] == 6){
            this.points.AddPoints(1);
        }
        this.player['col'] += val;
        this.world[this.player['row']][this.player['col']] = 1
    }
    player2Update(update) {
        if (this.player2['row'] != undefined) {
            this.world[this.player2['row']][this.player2['col']] = 0
        }
        if(this.world[this.player['row']][this.player['col']] == 6){
            this.points.AddPoints(1);
        }
        this.player2 = update;
        this.world[this.player2['row']][this.player2['col']] = 2
        this.render()
    }
    player2Remove() {
        this.world[this.player2['row']][this.player2['col']] = 0
        this.player2 = {
            'row': 2,
            'col': 2,
        }
        this.render()
    }
}

class PointSystem {
    constructor() {
        this.playerPoints = 0;
    }
    AddPoints(player) {
        this.playerPoints += 1
        $('#points').html(`Chips: ${this.playerPoints}`)
    }

}