const socket = io("http://localhost:8080");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
console.log("sgduwdui");
const username = prompt("Enter your name to join");
socket.emit("new-user-joined", username);

socket.on("user-joined", (username) => {
  append(`${username} joined the chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.username} : ${data.message}`, "left");
});

socket.on("left", (username) => {
  append(`${username} left the chat `, "left");
});
