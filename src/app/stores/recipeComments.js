import _ from 'lodash';
import Reflux from 'reflux';

import recipeStore from 'stores/recipe';
import recipeActions from 'actions/recipe';

export default Reflux.createStore( {

    recipe: null,
    comments: [],

    init() {
        this.listenTo( recipeStore, gotRecipe.bind( this ) );
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

function gotRecipe( recipeStore ) {
    let recipe = recipeStore.recipe;

    if ( _.get( this.recipe, 'id' ) !== recipe.id ) {
        this.recipe = recipe;
        recipeActions.getRecipeComments( this.recipe );
    }
}

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