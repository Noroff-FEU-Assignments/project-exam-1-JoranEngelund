/*--IMPORT --*/

import { stopLoadingIndicator } from "./loadingFunction.js";
import {
  hamburgerMenuOpen,
  navigation,
  checkScreenSize,
  openMenu,
} from "./hamburger-menu.js";

/*-- API FETCH WITH DYNAMIC HTML --*/

const carousel = document.querySelector(".carousel-posts");
const errorContainer = document.querySelector(".error-alert");

const url =
  "https://life-api.engelund.site/wp-json/wp/v2/posts?per_page=20&_embed";

async function fetchPosts() {
  try {
    const response = await fetch(url);
    const posts = await response.json();
    stopLoadingIndicator();
    posts.forEach(function (post) {
      const blogImage = post._embedded?.["wp:featuredmedia"][0].source_url;
      const blogImageAlt = post._embedded?.["wp:featuredmedia"][0].alt_text;
      carousel.innerHTML += `
                              <div class="slider-card">
                                <a href="/post-specific.html?id=${post.id}"><img class="post-image" src="${blogImage}" alt="${blogImageAlt}"/></a>
                                <h2>${post.title.rendered}</h2>
                                <h3>${post.excerpt.rendered}</h3>
                                <div class="cta-container">
                                  <a class="cta" href="/post-specific.html?id=${post.id}">View Post</a>
                                </div>
                              </div>
                            `;
    });
  } catch (error) {
    stopLoadingIndicator();
    errorContainer.innerHTML = `
                            <p>
                              It seems the posts didn't get loaded correctly, please refresh the page or return at a later       time!
                            </p>
                            <p>
                              If you have any inquieries, please use our contact form to get in touch
                            </p>
                            <div class="cta-container">
                              <a class="cta" href="/contact.html">Contact Us<a>
                            </div>`;
  }
}

fetchPosts();

/*-- CAROUSEL --*/

const carouselContainer = document.querySelector(".content-container");
const carouselPosts = document.querySelector(".carousel-posts");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

/*-- Initializing "gap" variabel to mimick the css styling of the gap in the carousel between each post-card --*/
const gap = 16;

/*-- initializing "width" variabel with the whole width of the container of the carousel, containing its border and padding width aswell --*/
let width = carouselContainer.offsetWidth;

/*-- Function that tells the container to move horizontally of the whole width of the container + the gap. "0" is vertically, which we set at 0, as we don't use it --*/
function nextSlide() {
  carouselContainer.scrollBy(width + gap, 0);
}

function prevSlide() {
  carouselContainer.scrollBy(-(width + gap), 0);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

window.addEventListener("resize", function () {
  width = carouselContainer.offsetWidth;
});

/*--HAMBURGER MENU--*/
checkScreenSize();
openMenu();
