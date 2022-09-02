const carousel = document.querySelector(".carousel");

const url = "https://life-api.engelund.site/wp-json/wp/v2/media/";

async function fetchPosts() {
  try {
    const response = await fetch(url);
    const posts = await response.json();
    console.log(posts);

    posts.forEach(function (post) {
      carousel.innerHTML += `<div>
                                <h2>${post.title.rendered}</h2>
                                <img src="${post.guid.rendered}">
                                <div>${post.description.rendered}</div>
                            </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}
fetchPosts();
