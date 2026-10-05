function searchTasks() {
    const searchInput = document.getElementById("taskSearch");
    const searchText = searchInput.value.toLowerCase();
    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();

        if (taskText.includes(searchText)) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
}