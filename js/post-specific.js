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

    document.title = `${details.title.rendered} | Life`;

    detailContainer.innerHTML += `
                                    <h1>${details.title.rendered}</h1>
                                    ${details.content.rendered}
                                    <div class="cta-container">
                                <a class="cta" href="/posts.html">View other posts</a>
                              </div>
                                    `;
  } catch (error) {
    console.log(error);
  }
}
fetchPostDetails();
