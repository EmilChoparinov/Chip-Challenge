$(document).ready(function () {
    var world_render = new world()
    world_render.render()
    var player = world_render.player;

    $(document).on('keydown', 'body', function (e) {
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 37: //Move left
                if (world_render.world[player['row']][player['col' - 1]] == 5) {
                    break;
                }
                world_render.moveRowBy(-1);
                world_render.render()
                break;
            case 38: //Move Up
                if (world_render.world[player['row']][player['col' - 1]] == 5) {
                    break;
                }
                world_render.moveColBy(1);
                world_render.render()
                break;
            case 39: //Move Right
                if (world_render.world[player['row']][player['col' - 1]] == 5) {
                    break;
                }
                world_render.moveRowBy(1);
                world_render.render()
                break;
            case 40: //Move down
                if (world_render.world[player['row']][player['col' - 1]] == 5) {
                    break;
                }
                world_render.moveColBy(-1);
                world_render.render()
                break;
        }
    })
});





