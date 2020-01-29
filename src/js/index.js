/**
 * GLOBAL APP CONTROLLER
 */
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { DOMelements, DOMelementStr, renderLoader, clearLoader, displaySbMsg } from './views/base';

/** Global state of app
 * - current search object
 * - current recipe object
 * - shopping list object
 * - liked recipes object
 */
const state = {};
//window.state = state; // for testing


/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();

    // if there is a query:
    if (query) {
        // create new search object and add to state
        state.search = new Search(query);

        // prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(DOMelements.searchResults);

        try {
            // perform recipe search
            await state.search.getResults();
    
            // display results in UI
            searchView.displayResults(state.search.recipes);
        } catch(error) {
            displaySbMsg('There was an error processing the search.');
        }
        clearLoader();
    }
};

// event listener for search button -> perform search and display first page of results
DOMelements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

// event listener for page buttons -> reload results to new page of results
DOMelements.searchResultPages.addEventListener('click', event => {
    const button = event.target.closest(`.${DOMelementStr.pageBtns}`);
    if (button) {
        const gotoPage = parseInt(button.dataset.goto);
        searchView.clearResults();
        searchView.displayResults(state.search.recipes, gotoPage);
    }
});

// event listeners for hovering over '?' button to toggle visibility of possible queries label
DOMelements.queriesBtn.addEventListener('mouseover', event => {
    DOMelements.queryList.style = 'visibility: visible';
});

DOMelements.queriesBtn.addEventListener('mouseout', event => {
    DOMelements.queryList.style = 'visibility: hidden';
});


/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // get id from URL
    const id = window.location.hash.replace('#', '');
    
    // if there is a valid id:
    if (id) {
        // create new recipe object and add to state
        state.recipe = new Recipe(id);

        // prepare UI for recipe
        recipeView.clearRecipe();
        searchView.highlightSelected(id);
        renderLoader(DOMelements.recipeField);

        try {
            // get recipe data, parse ingredients, and calculate time/servings
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();

            // display recipe in UI
            recipeView.displayRecipe(state.recipe, state.likes.isLiked(id));
        } catch(error) {
            displaySbMsg('There was an error retrieving the recipe.');
        }
        clearLoader();
    }
};

// event listener for both when hash changes in URL and when page loads
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // create new shopping list if no existing list
    if (!state.list) state.list = new List();

    // if shopping list was empty, render clear list button
    if (state.list.items.length === 0) listView.showClearBtn();

    // add each ingredient to shopping list
    state.recipe.ingredients.forEach(ing => {
        const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
        listView.displayItem(item);
    });
};

// event listeners for shopping list panel
DOMelements.shoppingList.addEventListener('click', event => {
    const id = event.target.closest(`.${DOMelementStr.shopItem}`).dataset.itemid;

    // delete item button clicked
    if (event.target.matches(`.${DOMelementStr.shopItemDelete}, .${DOMelementStr.shopItemDelete} *`)) {
        // delete item from state
        state.list.deleteItem(id);

        // delete item from UI
        listView.deleteItem(id);

        // if shopping list is now empty, hide clear list button
        if (state.list.items.length === 0) listView.hideClearBtn();
    }
    // item count input clicked
    else if (event.target.matches(`.${DOMelementStr.shopItemCount}`)) {
        // update item count in model
        const val = parseFloat(event.target.value);
        state.list.updateCount(id, val);
    }
});

// event listener for clear list button -> clear list from state and UI, then hide button
DOMelements.clearBtn.addEventListener('click', () => {
    state.list.clearList();
    listView.clearList();
    listView.hideClearBtn();
});


/**
 * LIKES CONTROLLER
 */
const controlLikes = () => {
    // create new likes object if not already created (though always created on load)
    if (!state.likes) state.likes = new Likes();
    const curRecipeID = state.recipe.id;

    // user has not yet liked current recipe
    if (!state.likes.isLiked(curRecipeID)) {
        // add like to state
        const newLike = state.likes.addLike(
            curRecipeID,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.img
        );

        // toggle like button
        likesView.toggleLikeBtn(true);

        // add like to UI list
        likesView.displayLike(newLike);
    } 
    // user has already liked current recipe
    else {
        // remove like from state
        state.likes.deleteLike(curRecipeID);

        // toggle like button
        likesView.toggleLikeBtn(false);

        // remove like from UI list
        likesView.deleteLike(curRecipeID);
    }
    likesView.toggleLikeMenu(state.likes.getLikesNum());
};

// restore liked recipes on page load
window.addEventListener('load', () => {
    // create new Likes object and retrieve data from local storage
    state.likes = new Likes();
    state.likes.retrieveData();

    // toggle likes menu and display all saved likes
    likesView.toggleLikeMenu(state.likes.getLikesNum());
    state.likes.likes.forEach(likesView.displayLike);
});

// event listeners for central recipe field
DOMelements.recipeField.addEventListener('click', event => {
    if (event.target.matches(`.${DOMelementStr.servDecBtn}, .${DOMelementStr.servDecBtn} *`)) {
        // decrease servings button clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateIngCounts(state.recipe);
        }
    } else if (event.target.matches(`.${DOMelementStr.servIncBtn}, .${DOMelementStr.servIncBtn} *`)) {
        // increase servings button clicked
        state.recipe.updateServings('inc');
        recipeView.updateIngCounts(state.recipe);
    } else if (event.target.matches(`.${DOMelementStr.addIngsBtn}, .${DOMelementStr.addIngsBtn} *`)) {
        // add ingredients to shopping list button clicked
        controlList();
    } else if (event.target.matches(`.${DOMelementStr.likeBtn}, .${DOMelementStr.likeBtn} *`)) {
        // like recipe button clicked
        controlLikes();
    }
});
