document.addEventListener('DOMContentLoaded', async () => {

    const jokers_container = document.querySelector('.jokers-container');
    const menu_button = document.querySelector('.menu-button');


    if (menu_button) {
        menu_button.addEventListener('click', () => {
            window.location.href = 'balatro.html';
        });
    }

    try {
        const response = await fetch('./Data/jokersData.json');

        if (!response.ok) {
            throw new Error(`Could not load jokersData.json. Status: ${response.status}`);
        }

        const joker_data = await response.json();

        const params = new URLSearchParams(window.location.search);

        const selected_rarity = params.get('rarity') || '';
        const selected_type = params.get('type') || '';

        let filtered_jokers;

        if (selected_rarity && selected_type === 'all') {
            filtered_jokers = joker_data.Jokers;

        } else {
            filtered_jokers = joker_data.Jokers.filter(joker => {

                const matches_rarity =
                    !selected_rarity ||
                    joker.Rarity.toLowerCase() === selected_rarity.toLowerCase();

                const matches_type =
                    !selected_type ||
                    joker.Type.toLowerCase() === selected_type.toLowerCase();

                return matches_rarity && matches_type;
            });
        }

        displayJokers(filtered_jokers, jokers_container);

    } catch (error) {

        displayJokers([], jokers_container);
    }
});


function displayJokers(jokers, container) {

    if (!container) {
        console.error('Could not find .jokers-container');
        return;
    }

    container.innerHTML = '';

    const no_jokers = document.querySelector('.no-jokers');


    if (jokers.length === 0) {

        container.style.display = 'none';

        if (no_jokers) {
            no_jokers.style.display = 'flex';
        }

        return;

    } else {

        container.style.display = 'grid';

        if (no_jokers) {
            no_jokers.style.display = 'none';
        }

        jokers.forEach(joker => {

            const joker_card = document.createElement('article');

            joker_card.classList.add('joker-card');

            joker_card.innerHTML = `
                <img src="${joker.Image}" alt="${joker.Name}">
                <h2>${joker.Name}</h2>
                <p>${joker.Description}</p>
            `;

            container.appendChild(joker_card);
        });
    }
}