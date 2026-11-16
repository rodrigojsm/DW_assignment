document.addEventListener('DOMContentLoaded', async () => {

    const jokersContainer = document.querySelector('.jokers-container');
    const menuButton = document.querySelector('.menu-button');

    // RETURN BUTTON
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            window.location.href = 'balatro.html';
        });
    }

    try {
        // LOAD JOKERS DATA FROM JSON FILE
        const response = await fetch('./Data/jokersData.json');

        if (!response.ok) {
            throw new Error(`Could not load jokersData.json. Status: ${response.status}`);
        }

        const jokerData = await response.json();

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

    } catch (error) {

        // If JSON fails to load, show no-jokers section
        displayJokers([], jokersContainer);
    }
});


// DISPLAY JOKERS
function displayJokers(jokers, container) {

    if (!container) {
        console.error('Could not find .jokers-container');
        return;
    }

    container.innerHTML = '';

    const noJokers = document.querySelector('.no-jokers');

    if (jokers.length === 0) {

        container.style.display = 'none';

        if (noJokers) {
            noJokers.style.display = 'flex';
        }

        return;

    } else {

        container.style.display = 'grid';

        if (noJokers) {
            noJokers.style.display = 'none';
        }

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