import _ from 'lodash';
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

    getOilById( oilId ) {
        return _.find( this.store, { id: oilId } );
    },

    getFlatOilProperties() {
        return _.map( this.store, oil => {
            return {
                id: oil.id,
                name: oil.name,
                sap: oil.sap,
                iodine: oil.iodione,
                ins: oil.ins,

                bubbly: oil.properties.bubbly,
                cleansing: oil.properties.cleansing,
                condition: oil.properties.condition,
                hardness: oil.properties.hardness,
                stability: oil.properties.stable,

                capric: oil.breakdown.capric || 0,
                caprylic: oil.breakdown.caprylic || 0,
                docosadienoic: oil.breakdown.docosadienoic || 0,
                docosenoid: oil.breakdown.docosenoid || 0,
                eicosenoic: oil.breakdown.eicosenoic || 0,
                erucic: oil.breakdown.erucic || 0,
                lauric: oil.breakdown.lauric || 0,
                linoleic: oil.breakdown.linoleic || 0,
                linolenic: oil.breakdown.linolenic || 0,
                myristic: oil.breakdown.myristic || 0,
                oleic: oil.breakdown.oleic || 0,
                palmitic: oil.breakdown.palmitic || 0,
                ricinoleic: oil.breakdown.ricinoleic || 0,
                stearic: oil.breakdown.stearic || 0
            };
        } );
    },

    oilPropertyGroupings() {
        return {
            'fats-common': [ 'name', 'sap', 'lauric', 'linoleic', 'linolenic', 'myristic', 'oleic', 'palmitic', 'ricinoleic', 'stearic'  ],
            'fats-all':    [ 'name', 'sap', 'capric', 'caprylic', 'docosadienoic', 'docosenoid', 'eicosenoic', 'erucic', 'lauric', 'linoleic', 'linolenic', 'myristic', 'oleic', 'palmitic', 'ricinoleic', 'stearic' ],
            properties:    [ 'name', 'sap', 'bubbly', 'cleansing', 'condition', 'hardness', 'stability' ]
        };

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