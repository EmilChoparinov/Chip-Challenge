game_socket = new WebSocket('ws://' + window.location.host + '/play/')

if(game_socket.readyState == WebSocket.OPEN) game_socket.onopen()

var world_render;
var player;
var identifier;
$(document).ready(function () {

    game_socket.onopen = function () {
        game_socket.send(JSON.stringify({
            'row': 2,
            'col': 2,
        }))
    }

    game_socket.onmessage = function (e) {
        console.log(e.data)
        if(e.data == "DISCONNECT"){
            world_render.player2Remove()
        }
        else if (JSON.parse(e.data)['world'] != undefined) {
            world_render = new world(JSON.parse(e.data)['world'])
            player = world_render.player;
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
                game_socket.send(JSON.stringify(world_render.player))
                break;
            case 38: //Move Up
                if (!canMove("up")) {
                    break;
                }
                world_render.moveRowBy(-1);
                world_render.render()
                game_socket.send(JSON.stringify(world_render.player))
                break;
            case 39: //Move Right
                if (!canMove("right")) {
                    break;
                }
                world_render.moveColBy(1);
                world_render.render()
                game_socket.send(JSON.stringify(world_render.player))
                break;
            case 40: //Move down
                if (!canMove("down")) {
                    break;
                }
                world_render.moveRowBy(1);
                world_render.render()
                game_socket.send(JSON.stringify(world_render.player))
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







