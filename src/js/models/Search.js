import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // performs axios API call to get list of recipes based on this.query and save to this.recipes
    async getResults() {
        try {
            const queryResults = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.recipes = queryResults.data.recipes;
        } catch(error) {
            console.log(error);
        }
    }
}
