const formHigh = document.querySelector(".todo_add_form_high");
const formLow = document.querySelector(".todo_add_form_low");

const TODO_LIST = [];
const STATUS = {
  TODO: "To Do",
  DONE: "Done",
};
const PRIORITY = {
  HIGH: "high",
  LOW: "low",
};

function getTask(evt, priority) {
  if (evt.target.firstElementChild.value !== "") {
    TODO_LIST.push({
      name: evt.target.firstElementChild.value,
      status: STATUS.TODO,
      priority: priority,
    });
  }
}

function elementCreation(element, index, taskList) {
  let newDiv = document.createElement("div");
  let newInput = document.createElement("input");
  let newTask = document.createElement("label");
  let deleteButton = document.createElement("button");
  
  let elName = element.name;
  newTask.textContent = elName;
  newInput.type = "checkbox";
  newInput.className = "todo_checkbox";
  newDiv.className = "checkbox_box";
  deleteButton.className = "submit_button close";
  deleteButton.textContent = "+";
  deleteButton.id = index;

  newDiv.append(newInput);
  newDiv.append(newTask);
  newDiv.append(deleteButton);
  taskList.append(newDiv);

  function showList() {
    TODO_LIST.splice(deleteButton.id, 1);
    render();
  }
  
  function changeStatus() {
    if (newInput.checked) {
      element.status = STATUS.DONE;
    } else element.status = STATUS.TODO;
  }
  deleteButton.addEventListener("click", showList);
  newInput.addEventListener("change", changeStatus)
}

function render() {
  document.querySelector(".checkboxes_high").innerHTML = "";
  document.querySelector(".checkboxes_low").innerHTML = "";

  TODO_LIST.forEach((element, index) => {
    if (element.priority === PRIORITY.HIGH) {
      const taskList = document.querySelector(".checkboxes_high");
      elementCreation(element, index, taskList);
    }
    if (element.priority === PRIORITY.LOW) {
      const taskList = document.querySelector(".checkboxes_low");
      elementCreation(element, index, taskList);
    }
  });
}

formHigh.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getTask(evt, PRIORITY.HIGH);
  render();
});

formLow.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getTask(evt, PRIORITY.LOW);
  render();
});