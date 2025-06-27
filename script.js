const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


window.onload = () => {
  tasks.forEach(task => createTaskElement(task.text, task.completed));
};

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTaskElement(taskText);
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    taskInput.value = "";
  }
});

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  li.className = "task-item";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "task-buttons";

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔";
  doneBtn.className = "done-btn";
  doneBtn.onclick = () => {
    li.classList.toggle("completed");
    updateTaskStatus(text);
    saveTasks();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", text);
    if (newText) {
      span.textContent = newText;
      updateTaskText(text, newText);
      saveTasks();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    tasks = tasks.filter(t => t.text !== text);
    saveTasks();
  };

  buttonsDiv.append(doneBtn, editBtn, deleteBtn);
  li.append(span, buttonsDiv);
  taskList.appendChild(li);
}

function updateTaskStatus(text) {
  tasks = tasks.map(t =>
    t.text === text ? { ...t, completed: !t.completed } : t
  );
}

function updateTaskText(oldText, newText) {
  tasks = tasks.map(t =>
    t.text === oldText ? { ...t, text: newText } : t
  );
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

























