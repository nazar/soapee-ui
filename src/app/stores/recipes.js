import _ from 'lodash';
import Reflux from 'reflux';

import recipeActions from 'actions/recipe';

export default Reflux.createStore( {

    store: [],
    count: 0,

    init() {
        this.listenTo( recipeActions.getRecipes, reset.bind( this ) );
        this.listenTo( recipeActions.getRecipes.completed, gotRecipes.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    ///public methods

    totalPages() {
        return _.ceil( this.count / 10 );
    }

} );

//////////////////////////
//// Private

function reset() {
    this.store = [];

    doTrigger.call( this );
}

function gotRecipes( data ) {
    this.store = data.recipes;
    this.count = Number( data.count );

    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}
