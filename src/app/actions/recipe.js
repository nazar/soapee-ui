import Reflux from 'reflux';

import {createRecipe} from 'resources/recipes';

let actions = Reflux.createActions( {
    createRecipe: { asyncResult: true }
} );

export default actions;

actions.createRecipe.listenAndPromise( createRecipe );