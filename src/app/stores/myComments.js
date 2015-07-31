import Reflux from 'reflux';
import meActions from 'actions/me';

export default Reflux.createStore( {

    store: null,

    init() {
        this.listenTo( meActions.getComments.completed, gotComments.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

} );

///////////////////
////

function gotComments( comments ) {
    this.store = comments;
    doTrigger.call( this );
}


function doTrigger() {
    this.trigger( this.store );
}