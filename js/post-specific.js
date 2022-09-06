const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://life-api.engelund.site/wp-json/wp/v2/posts/" + id;

const detailContainer = document.querySelector(".post-specific");

async function fetchPostDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();
    console.log(details);
    detailContainer.innerHTML += `<div>
                                    <h1>${details.title.rendered}</h1>
                                    <h2>Publised: ${details.date}</h2>
                                    <p class="body-copy">${details.content.rendered}
                                  </div>`;
  } catch (error) {
    console.log(error);
  }
}
fetchPostDetails();
