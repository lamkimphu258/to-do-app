const taskInput = document.querySelector("#task-input")
const taskAddButton = document.querySelector("#task-add-button")
const tasksList = document.querySelector("#tasks-list")
const taskClearButton = document.querySelector('#tasks-clear-button')
const taskSearch = document.querySelector('#task-search')

loadEventListeners()

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks)
  taskAddButton.addEventListener('click', addTask)
  taskClearButton.addEventListener('click', clearTasks)
  tasksList.addEventListener('click', deleteTask)
  taskSearch.addEventListener('keyup', searchTask)
}

function getTasks() {
  let tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'))

  tasks.forEach(function (task) {
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.appendChild(document.createTextNode(task))

    const deleteButton = document.createElement('a')
    deleteButton.className = 'ml-4 float-right delete-item'
    deleteButton.innerHTML = '<i class="fas fa-minus"></i>'

    li.appendChild(deleteButton)
    tasksList.appendChild(li)
  })
}

function addTask(e) {
  e.preventDefault()

  const li = document.createElement('li')
  li.className = 'list-group-item'
  li.appendChild(document.createTextNode(taskInput.value))

  const deleteButton = document.createElement('a')
  deleteButton.className = 'ml-4 float-right'
  deleteButton.innerHTML = '<i class="fas fa-minus"></i>'

  li.appendChild(deleteButton)
  tasksList.appendChild(li)

  addTaskToLocalStorage(taskInput.value)

  taskInput.value = ''
}

function addTaskToLocalStorage(task) {
  let tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'))
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks() {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild)
  }
  localStorage.clear()
}

function searchTask(e) {
  const searchText = e.target.value.toLowerCase()

  const lists = document.querySelectorAll('.list-group-item')
  lists.forEach(item => {
    const foundElement = item.textContent.toLowerCase().indexOf(searchText);
    if (foundElement === -1) {
      item.className += ' d-none'
    } else {
      item.classList.remove('d-none')
    }
  })
}

function deleteTask(e) {
  if (e.target.classList.contains('fa-minus')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()

      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

function removeTaskFromLocalStorage(task) {
  let tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'))
  tasks.forEach((taskItem, index) => {
    if (taskItem === task.textContent) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}