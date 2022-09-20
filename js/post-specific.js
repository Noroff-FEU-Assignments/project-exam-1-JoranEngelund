/*-- Import --*/

import { loadingIndicator, stopLoadingIndicator } from "./loadingFunction.js";

/*-- Fetch specific Posts --*/

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url =
  "https://life-api.engelund.site/wp-json/wp/v2/posts/" + id + "/?_embed";

const detailContainer = document.querySelector(".post-specific");

async function fetchPostDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();
    stopLoadingIndicator();

    document.title = `${details.title.rendered} | Life`;
    const blogImage = details._embedded?.["wp:featuredmedia"][0].source_url;
    const blogImageAlt = details._embedded?.["wp:featuredmedia"][0].alt_text;

    detailContainer.innerHTML += `
                                  <img id="modalImg" class="postImage" src="${blogImage}" alt="${blogImageAlt}" />
                                  <h1 class="post-title">${details.title.rendered}</h1>
                                  <div class="underline-headings"></div>
                                  <div class="post-copy">${details.content.rendered}</div
                                  </div>
                                  <div class="underline-headings"></div>
                                  `;

    /*-- Modal --*/

    const modalContainer = document.querySelector(".modal-container");
    const modalImage = document.querySelector(".modale-image");
    const postImage = document.querySelector("#modalImg");

    postImage.addEventListener("click", function () {
      modalContainer.style.display = "flex";
      modalImage.src = this.src;
    });

    window.addEventListener("click", function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    });
  } catch (error) {
    stopLoadingIndicator();
    console.log(error);
  }
}

fetchPostDetails();

/*-- Modal --*/

setTimeout(() => {
  const modalContainer = document.querySelector(".modal-container");
  const modalImage = document.querySelector(".modale-image");
  const postImage = document.querySelector("#modalImg");

  postImage.addEventListener("click", function () {
    modalContainer.style.display = "flex";
    modalImage.src = this.src;
  });
}, "1000");

window.addEventListener("click", function (event) {
  const modalContainer = document.querySelector(".modal-container");
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
  }
});
