/*-- IMPORT --*/

import { stopLoadingIndicator } from "./loadingFunction.js";
import {
  hamburgerMenuOpen,
  navigation,
  checkScreenSize,
  openMenu,
} from "./hamburger-menu.js";

/*-- API FETCH WITH DYNAMIC HTML --*/

const errorContainer = document.querySelector(".error-alert");
const postContainer = document.querySelector(".blog-posts");
const viewMoreBtn = document.querySelector(".view-more-cta");
const buttonsContainer = document.querySelector(".buttons-container");

let pageNumber = 0;

async function fetchPosts() {
  pageNumber++;
  const url = `https://life-api.engelund.site/wp-json/wp/v2/posts?page=${pageNumber}&_embed`;

  try {
    const response = await fetch(url);
    const maximumPages = response.headers.get("x-wp-totalpages");
    const posts = await response.json();
    if (Number(maximumPages) === pageNumber) {
      viewMoreBtn.style.display = "none";
    }

    stopLoadingIndicator();

    posts.forEach(function (post) {
      const blogImage = post._embedded?.["wp:featuredmedia"][0].source_url;
      const blogImageAlt = post._embedded?.["wp:featuredmedia"][0].alt_text;
      postContainer.innerHTML += `<div class="post-card">
                              <a href="/post-specific.html?id=${post.id}">
                                <img class="post-image" src="${blogImage}" alt="${blogImageAlt}"/>
                              </a>
                              <a href="/post-specific.html?id=${post.id}"><h2>${post.title.rendered}</h2></a>
                              <h3>${post.excerpt.rendered}</h3>
                              <div class="cta-container">
                                <a class="cta" href="/post-specific.html?id=${post.id}">View Post</a>
                              </div>
                            </div>`;
    });
  } catch (error) {
    stopLoadingIndicator();
    buttonsContainer.innerHTML = "";
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

viewMoreBtn.addEventListener("click", fetchPosts);

/*-- SEARCH FUNCTION --*/

/*-- HAMBURGER MENU--*/

checkScreenSize();
openMenu();
