export const hamburgerMenuOpen = document.querySelector(".hamburger-open");
export const navigation = document.querySelector("ul");

export function checkScreenSize() {
  const ScreenWidth = window.innerWidth;
  if (ScreenWidth <= 764) {
    navigation.style.display = "none";
  } else if (ScreenWidth >= 765) {
    navigation.style.display = "flex";
  }
}

checkScreenSize();

export function openMenu() {
  hamburgerMenuOpen.addEventListener("click", (e) => {
    if (navigation.style.display === "none") {
      navigation.style.display = "flex";
    } else if (navigation.style.display === "flex") {
      navigation.style.display = "none";
    }
  });
}
