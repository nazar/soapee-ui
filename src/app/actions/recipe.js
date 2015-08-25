import Reflux from 'reflux';

import {
    getRecipes,
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,

    getRecipeComments,
    addCommentToRecipe,

    getRecipeJournal,
    getRecipeJournals,
    addRecipeJournal,
    updateRecipeJournal,
    deleteRecipeJournal,
    getRecipeJournalComments,
    addCommentToRecipeJournal
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
    addCommentToRecipe: { asyncResult: true },

    getRecipeJournal: { asyncResult: true },
    getRecipeJournals: { asyncResult: true },
    addRecipeJournal: { asyncResult: true },
    updateRecipeJournal: { asyncResult: true },
    deleteRecipeJournal: { asyncResult: true },

    getRecipeJournalComments: { asyncResult: true },
    addCommentToRecipeJournal: { asyncResult: true }
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

actions.getRecipeJournal.listenAndPromise( getRecipeJournal );
actions.getRecipeJournals.listenAndPromise( getRecipeJournals );
actions.addRecipeJournal.listenAndPromise( addRecipeJournal );
actions.updateRecipeJournal.listenAndPromise( updateRecipeJournal );
actions.deleteRecipeJournal.listenAndPromise( deleteRecipeJournal );

actions.getRecipeJournalComments.listenAndPromise( getRecipeJournalComments );
actions.addCommentToRecipeJournal.listenAndPromise( addCommentToRecipeJournal );