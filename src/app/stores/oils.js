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

    getAllFats() {
        return [
            'capric', 'caprylic', 'docosadienoic', 'docosenoid', 'eicosenoic', 'erucic', 'lauric', 'linoleic', 'linolenic', 'myristic', 'oleic', 'palmitic', 'ricinoleic', 'stearic'
        ];
    },

    sapForNaOh( oil ) {
        return (oil.sap / 1.403).toFixed(3);
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