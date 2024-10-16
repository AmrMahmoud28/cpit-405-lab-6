const initialLikes = 100;
const initialDislikes = 20;

let likesCount = initialLikes;
let dislikesCount = initialDislikes;
let comments = [];

const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const commentBox = document.getElementById("commentBox");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");
const commentsList = document.querySelector(".commentsList");
const confirmationMessage = document.getElementById("confirmationMessage");

likeBtn.addEventListener("click", () => {
  likesCount++;
  likeBtn.innerText = "👍 " + likesCount;
  setCookie("likes", likesCount);
});

dislikeBtn.addEventListener("click", () => {
  dislikesCount++;
  dislikeBtn.innerText = "👎 " + dislikesCount;
  setCookie("dislikes", dislikesCount);
});

submit.addEventListener("click", () => {
  const comment = commentBox.value.trim();
  if (comment) {
    comments.push(comment);
    commentBox.value = "";
    displayComments();
    setCookie("comments", JSON.stringify(comments));
  }
});

reset.addEventListener("click", () => {
  likesCount = initialLikes;
  dislikesCount = initialDislikes;
  comments = [];

  likeBtn.innerText = "👍 " + likesCount;
  dislikeBtn.innerText = "👎 " + dislikesCount;
  displayComments();

  clearCookies();
  enableButtons();

  confirmationMessage.style.opacity = 1;
  setTimeout(() => {
    confirmationMessage.style.opacity = 0;
  }, 2500);
});

const setCookie = (name, value) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 1 * 60 * 1000); // 1 minute
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}`;
  disableButton(name === "comments" ? name : "votes");
};

const getCookie = (name) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
};

const clearCookies = () => {
  document.cookie = `likes=; expires=${new Date(Date.now() - 1).toUTCString()}`;
  document.cookie = `dislikes=; expires=${new Date(
    Date.now() - 1
  ).toUTCString()}`;
  document.cookie = `comments=; expires=${new Date(
    Date.now() - 1
  ).toUTCString()}`;
};

const displayComments = () => {
  commentsList.innerHTML = "";
  comments.forEach((comment) => {
    const pElement = document.createElement("p");
    pElement.innerText = comment;
    commentsList.appendChild(pElement);
  });
};

const enableButtons = () => {
  likeBtn.disabled = false;
  dislikeBtn.disabled = false;
  commentBox.disabled = false;
  submit.disabled = false;
};

const disableButton = (type) => {
  if (type === "votes") {
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  } else if (type === "comments") {
    commentBox.disabled = true;
    submit.disabled = true;
  }
};

window.onload = () => {
  const likesCookie = getCookie("likes");
  const dislikesCookie = getCookie("dislikes");
  const commentsCookie = getCookie("comments");

  if (likesCookie) {
    likesCount = parseInt(likesCookie);
    disableButton("votes");
  }
  if (dislikesCookie) {
    dislikesCount = parseInt(dislikesCookie);
    disableButton("votes");
  }
  if (commentsCookie) {
    comments = JSON.parse(commentsCookie);
    disableButton("comments");
  }

  document.getElementById("likeBtn").innerText = "👍 " + likesCount;
  document.getElementById("dislikeBtn").innerText = "👎 " + dislikesCount;
  displayComments();
};
