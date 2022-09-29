export function errorMessage() {
  const errorContainer = document.querySelector(".error-alert");
  errorContainer.innerHTML = `<p>
                              It seems the posts didn't get loaded correctly, please refresh the page or return at a later       time!
                            </p>
                            <p>
                              If you have any inquieries, please use our contact form to get in touch
                            </p>
                            <div class="cta-container">
                              <a class="cta" href="/contact.html">Contact Us<a>
                            </div>`;
}

export function postSpecificErrorMessage() {
  const errorContainer = document.querySelector(".error-alert");
  errorContainer.innerHTML = `
                            <p>
                              It seems the post didn't get loaded correctly, please refresh the page or return at a later time!
                            </p>
                            <p>
                              You can view other posts in the meantime
                            </p>
                            <div class="cta-container">
                              <a class="cta" href="/posts.html">View Other Posts</a>
                            </div>
                            <p>
                              If you have any inquieries, please use our contact form to get in touch
                            </p>
                            <div class="cta-container">
                              <a class="cta" href="/contact.html">Contact Us<a>
                            </div>`;
}
