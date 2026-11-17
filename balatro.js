
document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filters button');
    const searchButton = document.querySelector('.search-button');
    const all_button = document.querySelector('.all-button').click();

    restoreSelectedOption('rarity', 'Rarity');
    restoreSelectedOption('type', 'Type');

    console.log("Search:", searchButton);
    console.log("All:", all_button);

    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            const section = button.closest('section');

            if (!section) return;

            const checkbox = section.querySelector('input[type="checkbox"]');
            const buttons = section.querySelectorAll('button');
            const label = section.querySelector('label');

            let sectionName = '';

            if (section.classList.contains('rarity')) {
                sectionName = 'rarity';
            } 
            else if (section.classList.contains('type')) {
                sectionName = 'type';
            } 
            else {
                return;
            }

            const selectedOption = button.textContent.trim();

            buttons.forEach(btn => {
                btn.classList.remove('selected');
            });

            button.classList.add('selected');

            localStorage.setItem(sectionName, selectedOption);

            if (label) {
                label.textContent =
                    `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}: ${selectedOption}`;
            }

            if (checkbox) {
                checkbox.checked = false;
            }

        });

    });


    if (searchButton) {
        searchButton.addEventListener('click', () => {

            const rarity = localStorage.getItem('rarity') || '';
            const type = localStorage.getItem('type') || '';

            const url = `jokers.html?rarity=${encodeURIComponent(rarity)}&type=${encodeURIComponent(type)}`;

            window.location.href = url;

        });
    }
});


function restoreSelectedOption(sectionName, defaultLabelText) {

    const section = document.querySelector(`.${sectionName}`);

    if (!section) return;

    const savedOption = localStorage.getItem(sectionName);
    const label = section.querySelector('label');

    if (!savedOption) return;

    const buttons = section.querySelectorAll('button');

    buttons.forEach(button => {

        if (button.textContent.trim() === savedOption.trim()) {
            button.classList.add('selected');
        } 
        else {
            button.classList.remove('selected');
        }

    });

    if (label) {
        label.textContent = `${defaultLabelText}: ${savedOption}`;
    }

}
