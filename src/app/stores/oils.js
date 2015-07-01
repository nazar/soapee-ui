import Reflux from 'reflux';

import {getOils} from 'resources/oils';

export default Reflux.createStore( {

    store: [],

    init() {
        this.loadOils();
//        this.listenTo( authActions.logout, logout.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    loadOils() {
        function assignToStore( data ) {
            this.store = data;
        }
        function trigger() {
            this.trigger( this.store );
        }

        getOils()
            .then( assignToStore.bind( this ) )
            .then( trigger.bind( this ) );
    }

} );