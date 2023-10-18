const accessKey = "ASKTRl5uACgda-AFVDLwqvx4u_zbgrl19J1vVbPh3yg";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add("search-result");

      const image = document.createElement('img');
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement('a');
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);

      searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
      showMore.style.display = "block";
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

showMore.addEventListener("click", () => {
  searchImages();
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  searchImages();
});

darkModeToggle.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});
