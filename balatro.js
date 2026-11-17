
document.addEventListener('DOMContentLoaded', () => {

    const filter_buttons = document.querySelectorAll('.filters button');
    const search_button = document.querySelector('.search-button');

    restoreselected_option('rarity', 'Rarity');
    restoreselected_option('type', 'Type');

    filter_buttons.forEach(button => {

        button.addEventListener('click', () => {

            const section = button.closest('section');

            if (!section) return;

            const checkbox = section.querySelector('input[type="checkbox"]');
            const buttons = section.querySelectorAll('button');
            const label = section.querySelector('label');

            let section_name = '';

            if (section.classList.contains('rarity')) {
                section_name = 'rarity';
            } 
            else if (section.classList.contains('type')) {
                section_name = 'type';
            } 
            else {
                return;
            }

            const selected_option = button.textContent.trim();

            buttons.forEach(btn => {
                btn.classList.remove('selected');
            });

            button.classList.add('selected');

            localStorage.setItem(section_name, selected_option);

            if (label) {
                label.textContent =
                    `${section_name.charAt(0).toUpperCase() + section_name.slice(1)}: ${selected_option}`;
            }

            if (checkbox) {
                checkbox.checked = false;
            }

        });

    });


    if (search_button) {
        search_button.addEventListener('click', () => {

            const rarity = localStorage.getItem('rarity') || '';
            const type = localStorage.getItem('type') || '';

            const url = `jokers.html?rarity=${encodeURIComponent(rarity)}&type=${encodeURIComponent(type)}`;

            window.location.href = url;

        });
    }
});


function restoreselected_option(section_name, defaultLabelText) {

    const section = document.querySelector(`.${section_name}`);

    if (!section) return;

    const saved_option = localStorage.getItem(section_name);
    const label = section.querySelector('label');

    if (!saved_option) return;

    const buttons = section.querySelectorAll('button');

    buttons.forEach(button => {

        if (button.textContent.trim() === saved_option.trim()) {
            button.classList.add('selected');
        } 
        else {
            button.classList.remove('selected');
        }

    });

    if (label) {
        label.textContent = `${defaultLabelText}: ${saved_option}`;
    }

}
