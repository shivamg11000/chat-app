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

// not used until now
var profilePage = `
    <div id="login-page">
    <div class="login">
        <div class="logo"><img src="https://image.flaticon.com/icons/svg/179/179608.svg"></div>
        <form id="goggle+" action="">
            <button type="submit">Google+</button>
        </form>
        <form id="guest" action="">
            <button type="submit">Enter as Guest</button>
        </form>
    </div>
    </div>
`;

function scrollToBottom(cssSelector){
    var objDiv = document.querySelector(cssSelector);
    objDiv.scrollTop = objDiv.scrollHeight;
}

function randNumber(limit){ // starts from 1 upto limit
    return Math.floor(Math.random()*limit) + 1;
}

function formatTextForDisplay(txt){
    return txt.trim().split("").map(function(letter){
        if (letter==="\n")  return "<br>";
        return letter;
    }).join("");
}

function main(){
    var socket = io('http://localhost:3000');
    var user = {};

    // submit message
    document.querySelector('.type-message form').onkeypress = function(e){
        if (e.which === 13 && !e.shiftKey){
            var input = e.target;
            var msg = formatTextForDisplay(input.value);
            if (!msg)  return false;
            socket.emit('chat message', {
                nickname: "shiv",
                type: "public",
                msg: msg
            });
            input.value = "";
            return false;
        }  
    };

    // socket events
    socket.on('chat message', function(data){
        var msgItem = msgTemplate(`./imgs/avatars/dummy/${randNumber(10)}.svg`, data.nickname, data.msg, data.timestamp);
        document.querySelector('.chatroom .messages').innerHTML += msgItem; 
        scrollToBottom('.chatroom .messages');
    });

}
