chat_socket = new WebSocket('ws://' + window.location.host + '/play/chat/')
var c_identifier;
function updateScroll() {
    var objDiv = document.getElementById("scroller");
    objDiv.scrollTop = objDiv.scrollHeight;
}
function tr_handler(identifier_f, text) {
    console.log(c_identifier, identifier_f)
    if ( c_identifier == identifier_f || identifier == undefined) {
        c_identifier = identifier_f
        $('tr:last').after(
            `
            <tr>
                <td><img src="/static/game/sprites/player1.png" class='profile'> ${text}</td>
            </tr>
            `
        )
        return;
    }
    $('tr:last').after(
        `
        <tr>
            <td><img src="/static/game/sprites/player2.png" class='profile'></td>
            <td>${text}</td>
        </tr>
        `
    )
}

chat_socket.sendMessage = function (m) {
    chat_socket.send(m)
}

chat_socket.onmessage = function (e) {
    e = JSON.parse(e.data)
    console.log(e.identifier)
    tr_handler(e.identifier, e.message)
    updateScroll()
}

$(document).ready(function () {
    $('#message_form').submit(function () {
        var data = $(this).serializeArray()
        chat_socket.sendMessage(data[0].value)
        $('input[name="message"]').val('')
        return false;
    })

    $('.input').keypress(function (e) {
        console.log('pressed body')
        if (e.which == 13) {
            $('form').submit()
            return false;
        }
    })
})