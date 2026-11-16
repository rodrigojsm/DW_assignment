
document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filters button');
    const searchButton = document.querySelector('.search-button');

    // RESTORE PREVIOUS SELECTIONS
    restoreSelectedOption('rarity', 'Rarity');
    restoreSelectedOption('type', 'Type');

    // FILTER BUTTONS
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

            // REMOVE PREVIOUS SELECTION
            buttons.forEach(btn => {
                btn.classList.remove('selected');
            });

            // SELECT CLICKED BUTTON
            button.classList.add('selected');

            // SAVE SELECTION
            localStorage.setItem(sectionName, selectedOption);

            // UPDATE LABEL
            if (label) {
                label.textContent =
                    `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}: ${selectedOption}`;
            }

            // CLOSE DROPDOWN
            if (checkbox) {
                checkbox.checked = false;
            }

        });

    });

    // SEARCH BUTTON
    if (searchButton) {
        searchButton.addEventListener('click', () => {

            const rarity = localStorage.getItem('rarity') || '';
            const type = localStorage.getItem('type') || '';

            const url = `jokers.html?rarity=${encodeURIComponent(rarity)}&type=${encodeURIComponent(type)}`;

            window.location.href = url;

        });
    }

});


// RESTORE PREVIOUS SELECTIONS
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
