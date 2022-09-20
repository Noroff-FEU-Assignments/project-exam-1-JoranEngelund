/*-- Form Validaton --*/

const formContainer = document.querySelector(".form-container");
const form = document.querySelector(".contact-form");
const inputName = document.querySelector("#name");
const nameError = document.querySelector(".name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector(".subject-error");
const message = document.querySelector("#message");
const messageError = document.querySelector(".message-error");
const errorMessage = document.querySelector(".error-message");
const submit = document.querySelector("#submit");
const validationMessage = document.querySelector(".validation-message");

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

const formValidation = () => {
  if (lengthChecker(inputName.value, 0) === true) {
    validForm = true;
    nameError.innerHTML = "";
  } else {
    validForm = false;
    nameError.innerHTML = "Must contain minimum 1 letter";
  }
  if (emailValidator(email.value) === true) {
    validForm = true;
    emailError.innerHTML = "";
  } else {
    validForm = false;
    emailError.innerHTML = "Please provide a valid email";
  }
  if (lengthChecker(subject.value, 2) === true) {
    validForm = true;
    subjectError.innerHTML = "";
  } else {
    validForm = false;
    subjectError.innerHTML = "Must contain minimum 3 characters";
  }
  if (lengthChecker(message.value, 9) === true) {
    validForm = true;
    messageError.innerHTML = "";
  } else {
    validForm = false;
    messageError.innerHTML = "Must contain minimum 10 characters";
  }
};

const buttonDisabled = () => {
  if (
    lengthChecker(inputName.value, 0) &&
    lengthChecker(subject.value, 2) &&
    lengthChecker(message.value, 9) &&
    emailValidator(email.value) === true
  ) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
};

inputName.addEventListener("keyup", buttonDisabled);
subject.addEventListener("keyup", buttonDisabled);
email.addEventListener("keyup", buttonDisabled);
message.addEventListener("keyup", buttonDisabled);

inputName.addEventListener("keyup", formValidation);
subject.addEventListener("keyup", formValidation);
email.addEventListener("keyup", formValidation);
message.addEventListener("keyup", formValidation);

const formSubmitter = (event) => {
  event.preventDefault();
  form.remove();
  if (validForm === true) {
    validationMessage.innerHTML = `<p>Your message has been succesfully sent!</p>`;
    formContainer.innerHTML = `<div class="cta-container">
                                <a class="cta" href="posts.html">View Posts</a>
                                </div>`;
  } else {
    validationMessage.innerHTML = "";
  }
  form.reset();
  submit.disabled = true;
};

form.addEventListener("submit", formSubmitter);
