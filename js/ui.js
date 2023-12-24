function toggleOpen(element){
  element.classList.toggle("open");
}

const btns = document.querySelectorAll(".icon");

function hoverOut(){
  gsap.to(this, {x: 0, width: 30, letterSpacing: 16, duration: 1})
}

function hoverIn(){
  let letterCount = this.innerText.length;
  let j = (18 * letterCount) - (3 * letterCount) + 16;
  gsap.to(this, {x: (j - 30) * -1, width: j, letterSpacing: 3, duration: 1})
}

btns.forEach(t => {
  t.addEventListener("mouseover", hoverIn);
  t.addEventListener("mouseout", hoverOut);
});


// styles tool bar

const nodeBackgroundColor = document.getElementById("node-color");
const nodeValueColor = document.getElementById("node-value-color");

nodeBackgroundColor.addEventListener("change", () => {
  contentBackgroundColor = nodeBackgroundColor.value;
  gsap.to(".node-content", {backgroundColor: contentBackgroundColor, duration: 0})
})

nodeValueColor.addEventListener("change", () => {
  valueColor = nodeValueColor.value;
  gsap.to(".node-text", {color: valueColor, duration: 0})
})

// speed/time

const currentSpeed = document.getElementById("current-speed");

function setSpeed(value){
  speed = +value;
  currentSpeed.innerHTML = `Speed: ${speed}`;
}

