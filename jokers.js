document.addEventListener('DOMContentLoaded', async () => {

    const jokersContainer = document.querySelector('.jokers-container');
    const menuButton = document.querySelector('.menu-button');


    if (menuButton) {
        menuButton.addEventListener('click', () => {
            window.location.href = 'balatro.html';
        });
    }

    try {
        const response = await fetch('./Data/jokersData.json');

        if (!response.ok) {
            throw new Error(`Could not load jokersData.json. Status: ${response.status}`);
        }

        const jokerData = await response.json();

        const params = new URLSearchParams(window.location.search);

        const selectedRarity = params.get('rarity') || '';
        const selectedType = params.get('type') || '';

        let filteredJokers;

        if (selectedRarity && selectedType === 'all') {
            filteredJokers = jokerData.Jokers;

        } else {
            filteredJokers = jokerData.Jokers.filter(joker => {

                const matchesRarity =
                    !selectedRarity ||
                    joker.Rarity.toLowerCase() === selectedRarity.toLowerCase();

                const matchesType =
                    !selectedType ||
                    joker.Type.toLowerCase() === selectedType.toLowerCase();

                return matchesRarity && matchesType;
            });
        }

        displayJokers(filteredJokers, jokersContainer);

    } catch (error) {

        displayJokers([], jokersContainer);
    }
});


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