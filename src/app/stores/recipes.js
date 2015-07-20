import Reflux from 'reflux';

import { getRecipes } from 'resources/recipes';

export default Reflux.createStore( {

    store: {},

    init() {
        this.loadRecipes();
    },

    getInitialState() {
        return this.store;
    },

    ///public methods

    loadRecipes() {
        function assignToStore( data ) {
            this.store = data;
        }
        function doTrigger() {
            this.trigger( this.store );
        }

        getRecipes()
            .then( assignToStore.bind( this ) )
            .then( doTrigger.bind( this ) );
    }


} );

//////////////////////////
//// Private