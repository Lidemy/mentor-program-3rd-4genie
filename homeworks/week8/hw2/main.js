/* eslint-disable comma-dangle */
/* eslint-disable quotes */
// setting varialbe
const message = document.querySelector(".leave__message__content");
const sendComment = document.querySelector("button");
const baseUrl = "https://lidemy-book-store.herokuapp.com/posts";
const limit = 20;
const getMessage = `?_limit=${limit}&_sort=id&_order=asc`;

// get api data
function loadMessage() {
  const request = new XMLHttpRequest();
  request.open("GET", baseUrl + getMessage, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      message.innerHTML = "";
      const response = JSON.parse(request.responseText);
      for (let i = 0; i < response.length; i += 1) {
        const li = document.createElement("li");
        li.textContent = `${response[i].id} : ${response[i].content}`;
        message.appendChild(li);
      }
    } else {
      console.log(request.status);
    }
  };

  request.onerror = () => {
    console.log(request.status, request.responseText);
  };

  request.send();
}

// excute loadMessage function
loadMessage();

// Listening buttton, when clicked, post input message
sendComment.addEventListener("click", (e) => {
  const comment = document.querySelector("#text");
  const requestPost = new XMLHttpRequest();
  e.preventDefault();
  requestPost.open("POST", baseUrl, true);
  requestPost.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  requestPost.send(`content=${encodeURIComponent(comment.value)}`);

  const newRequest = new XMLHttpRequest();
  loadMessage(newRequest);
});
