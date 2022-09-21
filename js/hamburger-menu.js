const hamburgerMenuOpen = document.querySelector(".hamburger-open");
const hamburgerMenuClosed = document.querySelector(".hamburger-close");
const openBtn = document.querySelector("openMenu");

const navigation = document.querySelector("ul");

function removeNav() {
  const Screenwidth = window.innerWidth;
  if (Screenwidth <= 764) {
    navigation.style.display = "none";
  }
}

removeNav();

hamburgerMenuOpen.addEventListener("click", (e) => {
  if (navigation.style.display === "none") {
    navigation.style.display = "flex";
  } else {
    navigation.style.display = "none";
  }
});
