document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("taskItem");
      taskItem.innerHTML = `
            <input type="text" value="${task}" disabled>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
          `;
      taskList.appendChild(taskItem);

      const editButton = taskItem.querySelector("button:nth-child(2)");
      const deleteButton = taskItem.querySelector("button:nth-child(3)");

      editButton.addEventListener("click", function () {
        editTask(index);
      });

      deleteButton.addEventListener("click", function () {
        deleteTask(index);
      });
    });
  }

  function addTask() {
    const newTask = taskInput.value.trim();
    if (newTask !== "") {
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskInput.value = "";
      renderTasks();
    } else {
      alert("Please enter a task!");
    }
  }

  function editTask(index) {
    const updatedTask = prompt("Edit task:", tasks[index]);
    if (updatedTask !== null) {
      tasks[index] = updatedTask.trim();
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  }

  function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  }

  addBtn.addEventListener("click", addTask);

  renderTasks();
});
