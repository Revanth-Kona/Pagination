const cardContainer = document.getElementById("card-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const itemsPerPage = 4;
let currentPage = 1;
let data = [];

async function fetchData() {
    try {
        const response = await fetch("data.json");
        data = await response.json();
        mainData();
    } catch (error) {
        console.error("Error fetching data:", error);
        cardContainer.innerHTML = "<p class='text-danger'>Failed to load data.</p>";
    }
}

function mainData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    cardContainer.innerHTML = "";

    const currentData = data.slice(startIndex, endIndex);
    currentData.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card1 col-md-3";
        card.innerHTML = `
        <div class="card">
            <img src="${item.image_url}" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">Category: ${item.category}</p>
            </div>
        </div>`;
        cardContainer.appendChild(card);
    });
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= data.length;
}
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        mainData();
    }
});
nextBtn.addEventListener("click", () => {
    if (currentPage * itemsPerPage < data.length) {
        currentPage++;
        mainData();
    }
});
fetchData();