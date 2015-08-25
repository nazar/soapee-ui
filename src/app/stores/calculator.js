import _ from 'lodash';
import Reflux from 'reflux';

import RecipeModel from 'models/recipe';
import recipeActions from 'actions/recipe';

export default Reflux.createStore( {

    init() {
        this.store = new RecipeModel();
        this.store.on( 'calculated', doTrigger.bind( this ) );

        this.listenTo( recipeActions.resetRecipe, reset.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    sapForNaOh( oil ) {   //todo - shouldn't really be in here...
        return _.round( oil.sap / 1.403, 3 );
    }

} );

//////////////////////
///// Private

function reset() {
    this.store.reset();
}

function doTrigger() {
    this.trigger( this.store );
}