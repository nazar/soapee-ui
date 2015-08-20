import Reflux from 'reflux';

import statusUpdateActions from 'actions/statusUpdate';

export default Reflux.createStore( {

    store: null,

    init() {
        this.listenTo( statusUpdateActions.getStatusUpdate.completed, gotStatusUpdate.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

} );

//////////////////////////
//// Private

function gotStatusUpdate( statusUpdate ) {
    this.store = statusUpdate;
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}