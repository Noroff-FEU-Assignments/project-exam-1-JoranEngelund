const menu = document.querySelector(".hamburger-menu");
const menuIcon = document.querySelector(".fa-bars");
const closeIcon = document.querySelector(".fa-times");
const navigation = document.querySelector("ul");

function hamburgerMenu() {
  if (!menuIcon.clicked === true) {
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
    navigation.style.display = "block";
  } else {
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
    navigation.style.display = "none";
  }
}

menuIcon.addEventListener("click", hamburgerMenu);
