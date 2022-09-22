/*-- Import --*/

import { loadingIndicator, stopLoadingIndicator } from "./loadingFunction.js";
import {
  hamburgerMenuOpen,
  navigation,
  checkScreenSize,
  openMenu,
} from "./hamburger-menu.js";

/*-- Fetch specific Posts --*/

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url =
  "https://life-api.engelund.site/wp-json/wp/v2/posts/" + id + "/?_embed";

const detailContainer = document.querySelector(".post-specific");

async function fetchPostDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();
    stopLoadingIndicator();

    document.title = `${details.title.rendered} | Life`;
    const blogImage = details._embedded?.["wp:featuredmedia"][0].source_url;
    const blogImageAlt = details._embedded?.["wp:featuredmedia"][0].alt_text;

    detailContainer.innerHTML += `
                                  <img id="modalImg" class="postImage" src="${blogImage}" alt="${blogImageAlt}" />
                                  <h1 class="post-title">${details.title.rendered}</h1>
                                  <div class="underline-headings"></div>
                                  <div class="post-copy">${details.content.rendered}</div
                                  </div>
                                  <div class="underline-headings"></div>
                                  `;

    /*-- Modal --*/

    const modalContainer = document.querySelector(".modal-container");
    const modalImage = document.querySelector(".modale-image");
    const postImage = document.querySelector("#modalImg");

    postImage.addEventListener("click", function () {
      modalContainer.style.display = "flex";
      modalImage.src = this.src;
    });

    modalContainer.addEventListener("click", function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    });
  } catch (error) {
    stopLoadingIndicator();
    console.log(error);
  }
}

fetchPostDetails();

/*--Comment Section Validator--*/
const validationMessage = document.querySelector(".validation-message");
const commentForm = document.querySelector(".comment-form");
const inputName = document.querySelector("#name");
const nameError = document.querySelector(".name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email-error");
const comment = document.querySelector("#comment");
const commentError = document.querySelector(".comment-error");
const submit = document.querySelector(".submitButton");

function lengthChecker(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function emailValidator(email) {
  const regEx = /\S+@\S+\.\S+/;
  const pattern = regEx.test(email);
  return pattern;
}

let validForm = false;
submit.disabled = true;

const formValidation = () => {
  if (lengthChecker(inputName.value, 4) === true) {
    validForm = true;
    nameError.innerHTML = "";
  } else {
    validForm = false;
    nameError.innerHTML = "Must contain minimum 5 letters";
  }
  if (emailValidator(email.value) === true) {
    validForm = true;
    emailError.innerHTML = "";
  } else {
    validForm = false;
    emailError = "Please provide a valid email";
  }
  if (lengthChecker(comment.value, 0) === true) {
    validForm = true;
    commentError.innerHTML = "";
  } else {
    validForm = false;
    commentError.innerHTML = "Must contain minimum 1 character / Emoji";
  }
};

const disabledButton = () => {
  if (
    lengthChecker(inputName.value, 4) &&
    lengthChecker(comment.value, 0) &&
    emailValidator(email.value) === true
  ) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
};

inputName.addEventListener("keyup", formValidation);
email.addEventListener("keyup", formValidation);
comment.addEventListener("keyup", formValidation);

inputName.addEventListener("keyup", disabledButton);
email.addEventListener("keyup", disabledButton);
comment.addEventListener("keyup", disabledButton);

const commentFormSubmitter = (event) => {
  event.preventDefault();

  if (validForm === true) {
    validationMessage.innerHTML = `<p>Your comment has been sent!</p> <p>Our administrators will validate it before it gets posted</p>`;
  } else {
    validationMessage.innerHTML = "";
  }
  commentForm.reset();
  submit.disabled = true;
};

commentForm.addEventListener("submit", commentFormSubmitter);

/*-- Hamburger Menu --*/
checkScreenSize();
openMenu();
