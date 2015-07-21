import Reflux from 'reflux';

import recipeActions from 'actions/recipe';

export default Reflux.createStore( {

    store: null,

    init() {
        this.listenTo( recipeActions.getRecipeById.completed, gotRecipe.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

    ///public methods

} );

//////////////////////////
//// Private

function gotRecipe( recipe ) {
    this.store = recipe;

    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}