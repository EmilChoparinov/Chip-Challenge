$(document).ready(function () {
    var world_render = new world()
    world_render.render()
    var player = world_render.player;
    $(document).on('keydown', 'body', function (e) {
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 37: //Move left
                if (!canMove("left")) {
                    break;
                }
                world_render.moveColBy(-1);
                world_render.render()
                break;
            case 38: //Move Up
                if (!canMove("up")) {
                    break;
                }
                world_render.moveRowBy(-1);
                world_render.render()
                break;
            case 39: //Move Right
                if (!canMove("right")) {
                    break;
                }
                world_render.moveColBy(1);
                world_render.render()
                break;
            case 40: //Move down
                if (!canMove("down")) {
                    break;
                }
                world_render.moveRowBy(1);
                world_render.render()
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







