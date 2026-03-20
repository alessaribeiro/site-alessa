const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");
const clearCompletedButton = document.getElementById("clear-completed");
const clearAllButton = document.getElementById("clear-all");

let tasks = [];

function showMessage(text) {
  message.textContent = text;
}

function clearMessage() {
  message.textContent = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Nenhuma tarefa adicionada ainda.";
    emptyItem.className = "task-item";
    taskList.appendChild(emptyItem);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = task.completed ? "task-item completed" : "task-item";

    const content = document.createElement("div");
    content.className = "task-content";

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    content.appendChild(text);

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "complete-btn";
    completeButton.textContent = task.completed ? "Desfazer" : "Concluir";
    completeButton.addEventListener("click", () => toggleTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    buttons.appendChild(completeButton);
    buttons.appendChild(deleteButton);

    item.appendChild(content);
    item.appendChild(buttons);

    taskList.appendChild(item);
  });
}

function addTask(text) {
  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    showMessage("Digite uma tarefa antes de adicionar.");
    return;
  }

  clearMessage();
  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});

clearAllButton.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

renderTasks();
