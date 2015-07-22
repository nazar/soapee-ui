import Reflux from 'reflux';

import { createRecipe, getRecipeById } from 'resources/recipes';

let actions = Reflux.createActions( {
    //ui actions
    setSaveFormFields: {},

    //async action
    createRecipe: { asyncResult: true },
    getRecipeById: { asyncResult: true },
    editRecipeById: { asyncResult: true }
} );

export default actions;

actions.createRecipe.listenAndPromise( createRecipe );
actions.getRecipeById.listenAndPromise( getRecipeById );
actions.editRecipeById.listenAndPromise( getRecipeById );