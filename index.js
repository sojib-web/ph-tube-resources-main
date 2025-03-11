function loadCategory() {
  // fetch the data

  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:text-white hover:bg-[#FF1F3D] ">${category.category}</button>`;
    // @ts-ignore
    categoryContainer.append(categoryDiv);
  }
}
loadCategory();
