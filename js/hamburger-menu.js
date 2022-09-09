const openMenuContainer = document.querySelector(".hamburger-menu-open");
const closeMenuContainer = document.querySelector(".hamburger-menu-close");
const menuIcon = document.querySelectorAll(".fa-bars");
const closeIcon = document.querySelectorAll(".fa-times");
const navigation = document.querySelector("ul");
closeIcon.display = "none";

function openMenu() {
  if (!openMenuContainer.clicked === true) {
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
    navigation.style.display = "block";
  } else {
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
    navigation.style.display = "none";
  }
}

openMenuContainer.addEventListener("click", openMenu);
