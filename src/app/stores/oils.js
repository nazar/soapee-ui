import _ from 'lodash';
import Reflux from 'reflux';

import { getOils } from 'resources/oils';
import Oil from 'models/oil';

export default Reflux.createStore( {

    store: [],

    init() {
        this.loadOils();
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
                longevity: oil.properties.longevity,
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
                stearic: oil.breakdown.stearic || 0,

                saturated: oil.saturation.saturated,
                monoSaturated: oil.saturation.monoSaturated,
                polySaturated: oil.saturation.polySaturated
            };
        } );
    },

    oilPropertyGroupings() {
        return {
            'fats-common': [ 'name', 'sap', 'lauric', 'linoleic', 'linolenic', 'myristic', 'oleic', 'palmitic', 'ricinoleic', 'stearic' ],
            'fats-all':    [ 'name', 'sap', 'capric', 'caprylic', 'docosadienoic', 'docosenoid', 'eicosenoic', 'erucic', 'lauric', 'linoleic', 'linolenic', 'myristic', 'oleic', 'palmitic', 'ricinoleic', 'stearic' ],
            properties:    [ 'name', 'sap', 'bubbly', 'cleansing', 'condition', 'hardness', 'longevity', 'stability' ],
            saturation:    [ 'name', 'sap', 'saturated', 'monoSaturated', 'polySaturated' ]
        };

    },

    loadOils() {
        function assignToStore( data ) {
            this.store = _.map( data, oil => (new Oil( oil )).getExtendedOil() );
        }

        function doTrigger() {
            this.trigger( this.store );
        }

        getOils()
            .then( assignToStore.bind( this ) )
            .then( doTrigger.bind( this ) );
    }

} );