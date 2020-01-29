export default class Likes {
    constructor() {
        this.likes = [];
    }

    // add recipe as like object to likes list
    addLike(id, title, publisher, img) {
        const like = {
            id,
            title,
            publisher,
            img
        };
        this.likes.push(like);

        // persist data in local storage
        this.persistData();

        return like;
    }

    // delete recipe from likes list
    deleteLike(id) {
        const deletedIndex = this.likes.findIndex(like => like.id === id);
        this.likes.splice(deletedIndex, 1);

        // persist data in local storage
        this.persistData();
    }

    // returns whether recipe is in likes list
    isLiked(id) {
        return this.likes.findIndex(like => like.id === id) !== -1;
    }

    getLikesNum() {
        return this.likes.length;
    }

    // save likes list to local storage
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // retrieve likes list from local storage and save to model
    retrieveData() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }
}
