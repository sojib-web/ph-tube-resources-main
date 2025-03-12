function loadCategory() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category));
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button  onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:text-white hover:bg-[#FF1F3D] ">${category.category}</button>`;
    // @ts-ignore
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  // @ts-ignore
  videoContainer.innerHTML = "";
  videos.forEach((video) => {
    console.log(video);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `  <div class="mt-5 card bg-base-100">
        <figure class="relative">
          <img class=" w-full h-[200px] object-cover" src=${video.thumbnail} />
          <span
            class="absolute bottom-2 right-2 text-white bg-black p-2 text-sm rounded"
          >
            3hrs 56 min ago
          </span>
        </figure>
        <div class="flex gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div class="w-8 rounded-full">
                <img
                  src=${video.authors[0].profile_picture}
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h1 class="text-sm font-semibold">${video.title}</h1>
            <p class="text-sm text-gray-400 flex gap-1">
            ${video.authors[0].profile_name}
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/color/48/verified-badge.png"
                alt="verified-badge"
              />
            </p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>
          </div>
        </div>
      </div>`;
    // @ts-ignore
    videoContainer?.append(videoDiv);
  });
};

loadCategory();
