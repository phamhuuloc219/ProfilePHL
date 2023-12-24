const visSpace = document.querySelector(".visual-space");
let maxColumns = 10;
let rows = visSpace.children;
let contentBackgroundColor = "rgb(179, 126, 92)";
let valueColor = "white";
let speed = 0.5;

function setProps(element, val){
  let classNames = val.split(" ").filter(v => v !== "");
  for(let className of classNames) element.classList.add(className);
}

function createNode(){
  let node = Div(null, "node");
  let content = Div(null, "node-content");
  let arrow = drawArrow();
  setProps(arrow, "arrow");
  content.style.backgroundColor = contentBackgroundColor;
  node.appendChild(content);
  node.appendChild(arrow);
  return {node, content, arrow}
}

const animationValues = {
  "right": { rotate: 0, x: 50, y: 4 },
  "left": { rotate: 180, x: -50, y: 4 },
  "down": { rotate: 90, x: -3 , y: 60},
  "none": {rotate: 0, x: 0, y: 0}
}

function positionArrow(node, dir, anim=false){
  let d = 0;
  if(anim) d = speed;
  let pos = animationValues[dir];
  gsap.timeline()
    .to(node.arrow, {rotate: pos.rotate, duration: 0})
    .to(node.arrow, {duration: d, x: pos.x, y: pos.y})
}

function animate(node, dir){
  gsap.from(node.HTMLNode, {scaleX: 0, scaleY: 0, duration: speed, onComplete: () => positionArrow(node, dir, true)});
  node.current = false;
}

function Div(content, value=null){
  let div = document.createElement("div");
  if(content) div.innerHTML = content;
  if(value) setProps(div, value);
  return div;
}

function changeInput(btn){
  let parent = btn.parentElement;
  let inp = parent.children[3];
  inp.setAttribute("contenteditable", "true");
  inp.focus();
  btn.innerHTML = "Done";
  btn.addEventListener("click", function(){
    changeNodeValue(+parent.children[1].innerHTML, inp.innerHTML);   
    inp.setAttribute("contenteditable", "false");
    let newBtn = this.cloneNode();
    btn.parentElement.replaceChild(newBtn, btn);
    btn = newBtn;
    btn.innerHTML = "Change Value";
    btn.setAttribute("onclick", "changeInput(this)");
  });
}

function createPopUpContent(index, nodeValue){
  return `
  <span class="text-dark focused">Index:</span>
  <div class="text-dark focused">${index}</div>
  <div class="text-dark focused">Value:</div>
  <div class="text-dark focused" style="overflow: auto;">${nodeValue}</div>
  <button class="button focused" style="font-size: 80%;" onclick="changeInput(this)">Change Value</button>
  <div class="text-dark focused" style="color: rgb(0, 0, 200);">Insert Node</div>
  <input type="text" class="focused" placeholder="node value...">
  <button class="button focused" onclick="addNode(this.parentElement.children[6].value, ${index}, false)">Add Node</button>
  <button class="button-orange focused" onclick="removeNode(${index}, 1, false)">Remove</button>
  `
}

function createPopUp(node, index){
  let container = node.content;
  let popUp = Div(null, "pop-up focused");
  let popUpContent = Div(null, "pop-up-content focused");
  popUpContent.innerHTML = createPopUpContent(index, node.value);
  popUp.appendChild(popUpContent);
  popUp.appendChild(Div(null, "pop-up-arrow"));
  container.appendChild(popUp);
}

function renderFrom(rowNo, startNode){
  let row;
  let l;
  let nodeIndex;
  let dir;
  let value;
  for(let i = rowNo; i < rows.length; i++){
    row = rows[i];
    l = 0;
    nodeIndex = i * maxColumns;
    row.innerHTML = "";
    while(startNode){
      startNode.content.innerHTML = "";
      value = Div(startNode.value, "node-text");
      value.style.color = valueColor;
      startNode.content.appendChild(value);
      createPopUp(startNode, nodeIndex);
      row.appendChild(startNode.HTMLNode);
      i % 2 === 0 ? dir = "right" : dir = "left";
      if(l === maxColumns - 1) dir = "down";
      if(startNode.current) animate(startNode, dir)
      else positionArrow(startNode, dir);
      startNode = startNode.next;
      if(l === maxColumns - 1) break;
      nodeIndex++;
      l++;
    }
  }
}

