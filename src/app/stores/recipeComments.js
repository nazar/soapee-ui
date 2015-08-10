import Reflux from 'reflux';

import recipeActions from 'actions/recipe';

export default Reflux.createStore( {

    recipe: null,
    comments: [],

    init() {
        this.listenTo( recipeActions.getRecipeComments.completed, gotComments.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    count() {
        return this.comments.length;
    },

    addComment( comment ) {
        return recipeActions.addCommentToRecipe( comment, this.recipe )
            .then( addToComments.bind( this ) );
    }

} );

//////////////////////////
//// Private

function gotComments( comments ) {
    this.comments = comments;
    doTrigger.call( this );
}

function addToComments( comment ) {
    this.comments.unshift( comment );
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.comments );
}