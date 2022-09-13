/*-- Import --*/
import { loadingIndicator, stopLoadingIndicator } from "./loadingFunction.js";

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
    console.log(details);

    document.title = `${details.title.rendered} | Life`;
    const blogImage = details._embedded?.["wp:featuredmedia"][0].source_url;
    const blogImageAlt = details._embedded?.["wp:featuredmedia"][0].alt_text;

    detailContainer.innerHTML += `
                                  <img class="postImage" src="${blogImage}" alt="${blogImageAlt}" />
                                  <h1 class="post-title">${details.title.rendered}</h1>
                                  <div class="underline-headings"></div>
                                  <div class="post-copy">${details.content.rendered}</div
                                  </div>
                                  <div class="underline-headings"></div>
                                  <div class="latest-comments"></div>
                                  `;
  } catch (error) {
    stopLoadingIndicator();
    console.log(error);
  }
}

fetchPostDetails();
