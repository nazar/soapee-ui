import Reflux from 'reflux';

import {
    createRecipe,
    getRecipeById,
    updateRecipe,

    getRecipeComments,
    addCommentToRecipe
} from 'resources/recipes';

let actions = Reflux.createActions( {
    //async action
    createRecipe: { asyncResult: true },
    updateRecipe: { asyncResult: true },
    getRecipeById: { asyncResult: true },
    editRecipeById: { asyncResult: true },

    getRecipeComments: { asyncResult: true },
    addCommentToRecipe: { asyncResult: true }
} );

export default actions;

actions.createRecipe.listenAndPromise( createRecipe );
actions.updateRecipe.listenAndPromise( updateRecipe );

actions.getRecipeById.listenAndPromise( getRecipeById );
actions.editRecipeById.listenAndPromise( getRecipeById );

actions.getRecipeComments.listenAndPromise( getRecipeComments );
actions.addCommentToRecipe.listenAndPromise( addCommentToRecipe );