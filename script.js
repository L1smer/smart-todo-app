const input = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const list = document.getElementById("task-list");

const noTasks = document.createElement("p");
noTasks.textContent = "No tasks yet...";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

	if (tasks.length === 0) {
    list.append(noTasks);
  } else {
    if (list.contains(noTasks)) {
      noTasks.remove();
    }
  }

  tasks.forEach((taskObj) => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = taskObj.task;

    const completedBtn = document.createElement("button");

    if (taskObj.completed) {
      completedBtn.textContent = "X";
      textSpan.classList.add("completed");
    } else {
      completedBtn.textContent = "✓";
      textSpan.classList.remove("completed");
    }

    completedBtn.addEventListener("click", () => {
      taskObj.completed = !taskObj.completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((task) => task.id !== taskObj.id);
      saveTasks();
      renderTasks();
    });

    const divBtns = document.createElement("div");
    divBtns.append(completedBtn, deleteBtn);

    li.append(textSpan, divBtns);
    list.append(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    const id = Date.now();

    tasks.push({
      id: id,
      task: input.value,
      completed: false,
    });

    saveTasks();
    renderTasks();

    input.value = "";
  }
});

renderTasks();
