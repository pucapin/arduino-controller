let socket = io("http://localhost:5050", { path: "/real-time" });

// ARDUINO CONTROLLERS


// INPUT COLOR SELECTORS (TERMINAL :3)
function selectRed() {
  fetch("http://localhost:5050/red", {
  method: "POST"
})
  .then(res => res.text())
  .then(text => console.log(text))
  .catch(err => console.error(err));
}
function selectYellow() {
  fetch("http://localhost:5050/yellow", {
  method: "POST"
})
  .then(res => res.text())
  .then(text => console.log(text))
  .catch(err => console.error(err));
}
function selectGreen() {
  fetch("http://localhost:5050/green", {
  method: "POST"
})
  .then(res => res.text())
  .then(text => console.log(text))
  .catch(err => console.error(err));
}
function selectParty() {
  fetch("http://localhost:5050/party", {
  method: "POST"
})
  .then(res => res.text())
  .then(text => console.log(text))
  .catch(err => console.error(err));
}
const partyBtn = document.getElementById('party-mode');

partyBtn.addEventListener('click', () => {
  selectParty();
})

function sendNumber(number) {
  fetch("http://localhost:5050/number", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ value: number })
});

}

dragElement(document.getElementById("window"));

// Draggable Window 1 (Photo)
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
      return; // Stop the drag function
    }
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//Draggable Window 2 (Terminal)
dragElement(document.getElementById("terminal"));


var i = 0;
var txt = 'hello world, welcome to my arduino demo :)'; /* The text */
var speed = 60; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("hello").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();

// Cursor image effect:

const hoverAreas = document.querySelectorAll('.side-container');
const cursorImgs = document.querySelectorAll('.cursor-img');

hoverAreas.forEach((hoverArea, index) => {
  const cursorImg = cursorImgs[index];
  
  hoverArea.addEventListener('mouseenter', () => {
    cursorImg.style.opacity = '1';
  });

  hoverArea.addEventListener('mousemove', (e) => {
    cursorImg.style.left = `${e.pageX}px`;
    cursorImg.style.top = `${e.pageY}px`;
  });

  hoverArea.addEventListener('mouseleave', () => {
    cursorImg.style.opacity = '0';
  });
});


// Color input -- send color

let colorInput = document.getElementById("color-input");
const redState = document.getElementById("red-state");
const yellowState = document.getElementById("yellow-state");
const greenState = document.getElementById("green-state");

const colorSelected = document.getElementById("color-selected");

function sendColor(color) {
console.log(color);
colorSelected.textContent = '> color selected: '
if(color == 'red') {
    colorSelected.style.color = 'red';
    greenState.textContent = "OFF";
    yellowState.textContent = "OFF";
    redState.textContent = "ON";

    selectRed();
} else if(color == 'green') {
    colorSelected.style.color = 'green';
    greenState.textContent = "ON";
    yellowState.textContent = "OFF";
    redState.textContent = "OFF";
    selectGreen();
} else if(color == 'yellow') {
    colorSelected.style.color = 'yellow';
    greenState.textContent = "OFF";
    yellowState.textContent = "ON";
    redState.textContent = "OFF";
    selectYellow();
} else {
    colorSelected.style.opacity = 1;
    colorSelected.style.color = 'red';
    colorSelected.textContent = '> oops! please select a color';
    return;
}

colorSelected.style.opacity = 1;
colorSelected.textContent += `${color}`

}

colorInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const colorValue = colorInput.value;
    sendColor(colorValue);
  }
});

// Blinker selector

const addBtn = document.getElementById("add");
const minusBtn = document.getElementById("minus");
const countEl = document.getElementById('counter');
const sendBlink = document.getElementById('send-blink');
let counter = 0;

addBtn.addEventListener('click', () => {
counter += 1;
countEl.textContent = counter;
})

minusBtn.addEventListener('click', () => {
if(counter == 0) {
    return;
}
counter -= 1;
countEl.textContent = counter;
})

sendBlink.addEventListener('click', () => {
  if(counter > 0) {
    sendNumber(counter);
    greenState.textContent = "ON";
    yellowState.textContent = "ON";
    redState.textContent = "ON";
  }
  return;
})