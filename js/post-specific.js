const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://life-api.engelund.site/wp-json/wp/v2/posts?&_embed/" + id;

const detailContainer = document.querySelector(".post-specific");

async function fetchPostDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();
    console.log(details);
    detailContainer.innerHTML += `<div>
                                  </div>`;
  } catch (error) {
    console.log(error);
  }
}
fetchPostDetails();
