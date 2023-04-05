let currentCardIndex = 0;

window.onload = function() {
  fetch('cards.json')
    .then(response => response.json())
    .then(data => {
      createCardDivs(data);
    });
};


function createCardDivs(data) {
  const cardsContainer = document.querySelector('#cards');
  const detailsContainer = document.querySelector('#the-details');

  const arrowsContainer = document.querySelector('#arrows');
  const arrowLeft = document.querySelector('#arrow-left');
  const arrowRight = document.querySelector('#arrow-right');

  arrowLeft.addEventListener('click', function(event) {
    currentCardIndex = (currentCardIndex - 1 + Object.keys(data).length) % Object.keys(data).length;
    updateDetails(data[Object.keys(data)[currentCardIndex]], detailsContainer);
  });

  arrowRight.addEventListener('click', function(event) {
    currentCardIndex = (currentCardIndex + 1) % Object.keys(data).length;
    updateDetails(data[Object.keys(data)[currentCardIndex]], detailsContainer);
  });

  for (const [title, cardData] of Object.entries(data)) {
    const cardId = title.toLowerCase().replace(" ", "-");
    const cardDiv = document.createElement("div");
    cardDiv.id = cardId;

    // Add a class of "card" to the div
    cardDiv.classList.add("card");

    // Create an <img> element and set its src attribute to the image path
    const cardImg = document.createElement("img");
    cardImg.src = cardData.image2;
    cardDiv.appendChild(cardImg);

    // Preload the images
    const imgPreload1 = new Image();
    imgPreload1.src = cardData.image;

    const imgPreload2 = new Image();
    imgPreload2.src = cardData.image2;

    /* const cardHerb = document.createElement("p");
    cardHerb.textContent = cardData.herb;
    cardDiv.appendChild(cardHerb); */

    // Add a click event listener to each card
      cardDiv.addEventListener('click', function(event) {
        updateDetails(cardData, detailsContainer);
        document.getElementById("the-details").classList.add("show-details");
        arrowsContainer.classList.remove("hide-arrows");
      });

    // Append the "cardDiv" to the "cardsContainer" element
    cardsContainer.appendChild(cardDiv);
  }

  // Add an event listener to the "random-card" element
  const randomCard = document.querySelector("#random-card");
  randomCard.addEventListener('click', function(event) {
    const cardKeys = Object.keys(data);
    const randomIndex = Math.floor(Math.random() * cardKeys.length);
    const randomCardKey = cardKeys[randomIndex];
    const randomCardData = data[randomCardKey];
    updateDetails(randomCardData, document.querySelector('#the-details'));
    document.getElementById("the-details").classList.add("show-details");
    arrowsContainer.classList.remove("hide-arrows");
  });
}

function updateDetails(cardData, detailsContainer) {
  // Update the details container with the card's details
  const poem = cardData.poem.replace(/\n/g, '<br>');
  const associations = Array.isArray(cardData.associations) ? cardData.associations.join(', ') : '';

  detailsContainer.innerHTML = `
    <div class="card-details">
      <h3>${cardData.herb}</h3>
      <h4>${cardData.number} ${cardData.title}</h4>
      <p>${associations}</p>
      <p>${poem}</p>
    </div>
    <img src="${cardData.image}" class="card-image" />
  `;
}

