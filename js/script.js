const nodeInput = document.getElementById("node-value");
const indexInput = document.getElementById("index");
const maxColumnInput = document.getElementById("max-columns");
const maxColumnInputBtn = document.getElementById("max-column-input-btn");
const removeIndex = document.getElementById("remove-index");
const removeCount = document.getElementById("count");
const llSize = document.getElementById("size");
const addError = document.querySelector(".add-error");
const removeError = document.querySelector(".remove-error");
const tools = document.querySelectorAll(".tool");

let ll = new LinkedList();

function setMaxColumn(){
  maxColumns = +maxColumnInput.value;
  document.querySelectorAll(".row").forEach(r => {
    r.style.width = ((50 * (maxColumns - 1)) + (54 * maxColumns)) + "px";
  });
  render(0, ll);
}

let _r;

function checkIsRowAbove(){
  _r = document.querySelector(".above");
  if(_r) _r.classList.remove("above");
}

// Adding/inserting nodes

function addHead(){
  addNode(document.querySelector(".temp-input-field").value, 0);
}

function addNodeByInputBox(){
  let indexValue = +indexInput.value;
  if((indexValue > ll.size) || (indexValue < ll.size * -1)){
    addError.innerHTML = "Index out of range!";
    toggleOpen(document.querySelector(".tool"))
    return;
  }
  addError.innerHTML = "";
  addNode(nodeInput.value, indexValue);
  nodeInput.value = "";
  indexInput.value = ll.size;
}

function addNode(value, index, scroll=true){
  ll.insertElement(value, index, scroll);
  checkIsRowAbove();
}

function randomNumber(min=8, max=12){
  return Math.floor(Math.random() * (max - min) + min);
}

function iterate(count, iteratorConstant){
  if(count === iteratorConstant){
    addPointerEvents();
    return;
  }
  ll.insertElement(`${randomNumber(0, 101)}`);
  setTimeout(() => iterate(count + 1, iteratorConstant), 500);
}

function addRandomNodes(){
  removePointerEvents();
  iterate(0, randomNumber());
}

// removing nodes

function removeNode(remIndex=null, count=1, scroll=true){
  if(remIndex === null){
    remIndex = +removeIndex.value;
    count = +removeCount.value;
  }
  let f = remIndex;
  if(f < 0) f += ll.size;
  if((f + count > ll.size) || (f > ll.size - 1) || (f + count + 1 < 0)){
    removeError.innerHTML = "Index out of range!";
    toggleOpen(document.querySelector(".tool"));
    return;
  }
  removeError.innerHTML = "";
  unPop();
  ll.removeAt(remIndex, count, scroll);
}

function emptyList(){
  ll.emptyList();
}

function addPointerEvents(){
  visSpace.style.pointerEvents = "all";
}

function removePointerEvents(){
  visSpace.style.pointerEvents = "none";
}

function changeNodeValue(index, value){
  ll.changeValue(index, value);
}

let delay = 0;

function init(functionName, arg=null){
  if(window.innerWidth < 400) {
    tools.forEach(t => {
      if(t.classList.contains("open")) t.classList.remove("open");
    });
    delay = 1000;
  }
  setTimeout(() => {
    functionName(arg);
  }, delay);
}


