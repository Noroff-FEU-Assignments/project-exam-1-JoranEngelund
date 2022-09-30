export const hamburgerMenuOpen = document.querySelector(".hamburger-open");
export const navigation = document.querySelector("ul");

export function checkScreenSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 764) {
    navigation.style.display = "none";
  }
}

checkScreenSize();

export function openMenu() {
  hamburgerMenuOpen.addEventListener("click", (e) => {
    if (navigation.style.display === "none") {
      navigation.style.display = "flex";
    } else {
      navigation.style.display = "none";
    }
  });
}
