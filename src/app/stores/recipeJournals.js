import Reflux from 'reflux';

import recipeActions from 'actions/recipe';
import recipeStore from 'stores/recipe';

export default Reflux.createStore( {

    recipe: null,
    store: [],
    count: 0,

    init() {
        this.listenTo( recipeStore, gotRecipe.bind( this ) );
        this.listenTo( recipeActions.getRecipeJournals.completed, gotJournals.bind( this ) );
        this.listenTo( recipeActions.addRecipeJournal.completed, addToStore.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

} );

//////////////////////////
//// Private

function gotRecipe( recipeStore ) {
    this.recipe = recipeStore.recipe;
}

function gotJournals( journal ) {
    this.count = journal.count;
    this.store = journal.journals;

    doTrigger.call( this );
}

function addToStore( journal ) {
    this.count = Number(this.count) + 1;
    this.store.unshift( journal );

    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}