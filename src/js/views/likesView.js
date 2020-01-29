import { DOMelements, DOMelementStr } from './base';
import { limitRecipeTitle } from './searchView';

// toggle appearance of like button in recipe field based on whether recipe is liked
export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector(`.${DOMelementStr.likeBtn} use`).setAttribute('href', `img/icons.svg#${iconString}`);
};

// toggle like menu visibility based on whether there are any liked recipes
export const toggleLikeMenu = numLikes => {
    DOMelements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

// display single recipe in likes list
export const displayLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.publisher}</p>
                </div>
            </a>
        </li>
    `;
    DOMelements.likesList.insertAdjacentHTML('beforeend', markup);
};

// delete recipe from likes list
export const deleteLike = id => {
    const like = document.querySelector(`.${DOMelementStr.likeLink}[href="#${id}"]`).parentElement;
    if (like) like.parentElement.removeChild(like);
};
