document.addEventListener('DOMContentLoaded', main, false);

function msgTemplate(avatarSrc, nickname, msg, timestamp){
    return `
        <li>
            <div class="item">
                <div class="avatar"><img src=${avatarSrc}></div>
                <div class="nickname">~${nickname}</div>
                <div class="msg">${msg}</div>
                <div class="timestamp">${timestamp}</div>
            </div>
        </li>
    `;
}

function scrollToBottom(cssSelector){
    var objDiv = document.querySelector(cssSelector);
    objDiv.scrollTop = objDiv.scrollHeight;
}

function main(){
    var user = 'guest';
    var socket = io('http://localhost:3001');

    // submit message
    document.querySelector('.type-message form').onsubmit = function(e){
        var input = document.querySelector('.type-message input');
        var msg = input.value;
        if (!msg)  return false;
        socket.emit('chat message', {
            nickname: "shiv",
            type: "public",
            msg: msg
        });
        input.value = '';
        return false;
    };

    // socket events
    socket.on('chat message', function(data){
        var msgItem = msgTemplate('./imgs/avatars/dummy/145859.svg', data.nickname, data.msg, data.timestamp);
        document.querySelector('.chatroom .messages').innerHTML += msgItem; 
        scrollToBottom('.chatroom .messages');
    });

}
