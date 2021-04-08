// Stack: last in, first out
function Stack() {
  const arr = [];
  return {
    push: (item) => {
      arr.splice(arr.length, 0, item); // 在陣列 arr 的尾端加入 item
    },
    pop: () => {
      const result = arr.splice(-1, 1); // 陣列 result 表示回傳一個包含被刪除的 arr 陣列尾端的元素的陣列
      return result[0]; // 回傳陣列 result 內的元素
    },
  };
}

// Queue: first in, first out
function Queue() {
  const arr = [];
  return {
    push: (item) => {
      arr.splice(arr.length, 0, item);
    },
    pop: () => {
      const result = arr.splice(0, 1); // 陣列 result 表示回傳一個包含被刪除的 arr 陣列首端的元素的陣列
      return result[0]; // 回傳陣列 result 內的元素
    },
  };
}

const stack = new Stack();
stack.push(10);
stack.push(5);

console.log(stack.pop()); // 5
console.log(stack.pop()); // 10

const queue = new Queue();
queue.push(1);
queue.push(2);


console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
