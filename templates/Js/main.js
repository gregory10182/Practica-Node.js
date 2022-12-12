var socket = io();

let formName = document.getElementById("formName");
let name = document.getElementById("name");
let form = document.getElementById("form");
let input = document.getElementById("input");
let mensajes = document.getElementById("mensajes");
let body = document.getElementById("body");

function mandarNoti(msg) {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  } else {
    const options = {
      body: msg,
      dir: "ltr",
      icon: "https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_html_icon_130541.png",
    };
    const notification = new Notification("Nuevo mensaje", options);
    notification.onclick = () => {
      window.focus();
    };
  }
}

formName.addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value) {
    name.disabled = "true";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!name.value) {
    alert("Ingrese su nombre");
  } else if (input.value) {
    socket.emit("chat message", name.value + ": " + input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  if (msg.split(":")[0] != name.value) {
    let item = document.createElement("li");
    item.className = "others";
    let others = document.createElement("div");
    item.appendChild(others);
    others.textContent = msg;
    mensajes.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    mandarNoti(msg);
  } else {
    let item = document.createElement("li");
    item.className = "me";
    let me = document.createElement("div");
    item.appendChild(me);
    me.textContent = msg;
    mensajes.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    mandarNoti(msg);
  }
});
