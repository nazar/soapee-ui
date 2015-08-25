import Reflux from 'reflux';

import recipeActions from 'actions/recipe';
import recipeStore from 'stores/recipe';

export default Reflux.createStore( {

    recipe: null,
    store: null,

    init() {
        this.listenTo( recipeStore, gotRecipe.bind( this ) );
        this.listenTo( recipeActions.getRecipeJournal, this.reset );
        this.listenTo( recipeActions.getRecipeJournal.completed, gotJournal.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    reset() {
        this.store = null;
        doTrigger.call( this );
    }

} );

//////////////////////////
//// Private

function gotRecipe( recipeStore ) {
    this.recipe = recipeStore.recipe;
}

function gotJournal( journal ) {
    this.store = journal;
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}