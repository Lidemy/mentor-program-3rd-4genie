/* eslint-disable comma-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// todo 的模板
const template = `
  <div class="todo list-group-item list-group-item-action justify-content-between align-items-center {todoClass}">
        <div class="todo__content-wrapper custom-control custom-checkbox">
          <input type="checkbox" class="check-todo custom-control-input" id="todo-{id}">
          <label class="todo__content custom-control-label" for="todo-{id}">{content}</label>
        </div>
        <button type="button" class="btn-edit btn btn-primary " data-toggle="modal"  data-target="#edit-content">編輯</button>
        <button type="button" class="btn-delete btn btn-danger">刪除</button>
      </div>
`;


$(document).ready(() => {
  // 拿到 URL 中的 id 參數
  const searchParams = new URLSearchParams(window.location.search);
  const todoId = searchParams.get('id');

  // 如果 URL 有帶上 todo 的 id 參數，顯示該 todo
  if (todoId) {
    $.getJSON('./api/api_get_todo.php?id=' + todoId, (data) => {
      const todo = data.todo;
      $('.todos').empty();
      restoreTodos(todo);
    });
  } else {
    // 顯示所有 todos
    showTodo();
  }

  // 點擊 "新增" 後，新增一筆 todo
  $('.btn-add').click(() => {
    addTodo();
  });

  // 點擊 "Enter" 後，新增一筆 todo
  $('.input-todo').keydown((e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  // 點擊 "編輯" 後，顯示編輯 todo 視窗
  $('.todos').on('click', '.btn-edit', (e) => {
    showEditTodo(e);
  });

  // 在編輯視窗編輯 todo 後，儲存 todo
  $('.modal').on('click', '.btn-confirm', (e) => {
    editTodo(e);
  });

  // 點擊 "刪除" 後，刪除該 todo
  $('.todos').on('click', '.btn-delete', (e) => {
    deleteTodo(e);
  });

  // 勾選核對方框，表示是否完成 todo
  $('.todos').on('change', '.check-todo', (e) => {
    checkTodo(e);
  });

  // 篩選 todo 狀態
  $('.options').on('click', 'div', (e) => {
    filterTodo(e);
  });
});

// functions //

// 新增 todo
function addTodo() {
  const value = $('.input-todo').val();
  if (!value) return;
  $.ajax({
    type: 'POST',
    url: './api/api_add_todo.php',
    data: {
      todo: value,
      is_done: false
    },
    success: function () {
      $('.todos').empty();
      showTodo();
      $('.input-todo').val('');
    },
    error: function () {
      alert('Erro QQ');
    }
  });
}

// 顯示 todos
function restoreTodos(todos) {
  if (todos.length === 0) return;
  for (let i = 0; i < todos.length; i += 1) {
    const todo = todos[i];
    $('.todos').append(
      template
        .replace('{content}', escapeHtml(todo.todo))
        .replace(/{id}/g, todo.id)
        .replace('{todoClass}', todo.isDone ? 'checked' : '')
    );
    if (todo.isDone) {
      $('#todo-' + todo.id).prop('checked', true);
    }
  }
}

// 顯示所有 todos
function showTodo() {
  $.ajax({
    url: './api/api_get_all_todos.php'
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    const todo = data.todo;
    restoreTodos(todo);
  });
}

// 跳出編輯 Todo 視窗
function showEditTodo(e) {
  const target = $(e.target);
  const editId = target.parent().find('.check-todo').attr('id').replace('todo-', '');
  const todoValue = target.parent().find('.todo__content').text();

  $('#edit-content').modal('show');
  $('.edit-todo-input').val(todoValue);
  $('.edit-todo-input').attr('id', editId);
}

// 編輯 Todo
function editTodo() {
  todoValue = $('.edit-todo-input').val();
  editId = $('.edit-todo-input').attr('id');
  // $('.modal').off();

  $.ajax({
    type: 'POST',
    url: './api/api_update_todo.php',
    data: {
      id: editId,
      todo: todoValue
    },
    success: function (res) {
      console.log(res);
      $('.todos').empty();
      showTodo();
    },
    error: function () {
      alert('Erro QQ');
    }
  });
}

// 刪除 todo
function deleteTodo(e) {
  const target = $(e.target);
  const deleteId = $(target.parent().find('.check-todo')).attr('id').replace('todo-', '');

  $.ajax({
    type: 'POST',
    url: './api/api_delete_todo.php',
    data: {
      id: deleteId
    },
    success: function () {
      $('.todos').empty();
      showTodo();
    },
    error: function () {
      alert('Erro QQ');
    }
  });
}

// 勾選核對框
function checkTodo(e) {
  const target = $(e.target);
  const isDoneId = target.attr('id').replace('todo-', '');
  const isChecked = target.is(':checked');
  if (isChecked) {
    target.parents('.todo').addClass('checked');
  } else {
    target.parents('.todo').removeClass('checked');
  }
  $.ajax({
    type: 'POST',
    url: './api/api_update_isdone.php',
    data: {
      id: isDoneId,
      is_done: isChecked
    },
    success: function () {
      console.log('successfully change isDone status ');
    },
    error: function () {
      alert('Erro QQ');
    }
  });
}

// 篩選 todos
function filterTodo(e) {
  const target = $(e.target);
  const filter = target.attr('data-filter');
  $('.options div.active').removeClass('active');
  target.addClass('active');
  if (filter === 'all') {
    $('.todo').show();
  } else if (filter === 'uncomplete') {
    $('.todo').show();
    $('.todo.checked').hide();
  } else { // done
    $('.todo').hide();
    $('.todo.checked').show();
  }
}

// 跳脫字元
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
