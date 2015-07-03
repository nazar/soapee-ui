import _ from 'lodash';
import Reflux from 'reflux';

export default Reflux.createStore( {

    store: {
        oils: [],
        weights: {}
    },

    getInitialState() {
        return this.store;
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
        //accepts numerics only
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