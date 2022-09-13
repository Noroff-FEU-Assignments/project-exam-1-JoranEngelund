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

const viewMoreBtn = document.querySelector(".view-more-cta");
const viewLessBtn = document.querySelector(".view-less-cta");
const viewMoreContainer = document.querySelector(".view-more");

let pageNumber = 1;

function viewMore() {
  if (!viewMoreBtn.clicked) {
    pageNumber++;
    const testUrl = `https://life-api.engelund.site/wp-json/wp/v2/posts?page=${pageNumber}&_embed`;

    async function fetchMore() {
      try {
        const response = await fetch(testUrl);
        const data = await response.json();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data.length <= 2) {
            viewMoreBtn.style.display = "none";
            viewLessBtn.style.display = "block";
          }
        }
        data.forEach(function (post) {
          const blogImage = post._embedded?.["wp:featuredmedia"][0].source_url;
          const blogImageAlt = post._embedded?.["wp:featuredmedia"][0].alt_text;
          viewMoreContainer.innerHTML += `<div class="post-card">
                                      <a href="/post-specific.html?id=${post.id}">
                                        <img class="post-image" src="${blogImage}" alt="${blogImageAlt}"/>
                                      </a>
                                      <h2>${post.title.rendered}</h2>
                                      <h3>${post.excerpt.rendered}</h3>
                                      <div class="cta-container">
                                        <a class="cta" href="/post-specific.html?id=${post.id}">View Post</a>
                                      </div>
                                    </div>
                                    `;
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchMore();
  }
}

viewMoreBtn.addEventListener("click", viewMore);

function viewLess() {
  if (!viewLessBtn.clicked) {
    pageNumber--;
    viewMoreContainer.innerHTML = "";
    viewMoreBtn.style.display = "block";
    viewLessBtn.style.display = "none";
  }
}
viewLessBtn.addEventListener("click", viewLess);
