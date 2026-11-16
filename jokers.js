const jokerData = {
  "Jokers": [
    {
        "Name": "Joker",
        "Rarity": "Common",
        "Type": "+m",
        "Description": "+4 Mult",
        "Image": "Joker_Imgs/80px-Joker.webp"
    },
    {
        "Name": "Greedy Joker",
        "Rarity": "Common",
        "Type": "+m",
        "Description": "Played cards with Diamond suit give +3 Mult when scored",
        "Image": "Joker_Imgs/80px-Greedy_Joker.webp"
    },
    {
        "Name": "Lusty Joker",
        "Rarity": "Common",
        "Type": "+m",
        "Description": "Played cards with Heart suit give +3 Mult when scored",
        "Image": "Joker_Imgs/80px-Lusty_Joker.webp"
    },
    {
        "Name": "Wrathful Joker",
        "Rarity": "Common",
        "Type": "+m",
        "Description": "Played cards with Spade suit give +3 Mult when scored",
        "Image": "Joker_Imgs/80px-Wrathful_Joker.webp"
    },
    {
        "Name": "Gluttonous Joker",
        "Rarity": "Common",
        "Type": "+m",
        "Description": "Played cards with Club suit give +3 Mult when scored",
        "Image": "Joker_Imgs/80px-Gluttonous_Joker.webp"
    },
    {
        "Name": "Credit Card",
        "Rarity": "Common",
        "Type": "+$",
        "Description": "Go up to -$20 in debt",
        "Image": "Joker_Imgs/80px-Credit_Card.webp"
    },
    {
        "Name": "Hiker",
        "Rarity": "Uncommon",
        "Type": "+c",
        "Description": "Every played card permanently gains +5 Chips when scored",
        "Image": "Joker_Imgs/80px-Hiker.webp"
    },
    {
        "Name": "Sly Joker",
        "Rarity": "Common",
        "Type": "+c",
        "Description": "+50 Chips if played hand contains a Pair",
        "Image": "Joker_Imgs/80px-Sly_Joker.webp"
    },
    {
        "Name": "Wee Joker",
        "Rarity": "Rare",
        "Type": "+c",
        "Description": "This Joker gains +8 Chips when each played 2 is scored (Currently +0 Chips)",
        "Image": "Joker_Imgs/80px-Wee_Joker.webp"
    }
  ]
};





document.addEventListener('DOMContentLoaded', () => {

    const jokersContainer = document.querySelector('.jokers-container');
    const menuButton = document.querySelector('.menu-button');

    // RETURN BUTTON
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            window.location.href = 'balatro.html';
        });
    }

  // GET SELECTED FILTERS
  const params = new URLSearchParams(window.location.search);

  const selectedRarity = params.get('rarity') || '';
  const selectedType = params.get('type') || '';

  // FILTER JOKERS
    const filteredJokers = jokerData.Jokers.filter(joker => {

        const matchesRarity =
            !selectedRarity ||
            joker.Rarity.toLowerCase() === selectedRarity.toLowerCase();

        const matchesType =
            !selectedType ||
            joker.Type.toLowerCase() === selectedType.toLowerCase();

        return matchesRarity && matchesType;
    });

    // DISPLAY RESULTS
    displayJokers(filteredJokers, jokersContainer);
});


// DISPLAY JOKERS
function displayJokers(jokers, container) {

    container.innerHTML = '';

    const noJokers = document.querySelector(".no-jokers");

    if (jokers.length === 0) {

        container.style.display = "none";
        noJokers.style.display = "flex";

        return;

    } else {

        container.style.display = "grid";
        noJokers.style.display = "none";

        jokers.forEach(joker => {

            const jokerCard = document.createElement('article');

            jokerCard.classList.add('joker-card');

            jokerCard.innerHTML = `
                <img src="${joker.Image}" alt="${joker.Name}">
                <h2>${joker.Name}</h2>
                <p>${joker.Description}</p>
            `;

            container.appendChild(jokerCard);
        });
    }
}