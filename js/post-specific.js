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
    console.log(details);

    document.title = `${details.title.rendered} | Life`;
    const blogImage = details._embedded?.["wp:featuredmedia"][0].source_url;
    const blogImageAlt = details._embedded?.["wp:featuredmedia"][0].alt_text;

    detailContainer.innerHTML += `<div>
                                    <img src="${blogImage}" alt="${blogImageAlt}" />
                                    <h1>${details.title.rendered}</h1>
                                    <div class="underline-headings"></div>
                                    <h2>${details.date}</h2>
                                    <div>${details.content.rendered}</div
                                  </div>
                                  <div class="underline-headings"></div>
                                  <div class="latest-comments">
                                  </div>
                                  <div class="cta-container">
                                    <button class="cta" type="button">View less</button>
                                  </div>
                                  `;
  } catch (error) {
    console.log(error);
  }
}

fetchPostDetails();
