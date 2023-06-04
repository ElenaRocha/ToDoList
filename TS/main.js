//con back-end
var taskTitle = document.querySelector("#task-title");
var taskDescription = document.querySelector("#task-description");
var taskList = document.querySelector(".task-list");
var toDoList = new Array();
function initial() {
    fetch("http://localhost:3000/lista-tareas", { method: "GET" })
        .then(function (response) {
        return response.json();
    })
        .then(function (myJson) {
        toDoList = JSON.parse(myJson);
        console.log("toDoList+JSON: ", toDoList);
        taskList.style.display = "block";
        taskList.innerHTML = "";
        taskList.textContent = "";
        var ul = document.createElement("ul");
        ul.setAttribute("class", "tasks");
        taskList.appendChild(ul);
        toDoList.forEach(function (item) {
            var li = document.createElement("li");
            li.innerHTML = "<p class=\"task\" id=\"" + item.id + "\">" + item.title + "<input type=\"button\" class=\"show-button\" value=\"Ver detalles\" onclick=\"details(" + item.id + ")\"/><input type=\"button\" class=\"erase-button\" value=\"Borrar\" onclick=\"eraseTask(" + item.id + ")\"/></p>";
            ul.appendChild(li);
        });
    })["catch"](function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}
initial();
function details(itemId) {
    fetch("http://localhost:3000/lista-tareas/" + itemId, { method: "GET" })
        .then(function (response) {
        return response.json();
    })
        .then(function (myJson) {
        toDoList = JSON.parse(myJson);
        taskList.style.display = "block";
        taskList.innerHTML = "";
        taskList.textContent = "";
        toDoList.forEach(function (item) {
            var p = document.createElement("p");
            p.setAttribute("class", "task");
            p.setAttribute("id", "\"" + item.id + "\"");
            p.innerHTML = item.title + ": " + item.description;
            taskList.appendChild(p);
        });
    })["catch"](function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}
function addToDo(itemId) {
    var task = {
        title: taskTitle.value,
        description: taskDescription.value
    };
    //console.log("esta es mi tarea:", task);
    fetch("http://localhost:3000/form", {
        method: "POST",
        body: JSON.stringify(task)
    })
        .then(function (res) { return res.json(); })["catch"](function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
    fetch("http://localhost:3000/form/" + itemId, {
        method: "PUT",
        body: JSON.stringify(task)
    })
        .then(function (res) { return res.json(); })["catch"](function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
    fetch("http://localhost:3000/form/" + itemId, { method: "DELETE" })
        .then(function (res) { return res.json(); })["catch"](function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}
/*
//con localstorage
const taskTitle: HTMLInputElement = document.querySelector(
  "#task-title"
) as HTMLInputElement;
const taskDescription: HTMLInputElement = document.querySelector(
  "#task-description"
) as HTMLInputElement;
const taskList: HTMLInputElement = document.querySelector(
  ".task-list"
) as HTMLInputElement;

let toDoList: Array<any> = new Array();
let idActual: number = 1;

if (storageContent) {
  toDoList = JSON.parse(localStorage.getItem("tareas"));

  taskList.style.display = "block";
  taskList.innerHTML = "";
  taskList.textContent = "";

  let ul = document.createElement("ul");
  ul.setAttribute("class", "tasks");
  taskList.appendChild(ul);

  toDoList.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `<p class="task" id="${item.id}">${item.title}: ${item.description} <input type="button" class="erase-button" value="Borrar" onclick="eraseTask(${item.id})"/></p>`;

    ul.appendChild(li);
  });
}

function addToDo(): void {
  const task = {
    id: idActual,
    title: taskTitle.value,
    description: taskDescription.value,
  };

  toDoList.push(task);

  localStorage.setItem("tareas", JSON.stringify(toDoList));

  toDoList = JSON.parse(localStorage.getItem("tareas"));

  taskTitle.value = " ";
  taskDescription.value = " ";
  updateList();

  idActual++;
}

function updateList(): void {
  taskList.style.display = "block";
  taskList.innerHTML = "";
  taskList.textContent = "";

  let ul = document.createElement("ul");
  ul.setAttribute("class", "tasks");
  taskList.appendChild(ul);

  toDoList.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `<p class="task" id="${item.id}">${item.title}: ${item.description} <input type="button" class="erase-button" value="Borrar" onclick="eraseTask(${item.id})"/></p>`;

    ul.appendChild(li);
  });
}

function eraseTask(itemId: number): void {
  let liBorrar = document.getElementById(String(itemId));
  liBorrar.parentNode.removeChild(liBorrar);
  let indice = toDoList.findIndex((tarea) => {
    return tarea.id === itemId;
  });
  toDoList.splice(indice, 1);

  localStorage.setItem("tareas", JSON.stringify(toDoList));

  toDoList = JSON.parse(localStorage.getItem("tareas"));
}
*/
/*
//sin localstorage

const textBox: HTMLInputElement = document.querySelector(
  ".text-box"
) as HTMLInputElement;
const taskList: HTMLInputElement = document.querySelector(
  ".task-list"
) as HTMLInputElement;

let toDoList = new Array();
let idActual: number = 1;

function addToDo(): void {
  const task = {
    id: idActual,
    title: textBox.value,
  };

  let preMatch = /[A-Z a-z]/;

  if (preMatch.test(task.title)) {
    toDoList.push(task);

    textBox.value = " ";
    updateList();
  }

  idActual++;
}

function updateList(): void {
  taskList.style.display = "block";
  taskList.innerHTML = "";
  taskList.textContent = "";

  let ul = document.createElement("ul");
  ul.setAttribute("class", "tasks");
  taskList.appendChild(ul);

  toDoList.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `<p class="task" id="${item.id}">${item.title} <input type="button" class="erase-button" value="Borrar" onclick="eraseTask(${item.id})"/></p>`;

    ul.appendChild(li);
  });
}

function eraseTask(itemId: number): void {
  let liBorrar = document.getElementById(String(itemId));
  liBorrar.parentNode.removeChild(liBorrar);
  let indice = toDoList.findIndex((tarea) => {
    return tarea.id === itemId;
  });
  toDoList.splice(indice, 1);
}*/
