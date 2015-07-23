import Reflux from 'reflux';
import oilActions from 'actions/oil';

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
    this.store = oil;

    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}