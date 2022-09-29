/*-- IMPORT --*/

import { stopLoadingIndicator } from "./loadingFunction.js";
import {
  hamburgerMenuOpen,
  navigation,
  checkScreenSize,
  openMenu,
} from "./hamburger-menu.js";
import { errorMessage } from "./error.js";

/*-- API FETCH WITH DYNAMIC HTML --*/

const errorContainer = document.querySelector(".error-alert");
const postContainer = document.querySelector(".blog-posts");
const viewMoreBtn = document.querySelector(".view-more-cta");
const buttonsContainer = document.querySelector(".buttons-container");
let pageNumber = 0;

async function setup() {
  const posts = await fetchPosts();
  renderPosts(posts);
  setSearch(posts);
  stopLoadingIndicator();
}

async function fetchPosts() {
  pageNumber++;
  const url = `https://life-api.engelund.site/wp-json/wp/v2/posts?page=${pageNumber}&_embed`;

  try {
    const response = await fetch(url);
    const maximumPages = response.headers.get("x-wp-totalpages");
    const blogPost = await response.json();
    stopLoadingIndicator();

    if (Number(maximumPages) === pageNumber) {
      viewMoreBtn.style.display = "none";
    }
    return blogPost;
  } catch (error) {
    stopLoadingIndicator();
    buttonsContainer.innerHTML = "";
    errorMessage();
  }
}

function postCreator(blogPost) {
  const blogImage = blogPost._embedded?.["wp:featuredmedia"][0].source_url;
  const blogImageAlt = blogPost._embedded?.["wp:featuredmedia"][0].alt_text;

  return `<div class="post-card">
                              <a href="/post-specific.html?id=${blogPost.id}">
                                <img class="post-image" src="${blogImage}" alt="${blogImageAlt}"/>
                              </a>
                              <a href="/post-specific.html?id=${blogPost.id}"><h2>${blogPost.title.rendered}</h2></a>
                              <h3>${blogPost.excerpt.rendered}</h3>
                              <div class="cta-container">
                                <a class="cta" href="/post-specific.html?id=${blogPost.id}">View Post</a>
                              </div>
                            </div>`;
}

function renderPosts(postList) {
  postList.forEach(function (post) {
    postContainer.innerHTML += postCreator(post);
  });
}

function setSearch(postList) {
  const searchBar = document.querySelector(".search-field");

  searchBar.oninput = function (event) {
    const searchQuery = event.target.value.trim().toLowerCase();
    const filteredPost = filterPosts(searchQuery, postList);
    renderPosts(filteredPost);
  };
}

function filterPosts(searchQuery, postList) {
  postContainer.innerHTML = "";
  const filteredPost = postList.filter(function (blogPost) {
    if (blogPost.title.rendered.toLowerCase().trim().includes(searchQuery)) {
      return true;
    }
  });
  return filteredPost;
}

setup();

viewMoreBtn.addEventListener("click", setup);

checkScreenSize();
openMenu();