function render(index, list){
  let currentRowIndex = parseInt(index / maxColumns);
  let lastRowIndex = parseInt(list.size / maxColumns);
  while((lastRowIndex > rows.length - 1) || (rows.length === 0)){
    let newRow;
    rows.length % 2 === 0 ? newRow = Div(null, "row left-right") : newRow = Div(null, "row right-left");
    newRow.style.width = ((50 * (maxColumns - 1)) + (54 * maxColumns)) + "px";
    visSpace.appendChild(newRow);
    rows = visSpace.children;
  }
  rows = visSpace.children;
  let closestNode = list.head;
  for(let i = 0; i < currentRowIndex * maxColumns; i++) closestNode = closestNode.next;
  renderFrom(currentRowIndex, closestNode);
}

function setTempClass(node){
  setProps(node.content, "temp-c");
  setProps(node.arrow, "temp-a");
}

function Node(value){
  this.value = value;
  this.next = null;
  let {node, content, arrow} = createNode();
  this.HTMLNode = node;
  this.content = content;
  this.arrow = arrow;
  this.current = true;
}

function LinkedList(){
  this.head = null;
  this.size = 0;

  const isHeadNull = node => {
    if(this.head === null){
      this.head = node;
      return true;
    }
    return false;
  }
  
  const scrollToNode = (element, scroll, behavior="auto") => {
    if(scroll)
    element.scrollIntoView({behavior, block: "center", inline: "center"});
  }

  this.insertElement = function(value, index=this.size, scroll=true){
    if(index < 0) index += this.size;
    let node = new Node(value);
    if(!isHeadNull(node)){
      if(index === 0){
        node.next = this.head;
        this.head = node;
      }else{
        let current = this.head;
        let previous;
        let it = 0;
        while(it < index){
          previous = current;
          current = current.next;
          it++;
        }
        node.next = current;
        previous.next = node;
      }
    }
    render(index, this);
    scrollToNode(node.content, scroll)
    this.size++;
    llSize.innerHTML = ll.size;
  }

  this.removeAt = function(index, count=1, scroll=true){
    if(index < 0) index += this.size;
    if(count < 0) {
      index += count + 1;
      count *= -1;
    }
    let from = this.head;
    let to;
    let it = 1;
    while(it < index){
      from = from.next;
      it++;
    }
    to = from;
    to.content.scrollIntoView(false);
    let starting = to.content;
    if(index === 0) setTempClass(from);
    while(it < index + count){
      to = to.next;
      setTempClass(to);
      it++;
    }
    to = to.next;
    from.next = to;
    gsap.timeline({defaults: {duration: speed}})
      .to(".temp-a", {x: 0, y: 0, stagger: speed - 0.2})
      .to(".temp-c", {boxShadow: "0 0 5px red, 0 0 10px red", stagger: {
        each: speed - 0.2,
        onStart: function(){
          scrollToNode(this._targets[0], scroll, "smooth")
        }
      }
      }, "-=" + (count * (speed - 0.2) + speed))
      .to(".temp-a", {scaleX: 0, scaleY: 0, duration: 0, onComplete: () => 
        scrollToNode(starting, scroll, "smooth")
      })
      .to(".temp-c", {scaleX: 0, scaleY: 0, stagger: {
        each: speed - 0.2,
        onStart: function() {
          scrollToNode(this._targets[0], scroll, "smooth")
        }
      }}, "+=0.8")
      .call(() => {
        scrollToNode(from.content, scroll, "smooth");
        if(index === 0){
          this.head = to;
          render(0, this);
        }else{
          render(index-1, this);
        }
        this.size -= count;
        llSize.innerHTML = this.size;
      })
  }

  this.emptyList = () => {
    this.head = null;
    this.size = 0;
    render(0, this);
    llSize.innerHTML = this.size;
  }

  this.changeValue = (index, newValue) => {
    if(index < 0) index += this.size;
    let node = this.head;
    for(let i = 0; i < index; i++) node = node.next;
    node.value = newValue;
    node.content.children[0].innerHTML = node.value;
  }
}

let popped;

function unPop(e=null){
  popped = document.querySelector(".pop");
  if(popped !== null){
    if(e) if(e.target.classList.contains("focused")) return;
    popped.classList.remove("pop");
    checkIsRowAbove();
  }
}

visSpace.addEventListener("click", e => {
  unPop(e);
  if(!e.target.classList.contains("node-content")) return;
  let targetPopUp = e.target.children[1] || e.target.parentElement.children[1];
  let targetRow = e.target.parentElement.parentElement;
  targetPopUp.classList.add("pop");
  targetRow.classList.add("above");
});



