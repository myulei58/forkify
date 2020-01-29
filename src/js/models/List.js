import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    // add ingredient to shopping list with unique ID
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }

    // delete ingredient from shopping list
    deleteItem(id) {
        const deletedIndex = this.items.findIndex(item => item.id === id);
        this.items.splice(deletedIndex, 1);
    }

    // update count for ingredient in shopping list
    updateCount(id, newCount) {
        this.items.find(item => item.id === id).count = newCount;
    }

    // clear shopping list
    clearList() {
        this.items = [];
    }
}
