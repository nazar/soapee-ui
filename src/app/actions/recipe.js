import Reflux from 'reflux';

import {
    createRecipe,
    getRecipeById,
    updateRecipe
} from 'resources/recipes';

let actions = Reflux.createActions( {
    //async action
    createRecipe: { asyncResult: true },
    updateRecipe: { asyncResult: true },
    getRecipeById: { asyncResult: true },
    editRecipeById: { asyncResult: true }
} );

export default actions;

actions.createRecipe.listenAndPromise( createRecipe );
actions.updateRecipe.listenAndPromise( updateRecipe );

actions.getRecipeById.listenAndPromise( getRecipeById );
actions.editRecipeById.listenAndPromise( getRecipeById );