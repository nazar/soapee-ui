import _ from 'lodash';
import Reflux from 'reflux';

export default Reflux.createStore( {

    store: {
        oils: [],
        weights: {},

        soapType: 'noah',
        kohPurity: 90,
        uom: 'gram',
        totalWeight: null,
        totalUom: 'gram',
        superFat: 5,
        waterRatio: 38
    },

    getInitialState() {
        return this.store;
    },

    setStoreValue( key, value ) {
        _.set( this.store, key, value );

        doTrigger.call( this );
    },

    getStoreValue( key ) {
        return _.get( this.store, key );
    },

    addOil( oil ) {
        this.store.oils = _.union( this.store.oils, [ oil ] );

        doTrigger.call( this );
    },

    removeOil( oil ) {
        this.store.oils = _.without( this.store.oils, oil );
        delete this.store.weights[ oil.id ];

        doTrigger.call( this );
    },

    getOilWeight( oil ) {
        return this.store.weights[ oil.id ] || '';
    },

    setOilWeight( oil, weight ) {
        //accepts numeric only
        if ( _.isFinite( Number(weight) ) || weight === '.' ) {
            this.store.weights[ oil.id ] = weight;
            doTrigger.call( this );
        }
    }


} );

//////////////////////
///// Private

function doTrigger() {
    this.trigger( this.store );
}