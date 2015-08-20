import Reflux from 'reflux';

import statusUpdateStore from 'stores/statusUpdate';
import statusUpdateActions from 'actions/statusUpdate';

export default Reflux.createStore( {

    statusUpdate: null,
    store: [],

    init() {
        this.listenTo( statusUpdateStore, gotStatusUpdate.bind( this ) );
        this.listenTo( statusUpdateActions.getStatusUpdateComments.completed, gotComments.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    count() {
        return this.store.length;
    },

    addComment( comment ) {
        return statusUpdateActions.addComment( comment, this.statusUpdate )
            .then( addToComments.bind( this ) );
    }

} );

//////////////////////////
//// Private

function gotStatusUpdate( statusUpdate ) {
    this.statusUpdate = statusUpdate;
}

function gotComments( comments ) {
    this.store = comments;
    doTrigger.call( this );
}

function addToComments( comment ) {
    this.store.unshift( comment );
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}