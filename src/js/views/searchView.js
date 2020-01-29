import { DOMelements, DOMelementStr } from './base';

// get query string from input field
export const getInput = () => DOMelements.searchInput.value;

// clears input field
export const clearInput = () => {
    DOMelements.searchInput.value = '';
};

// clears search results list and page buttons
export const clearResults = () => {
    DOMelements.searchResultList.innerHTML = '';
    DOMelements.searchResultPages.innerHTML = '';
};

// highlights recipe in search results list
export const highlightSelected = id => {
    // clear all highlights in search results
    const resultsArr = Array.from(document.querySelectorAll(`.${DOMelementStr.resultsLink}`));
    resultsArr.forEach(item => {
        item.classList.remove(`${DOMelementStr.resultsLinkActive}`);
    });
    // if id is in current page of search results, highlight it
    const idsArr = resultsArr.map(item => item.getAttribute('href').replace('#', ''));
    if (idsArr.includes(id)) {
        document.querySelector(`.${DOMelementStr.resultsLink}[href="#${id}"]`).classList.add(`${DOMelementStr.resultsLinkActive}`);
    }
};

// helper function to limit title length for recipe in search results
export const limitRecipeTitle = (title, limit = 19) => {
    // if title length is over limit, add words one at a time until limit
    if (title.length > limit) {
        const newTitle = [];
        title.split(' ').reduce((acc, current) => {
            if (acc + current.length + 1 <= limit) {
                newTitle.push(current);
            }
            return acc + current.length + 1;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

// add single entry for recipe in search results
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    DOMelements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

// produce single page button based on type ('prev' or 'next')
const createPageButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'? page-1 : page+1}>
        <span>Page ${type==='prev'? page-1 : page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

// add page buttons based on current results page displayed
const renderPageButtons = (page, totalResNum, resPerPage) => {
    const maxPage = Math.ceil(totalResNum / resPerPage);

    let buttons;
    if (page === 1 && maxPage > 1) {
        buttons = createPageButton(page, 'next');
    } else if (page < maxPage) {
        buttons = `${createPageButton(page, 'prev')}${createPageButton(page, 'next')}`;
    } else if (page === maxPage && maxPage > 1) {
        buttons = createPageButton(page, 'prev');
    }

    DOMelements.searchResultPages.insertAdjacentHTML('afterbegin', buttons);
};

// display single page of results for current search and add appropriate page buttons
export const displayResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    renderPageButtons(page, recipes.length, resPerPage);
};
