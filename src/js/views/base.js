// DOM elements already present on load
export const DOMelements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list'),
    searchResultPages: document.querySelector('.results__pages'),

    recipeField: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),

    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),

    snackbar: document.getElementById('snackbar'),

    queryList: document.getElementById('querylist'),
    queriesBtn: document.querySelector('.btn-query'),

    clearBtn: document.querySelector('.clear__btn')
};

// class strings for dynamically generated DOM elements
export const DOMelementStr = {
    loader: 'loader',

    pageBtns: 'btn-inline',
    resultsLink: 'results__link',
    resultsLinkActive: 'results__link--active',

    servings: 'recipe__info-data--people',
    servDecBtn: 'btn-decrease',
    servIncBtn: 'btn-increase',
    ingCount: 'recipe__count',

    addIngsBtn: 'recipe__btn--add',
    shopItem: 'shopping__item',
    shopItemCount: 'shopping__count-value',
    shopItemDelete: 'shopping__delete',

    likeBtn: 'recipe__love',
    likeLink: 'likes__link'
};

// renders spinning loader within appropriate element in UI
export const renderLoader = parent => {
    const loader = `
        <div class="${DOMelementStr.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

// clears spinning loader from UI
export const clearLoader = () => {
    const loader = document.querySelector(`.${DOMelementStr.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

// renders snackbar to display error messages
export const displaySbMsg = msg => {
    DOMelements.snackbar.className = 'show';
    DOMelements.snackbar.textContent = msg;

    // After 5 seconds, remove the show class
    setTimeout(() => {
        DOMelements.snackbar.className = '';
    }, 3500);
};
