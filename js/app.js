document.addEventListener('DOMContentLoaded', function () {
    
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let todos = [];
  let currentFilter = 'all';

  function updateCounter() {
    const activeCount = todos.filter(function (todo) {
      return !todo.completed;
    }).length;
    counter.textContent = activeCount + ' item(s) left';
  }

  function render() {
    todoList.innerHTML = '';

    todos.forEach(function (todo, index) {
      if (currentFilter === 'active' && todo.completed) return;
      if (currentFilter === 'done' && !todo.completed) return;

      const li = document.createElement('li');
      if (todo.completed) {
        li.classList.add('completed');
      }
      li.dataset.index = index;

      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = todo.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';

      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });

    updateCounter();
}

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = input.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');
    todos.push({ text: text, completed: false });
    input.value = '';
    render();
  });

  todoList.addEventListener('click', function (e) {
    const li = e.target.closest('li');
    if (!li) return;

    const index = Number(li.dataset.index);

    if (e.target.classList.contains('item-text')) {
      todos[index].completed = !todos[index].completed;
      render();
    }

    if (e.target.classList.contains('delete-btn')) {
      todos.splice(index, 1);
      render();
    }
  });

  filterAll.addEventListener('click', function () {
    currentFilter = 'all';
    render();
  });

  filterActive.addEventListener('click', function () {
    currentFilter = 'active';
    render();
  });

  filterDone.addEventListener('click', function () {
    currentFilter = 'done';
    render();
  });

  render();
});