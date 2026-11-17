# Assignment 2 - Balatro Joker Researcher

## Description of the Static Website

This website allows users to search for jokers from the video game *Balatro* based on their rarity and type.

The main page contains two burger menus: one for selecting the joker rarity and another for selecting the joker type. After choosing the desired filters, the user can search for matching jokers or display all available jokers.

The results page shows each joker with its image, name, and description. A Return button allows the user to go back to the main page.

## Functionalities

- Fetches joker information from a JSON file.
- Displays the main page and the matching jokers page as HTML pages.
- Uses a looping video as the background.
- Allows users to select one option from each burger menu.
- Shows matching jokers based on the selected rarity and type.
- Allows users to show all jokers without applying filters.
- Displays each joker’s image, name, and description.
- Shows an animation when the matching jokers appear.
- Allows users to return to `index.html` by clicking the Return button.
- Provides access to the JSON file containing all joker information.

## How the JSON is Used

This website uses the `jokersData.json` file.

When the user visits the matching jokers page, the website fetches `jokersData.json` and receives the data for all known jokers. The page then compares each joker’s rarity and type with the selected filters.

If the user clicked the Search button, only jokers matching the selected rarity and type are displayed.

If the user clicked the Show All Jokers button, all jokers from the JSON file are displayed.

## Endpoints

### HTML Endpoints

- `/index.html` - Main page where the user can select the type and rarity of the joker.
- `/jokers.html?rarity=$...&type=$...` - Results page where the matching jokers are displayed.

### JSON Endpoint

- `/jokersData.json` - Contains all joker information.

## How to Use the Website

1. Open `https://rodrigojsm.github.io/DW_assignment/` in the browser.
2. Select a joker rarity from the rarity burger menu.
3. Select a joker type from the type burger menu.
4. Click the Search button to view jokers that match the selected rarity and type.
5. Alternatively, click the Show All Jokers button to display every joker from the JSON file.
6. Click the Return button to go back to the main page.