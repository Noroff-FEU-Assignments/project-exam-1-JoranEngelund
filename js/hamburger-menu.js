const hamburgerMenuOpen = document.querySelector(".hamburger-open");
const hamburgerMenuClosed = document.querySelector(".hamburger-close");

const openBtn = document.querySelector(".openMenu");
const closeBtn = document.querySelector(".closeMenu");
const navigation = document.querySelector("ul");

hamburgerMenuOpen.addEventListener("click", (e) => {
  navigation.style.display = "flex";
  openBtn.style.display = "none";
  hamburgerMenuClosed.style.display = "flex";
  closeBtn.style.display = "flex";
});

hamburgerMenuClosed.addEventListener("click", (e) => {
  navigation.style.display = "none";
  openBtn.style.display = "flex";
  hamburgerMenuClosed.style.display = "none";
  closeBtn.style.display = "none";
});
