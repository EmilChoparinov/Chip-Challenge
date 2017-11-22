$(document).ready(function () {
    var world_render = new world()
    world_render.render()
    var player = world_render.player;
});

$(document).on('keydown', 'body', function (e) {
    switch (e.keycode) {
        case 37:
            if (world_render.playerPos["row"] - 1) {
                break;
            }
            world_render.MoveRowBy(-1);
            break;
        case 38:
            if (world_render.playerPos["row"] - 1) {
                break;
            }
            world_render.MoveColBy(1);
            break;
        case 39:
            if (world_render.playerPos["row"] - 1) {
                break;
            }
            world_render.MoveRowBy(1);
            break;
        case 40:
            if (world_render.playerPos["row"] - 1) {
                break;
            }
            world_render.MoveColBy(-1);
            break;
    }
})

