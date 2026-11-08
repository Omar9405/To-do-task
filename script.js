const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');
const counter = document.getElementById('counter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  let activeCount = 0;

  tasks.forEach((task, index) => {
    if (!task.completed) activeCount++;

    const li = document.createElement('li');
    if (task.completed) li.classList.add('done');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  counter.textContent = activeCount;
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    errorMsg.style.display = 'block';
    return;
  }

  errorMsg.style.display = 'none';
  tasks.push({ text: text, completed: false });
  taskInput.value = '';
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTasks();