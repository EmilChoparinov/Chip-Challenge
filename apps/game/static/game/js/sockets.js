socket = new WebSocket('ws://' + window.location.host + '/play/')

if(socket.readyState == WebSocket.OPEN) socket.onopen()

// socket.onopen = function(){
//     // console.log('open')
// }
// sockets.sendMessage = function(m){
//     socket.send(m)
// }