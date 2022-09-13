/*-- API FETCH WITH DYNAMIC HTML --*/
import { stopLoadingIndicator } from "./loadingFunction.js";

const carousel = document.querySelector(".carousel-posts");

const url = "https://life-api.engelund.site/wp-json/wp/v2/posts?page=1&_embed";

async function fetchPosts() {
  try {
    const response = await fetch(url);
    const posts = await response.json();
    stopLoadingIndicator();
    console.log(posts);
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
    console.log(error);
  }
}

fetchPosts();

/*-- CAROUSEL --*/

const carouselContainer = document.querySelector(".content-container");
const carouselPosts = document.querySelector(".carousel-posts");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const gap = 16;
let width = carouselContainer.offsetWidth;

nextBtn.addEventListener("click", nextSlide);

function nextSlide() {
  carouselContainer.scrollBy(width + gap, 0);
}

prevBtn.addEventListener("click", prevSlide);

function prevSlide() {
  carouselContainer.scrollBy(-(width + gap), 0);
}

window.addEventListener("resize", function () {
  width = carouselContainer.offsetWidth;
});
