function removeActiveCLass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

const showLoader = () => {
  document.getElementById("loader")?.classList.remove("hidden");
  document.getElementById("video-container")?.classList.add("hidden");
};
const hiddenLoader = () => {
  document.getElementById("loader")?.classList.add("hidden");
  document.getElementById("video-container")?.classList.remove("hidden");
};
function loadCategory() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
  // fetch the data
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => {
      removeActiveCLass();
      document.getElementById("btn-all")?.classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveCLass();
      const clickedButton = document.getElementById(`btn-${id}`);
      // @ts-ignore
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

const loadVideDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoadVideDetails(data.video));
};
const displayLoadVideDetails = (video) => {
  console.log(video);
  // @ts-ignore
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("detailsContainer");
  // @ts-ignore
  detailsContainer.innerHTML = `<div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>`;
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:text-white hover:bg-[#FF1F3D] ">${category.category}</button>`;
    // @ts-ignore
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  // @ts-ignore
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    // @ts-ignore
    videoContainer.innerHTML = `
     <div
        class="col-span-full flex flex-col justify-center items-center text-center py-20"
      >
        <img class="w-20" src="./images/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, there is no content here
        </h2>
      </div>`;
    hiddenLoader();
    return;
  }
  videos.forEach((video) => {
    // console.log(video);
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
               ${
                 video.authors[0].verified == true
                   ? `<img
                width="20"
                height="20"
                src="https://img.icons8.com/color/48/verified-badge.png"
                alt="verified-badge"
              />`
                   : `<img
  width="20"
  height="20"
  src="https://img.icons8.com/color/48/verified-badge.png"
  alt="verified-badge"
  style="opacity: 0.2;"
/>
`
               }
            </p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>
          </div>
        </div>
        <button onclick=loadVideDetails('${
          video.video_id
        }') class="btn btn-block">Show Details</button>
      </div>`;
    // @ts-ignore
    videoContainer?.append(videoDiv);
  });
  hiddenLoader();
};

// @ts-ignore
document.getElementById("SearchInput").addEventListener("keyup", (e) => {
  console.log(e);
  // @ts-ignore
  const input = e.target.value;
  console.log(input);

  loadVideos(input);
});
loadCategory();
