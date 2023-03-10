let form = document.forms.form;
let commentsBody = document.querySelector(".comments__body");
const nameContainerEl = document.querySelector(".form__name");
const textContainerEl = document.querySelector(".form__text");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = form.name.value;
  let date = form.date.value;
  let text = form.comment.value;

  // валидация и обработка ошибо
  if (name.length < 3) {
    nameContainerEl.classList.add("error");
    return;
  }
  if (!text.length) {
    textContainerEl.classList.add("error");
    return;
  }

  // Обработка даты
  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }
  let day = getMessageDateTime(date); // Сегодня, Вчера, 20.11.2012

  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let dateTime = `${day}, ${time}`; // склеиваем День + Время

  //Создаем новый комментарий и добавляем его в HTML
  let newComment = createComment(name, dateTime, text);
  commentsBody.append(newComment);

  // очищаем форму
  form.name.value = "";
  form.date.value = "";
  form.comment.value = "";
});

form.name.addEventListener("input", function (e) {
  nameContainerEl.classList.remove("error");
});

form.comment.addEventListener("input", function (e) {
  textContainerEl.classList.remove("error");
});

function validateLength(string, length) {
  return string.trim().length < length;
}

function createComment(name, date, text) {
  const comment = document.createElement("div");
  comment.className = "comment";
  const commentBody = document.createElement("div");
  commentBody.className = "comment__body";
  comment.append(commentBody);
  const commentTop = document.createElement("div");
  commentTop.className = "comment__top";
  const commentText = document.createElement("div");
  commentText.className = "comment__text";
  commentText.innerText = text;
  const commentActions = document.createElement("div");
  commentActions.className = "comment__actions";
  commentBody.append(commentTop, commentText, commentActions);
  const commentName = document.createElement("div");
  commentName.className = "comment__name";
  const commentDate = document.createElement("div");
  commentDate.className = "comment__date";
  commentName.innerText = name;
  commentDate.innerText = date;
  commentTop.append(commentName, commentDate);
  const commentLike = document.createElement("img");
  commentLike.className = "comment__like";
  commentLike.src = "img/heart-icon.svg";
  commentLike.alt = "like";
  const commentDelete = document.createElement("img");
  commentDelete.className = "comment__delete";
  commentDelete.src = "img/trash.svg";
  commentDelete.alt = "delete";
  commentActions.append(commentLike, commentDelete);

  commentLike.addEventListener("click", function () {
    commentLike.classList.toggle("liked");
  });
  commentDelete.addEventListener("click", function () {
    comment.remove();
  });

  return comment;
}

function dropHMS(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0, 0);
}

function getMessageDateTime(dateTime) {
  let today = new Date(), // присвоение и форматированние текущей даты
    yesterday = new Date(), // присвоение и форматирование текущей даты - 1 день
    roomLastMessageDate = new Date(dateTime); // присвоение и форматирование даты последнего сообщения комнаты

  yesterday.setDate(today.getDate() - 1);

  dropHMS(today);
  dropHMS(yesterday);
  dropHMS(roomLastMessageDate);

  if (dateTime) {
    if (today.getTime() === roomLastMessageDate.getTime()) {
      return "Сегодня";
    } else if (yesterday.getTime() === roomLastMessageDate.getTime()) {
      return "Вчера";
    } else {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return roomLastMessageDate.toLocaleString("ru-RU", options);
    }
  }
}
