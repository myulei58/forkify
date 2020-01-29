import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    // performs axios API call to get recipe details based on this.id
    async getRecipe() {
        try {
            const recipeData = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = recipeData.data.recipe.title;
            this.publisher = recipeData.data.recipe.publisher;
            this.img = recipeData.data.recipe.image_url;
            this.url = recipeData.data.recipe.source_url;
            this.ingredients = recipeData.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
        }
    }

    calcTime() {
        // assuming 15 min need per 3 ingredients
        this.time = Math.ceil(this.ingredients.length / 3) * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    // transforms raw ingredients array strings to ingredient objects with count, unit, and ingredient
    parseIngredients() {
        // units standardization
        const unitsLong = ['cups', 'tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'ounces', 'ounce', 'pounds', 'jar of', 'jars', 'package of', 'packages'];
        const unitsShort = ['cup', 'tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'pound', 'jar', 'jar', 'package', 'package'];
        const units = [...unitsShort, 'kg', 'g', 'cans', 'can', 'cloves'];

        const newIngredients = this.ingredients.map(item => {
            let ingredient = item.toLowerCase();

            // remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // uniform units
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // parse ingredients into count, unit, and ingredient
            const ingAsArr = ingredient.split(' ');
            const unitIndex = ingAsArr.findIndex(word => units.includes(word));

            let ingObj;
            if (unitIndex > -1) {
                // there is a unit
                const countAsArr = ingAsArr.slice(0, unitIndex);

                // parse count to single number
                let count;
                if (countAsArr.length === 1) {
                    count = eval(ingAsArr[0].replace('-', '+'));
                } else {
                    count = eval(countAsArr.join('+'));
                }

                ingObj = {
                    count,
                    unit: ingAsArr[unitIndex],
                    ingredient: ingAsArr.slice(unitIndex+1).join(' ')
                };
            } else if (parseInt(ingAsArr[0])) {
                // no unit, and 1st element is number
                ingObj = {
                    count: parseInt(ingAsArr[0]),
                    unit: '',
                    ingredient: ingAsArr.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                // no unit and no number
                ingObj = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return ingObj;
        });
        this.ingredients = newIngredients;
    }

    // update this.servings and count property of all ingredient objects
    updateServings(type) {
        // servings
        const newServings = type === 'inc' ? this.servings+1 : this.servings-1;

        // ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });
        
        this.servings = newServings;
    }
}
