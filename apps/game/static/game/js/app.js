var world_render;
var player;
var identifier;
$(document).ready(function () {

    socket.onopen = function () {
    }

    socket.onmessage = function (e) {
        // console.log(e)
        if (JSON.parse(e.data)['world'] != undefined) {
            world_render = new world(JSON.parse(e.data)['world'])
            console.log(JSON.parse(JSON.parse(e.data)['player_2_pos'])['col'])
            player = world_render.player;
            world_render.player2 = JSON.parse(JSON.parse(e.data)['player_2_pos']);
            console.log(JSON.parse(JSON.parse(e.data)['player_2_pos']))
            identifier = JSON.parse(e.data)['identifier']
        }
        else if(JSON.parse(e.data)['identifier'] != identifier){
            world_render.player2Update(JSON.parse(e.data)['pos'])
        }
        world_render.render()
    }

    $(document).on('keydown', 'body', function (e) {
        switch (e.keyCode) {
            case 37: //Move left
                if (!canMove("left")) {
                    break;
                }
                world_render.moveColBy(-1);
                world_render.render()
                socket.send(JSON.stringify(world_render.player))
                break;
            case 38: //Move Up
                if (!canMove("up")) {
                    break;
                }
                world_render.moveRowBy(-1);
                world_render.render()
                socket.send(JSON.stringify(world_render.player))
                break;
            case 39: //Move Right
                if (!canMove("right")) {
                    break;
                }
                world_render.moveColBy(1);
                world_render.render()
                socket.send(JSON.stringify(world_render.player))
                break;
            case 40: //Move down
                if (!canMove("down")) {
                    break;
                }
                world_render.moveRowBy(1);
                world_render.render()
                socket.send(JSON.stringify(world_render.player))
                break;
        }
    })
    var canMove = function (direction) {
        switch (direction) {
            case "left":
                if (world_render.world[player['row']][player['col'] - 1] == 2 ||
                    world_render.world[player['row']][player['col'] - 1] == 3 ||
                    world_render.world[player['row']][player['col'] - 1] == 5) {
                    return false;
                }
                return true
                break;
            case "up":
                if (world_render.world[player['row'] - 1][player['col']] == 2 ||
                    world_render.world[player['row'] - 1][player['col']] == 3 ||
                    world_render.world[player['row'] - 1][player['col']] == 5) {
                    return false;
                }
                return true
                break;
            case "right":
                if (world_render.world[player['row']][player['col'] + 1] == 2 ||
                    world_render.world[player['row']][player['col'] + 1] == 3 ||
                    world_render.world[player['row']][player['col'] + 1] == 5) {
                    return false;
                }
                return true;
                break;
            case "down":
                if (world_render.world[player['row'] + 1][player['col']] == 2 ||
                    world_render.world[player['row'] + 1][player['col']] == 3 ||
                    world_render.world[player['row'] + 1][player['col']] == 5) {
                    return false;
                }
                return true;
                break;

        }


    }
});







