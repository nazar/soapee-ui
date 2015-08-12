import Reflux from 'reflux';
import oilActions from 'actions/oil';

import OilModel from 'models/oil';

export default Reflux.createStore( {

    store: null,

    init() {
        this.listenTo( oilActions.getOilById.completed, gotOil.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

} );

///////////////////
////

function gotOil( oil ) {
    this.store = new OilModel( oil ).getExtendedOil();

    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}