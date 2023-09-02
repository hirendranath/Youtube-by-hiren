let CategoryDetails;
function item(itemDetails) {
    CategoryDetails = itemDetails;
};

// button Short for onclick button
function buttonShort() {
    let sorted = CategoryDetails.sort((a, b) => parseFloat(b?.others?.views) - parseFloat(a?.others?.views));
    displayOnCard(sorted);
};

const loadedCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categories = data.data;
    showCategory(categories);
};

// categories
function showCategory(categories) {
    const categoryID = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoriesButton = document.createElement('div');
        categoriesButton.classList = 'mr-4 lg:mr-4 md:mr-8'
        categoriesButton.innerHTML = `
        <button id="act-btn" onclick='loadById("${category.category_id}")' class="tab focus:bg-red-600 focus:text-white bg-slate-200 rounded text-lg font-bold text-slate-500">${category.category}</button>
        `;
        categoryID.appendChild(categoriesButton);
    });
};

// video duration
function videoLength(card) {
    const totalSec = card?.others?.posted_date;
    const hours = Math.floor(totalSec / 3600);
    const remainingSec = totalSec % 3600;
    const minutes = Math.floor(remainingSec / 60);
    return [hours, minutes, remainingSec];
};

// show all the cards on the home page
const loadById = async (id = 1000) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const itemDetails = data.data;
    item(itemDetails);
    displayOnCard(itemDetails);
};


//All cards
function displayOnCard(itemDetails) {
    const cardContainer = document.getElementById('card-container');
    const blankContainer = document.getElementById('blank-container');
    cardContainer.textContent = '';
    blankContainer.textContent = '';

    if (itemDetails.length > 0) {

        itemDetails.forEach(card => {
            let [hr, min] = videoLength(card);

            const cardDetail = document.createElement('div');
            cardDetail.classList = "card card-compact w-11/12 bg-base-100 mx-auto space-y-2 mb-10";
            cardDetail.innerHTML = `
        <div class="relative">
        <div>
        <img src="${card.thumbnail}" class="w-10/12 h-40 rounded-lg" />
        </div>
        <div class="bg-black text-white px-4 rounded text-center right-18 top-32 lg:top-34 absolute">
           ${card?.others.posted_date ? `${hr} Hours ${min} Minute ago` : " "}
        </div>
        </div>

        <div class="card-body">
    
        <div class="flex">
                <div>
                    <img src="${card?.authors[0]?.profile_picture}" alt=""  class=" rounded-full w-10 h-10 mr-2 ">
                </div>
                <div>
                    <h2 class="card-title text-lg font-bold">${card.title}</h2>
                    <p>${card?.authors[0]?.profile_name} <span>${card.authors[0].verified ? '<i class="fa-solid fa-circle-check text-blue-800 ml-3"></i>' : ""}</span> </p>
                    <p> ${card?.others?.views} </p>
                </div>
            </div>
        </div>
        `
            cardContainer.appendChild(cardDetail);
        }


        )
    }
    else {
        const cardDetail = document.createElement('div');
        cardDetail.innerHTML = `<div class="text-center my-30 space-y-5">
        <img src="img/Icon.png" class="mx-auto">
        <h2 class="text-2xl font-semibold"> Sorry, There is no data found here. Please try another tab.</h2>
        </div>
        `
        blankContainer.appendChild(cardDetail);
    }

};

// video duration
function videoLength(card) {
    const totalSec = card?.others?.posted_date;
    const hours = Math.floor(totalSec / 3600);
    const remainingSec = totalSec % 3600;
    const minutes = Math.floor(remainingSec / 60);
    return [hours, minutes, remainingSec];
};


// by default calling 
loadById();
loadedCategory();

