import _ from 'lodash';
import Reflux from 'reflux';

import recipeActions from 'actions/recipe';

import RecipeModel from 'models/recipe';
import OilModel from 'models/oil';

export default Reflux.createStore( {

    store: null,

    init() {
        this.store = new RecipeModel();

        this.store.on( 'calculated', doTrigger.bind( this ) );

        this.listenTo( recipeActions.getRecipeById.completed, gotRecipe.bind( this ) );
        this.listenTo( recipeActions.getRecipeById.failed, setError.bind( this ) );

    },

    getInitialState() {
        return this.store;
    },

    ///public methods

    calculate() {
        this.store.calculateRecipe();
    }

} );

//////////////////////////
//// Private

function gotRecipe( recipe ) {
    //a recipe has also oils, which needs to be extended
    recipe.oils = _.map( recipe.oils, oil => ( new OilModel( oil ).getExtendedOil() ) );

    this.store.setRecipe( recipe );

    doTrigger.call( this );
}

function setError( error ) {
    this.trigger( {
        error: error.responseJSON
    } );
}

function doTrigger() {
    this.trigger( this.store );
}