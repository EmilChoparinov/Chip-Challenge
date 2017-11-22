$(document).ready(function(){
    var world_render = new world()
    world_render.render()
    world_render.moveRowBy(0);
    world_render.render()
});