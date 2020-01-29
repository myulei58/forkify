import { DOMelements, DOMelementStr } from './base';

// display single ingredient item in shopping list
export const displayItem = item => {
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value" min="0">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    DOMelements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

// delete ingredient from shopping list
export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};

// clear all ingredients from shopping list
export const clearList = () => {
    DOMelements.shoppingList.innerHTML = '';
};

// display clear list button
export const showClearBtn = () => {
    DOMelements.clearBtn.style = 'visibility: visible';
};

// hide clear list button
export const hideClearBtn = () => {
    DOMelements.clearBtn.style = 'visibility: hidden';
};
