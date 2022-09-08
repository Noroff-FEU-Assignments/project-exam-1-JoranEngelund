const postContainer = document.querySelector(".blog-posts");

const url = "https://life-api.engelund.site/wp-json/wp/v2/posts?page=1&_embed";

async function fetchPosts() {
  try {
    const response = await fetch(url);
    const posts = await response.json();
    console.log(posts);
    posts.forEach(function (post) {
      const blogImage = post._embedded?.["wp:featuredmedia"][0].source_url;
      const blogImageAlt = post._embedded?.["wp:featuredmedia"][0].alt_text;
      postContainer.innerHTML += `<div class="post-card">
                              <a href="/post-specific.html?id=${post.id}">
                                <img class="post-image" src="${blogImage}" alt="${blogImageAlt}"/>
                              </a>
                              <h2>${post.title.rendered}</h2>
                              <h3>${post.excerpt.rendered}</h3>
                              <div class="cta-container">
                                <a class="cta" href="/post-specific.html?id=${post.id}">View Post</a>
                              </div>
                            </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}
fetchPosts();