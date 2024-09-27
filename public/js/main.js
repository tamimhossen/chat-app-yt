const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')

const socket = io();

//message from server
socket.on('message', message => {
    console.log(message)
    //message from server
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Get Msg to text
    const msg = e.target.elements.msg.value;
    //emitting the msg to server
    socket.emit( 'chatMessage', msg);
    //clear the input field 
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//Output message to dom

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`
    document.querySelector('.chat-messages').appendChild(div);
}