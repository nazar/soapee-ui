import _ from 'lodash';
import Reflux from 'reflux';

import recipeActions from 'actions/recipe';

import RecipeModel from 'models/recipe';

export default Reflux.createStore( {

    init() {
        this.store = new RecipeModel();
        this.store.on( 'calculated', doTrigger.bind( this ) );

        this.listenTo( recipeActions.setSaveFormFields, setNotesAndDescription.bind( this ) );
        this.listenTo( recipeActions.editRecipeById.completed, loadRecipeIntoCalculator.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    setStoreValue( key, value ) {
        this.store.setRecipeValue( key, value );
        this.store.calculateRecipe();

        doTrigger.call( this );
    },

    getStoreValue( key ) {
        return this.store.getRecipeValue( key );
    },

    sapForNaOh( oil ) {
        return _.round( oil.sap / 1.403, 3 );
    }

} );

//////////////////////
///// Private

function doTrigger() {
    this.trigger( this.store );
}

function setNotesAndDescription( notes, description ) {
    this.store.setRecipeValue( 'notes', notes );
    this.store.setRecipeValue( 'description', description );

    doTrigger.call( this );
}

function loadRecipeIntoCalculator( recipe ) {
    this.store.setRecipe( recipe );
    doTrigger.call( this );
}