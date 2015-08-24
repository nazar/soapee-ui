import Reflux from 'reflux';

import meActions from 'actions/me';
import statusUpdateActions from 'actions/statusUpdate';

export default Reflux.createStore( {

    store: [],

    init() {
        this.listenTo( meActions.getMyStatusUpdates.completed, gotStatusUpdates.bind( this ) );
        this.listenTo( statusUpdateActions.addStatusUpdate.completed, gotNewStatusUpdate.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

} );

//////////////////////////
//// Private

function gotStatusUpdates( statusUpdates ) {
    this.store = statusUpdates;
    doTrigger.call( this );
}

function gotNewStatusUpdate( statusUpdate ) {
    this.store.unshift( statusUpdate );
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}