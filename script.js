// Function to add a task
function addTask() {
    var input = document.getElementById('taskInput');
    var newTask = input.value;
    if (newTask.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    var list = document.getElementById('taskList');
    var listItem = document.createElement('li');

    // Create a span to hold the task text
    var taskText = document.createElement('span');
    taskText.textContent = newTask;
    taskText.style.flexGrow = "1"; // Allows text to fill the space

    // Create a delete button with a trash icon
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn'; // Apply styling
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Using Font Awesome icon
    deleteBtn.onclick = function() {
        list.removeChild(listItem);
        saveTasks(); // Save tasks after deletion
    };

    // Append elements to the list item
    listItem.appendChild(taskText); // Append text first
    listItem.appendChild(deleteBtn); // Append delete button second

    // Append list item to the list
    list.appendChild(listItem);

    input.value = ''; // Clear input field

    saveTasks(); // Save tasks after addition
}

// Function to save tasks to local storage
function saveTasks() {
    var tasks = [];
    var listItems = document.querySelectorAll('#taskList li span');
    listItems.forEach(function(item) {
        tasks.push(item.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        var tasks = JSON.parse(savedTasks);
        tasks.forEach(function(task) {
            var list = document.getElementById('taskList');
            var listItem = document.createElement('li');
            var taskText = document.createElement('span');
            taskText.textContent = task;
            taskText.style.flexGrow = "1";
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.onclick = function() {
                list.removeChild(listItem);
                saveTasks(); // Save tasks after deletion
            };
            listItem.appendChild(taskText);
            listItem.appendChild(deleteBtn);
            list.appendChild(listItem);
        });
    }
}

// Load tasks on page load
loadTasks();

// Setup event listener for Enter key
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        addTask();
    }
});
