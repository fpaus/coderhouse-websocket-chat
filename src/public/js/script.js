const socket = io();

let user;
const chatBox = document.querySelector('#chatBox');

Swal.fire({
  title: 'Identifícate',
  text: 'Quien sos?',
  input: 'text',
  icon: 'question',
  inputValidator: (value) => {
    return !value && 'Necesitás escribir tu nombre';
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  console.log({ user });
  socket.emit('new_user', { user });
});

socket.on('messageLogs', (data) => {
  const log = document.querySelector('#messageLogs');
  const messages = data
    .map((message) => `<p>${message.user} dice: ${message.message}<p>`)
    .join('');
  log.innerHTML = messages;
});

socket.on('user_connected', (data) => {
  Swal.fire({
    title: 'Nuevo usuario conectado',
    text: `${data.user} se acaba de conectar`,
    toast: true,
    position: 'top-right',
  });
});

chatBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (chatBox.value.trim().length > 0) {
      socket.emit('message', {
        user: user,
        message: chatBox.value,
      });
      chatBox.value = '';
    }
  }
});
