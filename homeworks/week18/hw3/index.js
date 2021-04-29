/* eslint-disable prefer-const */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable dot-notation */
/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable no-undef */

let list = [];

// render 函式
function render() {
  // 清空畫面
  $('.todo-list').empty();

  // 將 list 中的資料放入 <li> 中
  for (let i = 0; i < list.length; i++) {
    $('.todo-list').append(`
      <div class="list-group-item d-flex justify-content-between align-items-center todo-item" data-id=${i}>
        <input class="todo__completed-btn unselectable" type="checkbox" id="checkBox1" />
        <label class="todo-content" for="checkBox1">${list[i]['content']}</label>
        <div><i class="btn btn-danger delete-todo material-icons" aria-hidden="true" >delete</i></div>
      </div>
    `);
  }
}

// 增加新的 todo
function addTodo() {
  let newTodo = $('.new-todo').val(); // 從輸入框取得資料
  list.unshift({ // 添加資料
    content: newTodo,
    isDone: false,
  });
  $('.new-todo').val(''); // 清空輸入框
}

// 刪除 todo
function deleteTodo(remove) {
  const value = $(remove.target).parent().prev().text(); // 找到要刪除的 todo 的內容
  list = list.filter(item => item.content !== value); // 找到 list 陣列中此筆資料並刪除，然後留下剩下的 todo
}

// 完成 todo
function doneTodo(item) {
  const DoneTodo = $(item.target);
  const index = $(item.target).parent().attr('data-id');
  list[index]['isDone'] = list[index]['isDone'] ? false : true;
  if (list[index]['isDone']) {
    DoneTodo.attr('checked', true);
    DoneTodo.next().addClass('todo__content--completed');
  } else {
    DoneTodo.attr('checked', false);
    DoneTodo.next().removeClass('todo__content--completed');
  }
}

$(document).ready(() => {
  // 新增 todo
  $('.add-newTodo-btn').click(() => {
    if ($('.new-todo').val() !== '') { // 如果輸入框的值不為空值
      addTodo();
      render(); // 渲染整個頁面
    } else {
      alert('Opps，記得輸入待辦事項喔！');
    }
  });

  // 刪除 todo
  $('.todo-list').on('click', '.delete-todo', (e) => {
    deleteTodo(e);
    render(); // 渲染整個頁面
  });

  // 完成 todo
  $('.todo-list').on('click', (e) => {
    doneTodo(e);
  });
});
