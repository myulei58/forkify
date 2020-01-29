# ![logo](/logo.png) Forkify - Recipe Searching and Saving App

Explore over 1,000,000 recipes! Forkify allows users to search for popular dishes or common ingredients, returning a wide variety of recipes based on the query. Users can then check each recipe in detail, get a list of ingredients, save the recipe to a local favorites list, and more!

This web app is the final project from *The Complete JavaScript Course* by Jonas Schmedtmann. It uses modern ES6+ JavaScript and a MVC design pattern. Data is retrieved using the Forkify API, module bundling is done by Webpack, and Babel is used for code conversion for better browser support.


## Features

- Recipe searching (with list of possible queries)
- Detailed recipe view with list of ingredients
- Select desired serving size for each recipe, which automatically adjust ingredients quantity
- Add ingredients for any recipe(s) to modifiable personal shopping list
- Save any recipe into 'Likes' list, which is saved locally between visits
- Check detailed cooking instruction from original source


## Screenshot

![screenshot](/screenshot.png)


## Installation
### Dependencies
Download npm (or Node.js with packaged npm) and install dependencies using:
```
$ npm install
```

### Building
Run Webpack scripts to compile files in either development or production mode. <br /><br />
**Production Mode:**
```
$ npm run build
```

**Development Mode:**
```
$ npm run dev
```

**Development using Webpack-dev-server:**
```
$ npm run start
```

## Built With
- Forkify API (https://forkify-api.herokuapp.com/)
- npm - dependency management
- Webpack - module bundling
- Babel - ES6+ to ES5 conversion
- Axios - HTTP client
- Other functional libraries


## Acknowledgements
- Jonas Schmedtmann, for creating base HTML and CSS files which were modified upon
