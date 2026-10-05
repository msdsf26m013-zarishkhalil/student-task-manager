const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const searchInput = document.getElementById("searchInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Display tasks */

function displayTasks() {

```
taskList.innerHTML = "";

const searchText = searchInput.value.toLowerCase().trim();

const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchText) ||
    task.description.toLowerCase().includes(searchText)
);

if (filteredTasks.length === 0) {
    emptyMessage.style.display = "block";
    return;
}

emptyMessage.style.display = "none";

filteredTasks.forEach(task => {

    const li = document.createElement("li");

    li.className = "task";

    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <div class="task-title">${task.title}</div>

        <div class="task-description">
            ${task.description}
        </div>

        <div class="task-actions">

            <button
                class="complete-btn"
                onclick="toggleTask(${task.id})"
            >
                ${task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>

        </div>
    `;

    taskList.appendChild(li);
});
```

}

/* Add task */

taskForm.addEventListener("submit", function(event) {

```
event.preventDefault();

const title = taskTitle.value.trim();
const description = taskDescription.value.trim();

if (title === "" || description === "") {
    alert("Please enter both title and description.");
    return;
}

const newTask = {
    id: Date.now(),
    title: title,
    description: description,
    completed: false
};

tasks.push(newTask);

saveTasks();

taskForm.reset();

displayTasks();
```

});

/* Search tasks */

searchInput.addEventListener("input", function() {
displayTasks();
});

/* Complete / incomplete */

function toggleTask(id) {

```
tasks = tasks.map(task => {

    if (task.id === id) {
        return {
            ...task,
            completed: !task.completed
        };
    }

    return task;
});

saveTasks();
displayTasks();
```

}

/* Delete task */

function deleteTask(id) {

```
tasks = tasks.filter(task => task.id !== id);

saveTasks();
displayTasks();
```

}

/* Save tasks */

function saveTasks() {

```
localStorage.setItem("tasks", JSON.stringify(tasks));
```

}

/* Initial display */

displayTasks();
