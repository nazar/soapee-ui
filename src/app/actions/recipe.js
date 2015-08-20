import Reflux from 'reflux';

import {
    getRecipes,
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,

    getRecipeComments,
    addCommentToRecipe
} from 'resources/recipes';

let actions = Reflux.createActions( {
    //ui actions
    resetRecipe: {},

    //async action
    getRecipes: { asyncResult: true },
    createRecipe: { asyncResult: true },
    updateRecipe: { asyncResult: true },
    deleteRecipe: { asyncResult: true },
    getRecipeById: { asyncResult: true },
    editRecipeById: { asyncResult: true },

    getRecipeComments: { asyncResult: true },
    addCommentToRecipe: { asyncResult: true }
} );

export default actions;

actions.getRecipes.listenAndPromise( getRecipes );
actions.createRecipe.listenAndPromise( createRecipe );
actions.updateRecipe.listenAndPromise( updateRecipe );
actions.deleteRecipe.listenAndPromise( deleteRecipe );

actions.getRecipeById.listenAndPromise( getRecipeById );
actions.editRecipeById.listenAndPromise( getRecipeById );

actions.getRecipeComments.listenAndPromise( getRecipeComments );
actions.addCommentToRecipe.listenAndPromise( addCommentToRecipe );