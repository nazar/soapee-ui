import Reflux from 'reflux';

import authStore from 'stores/auth';
import meActions from 'actions/me';

export default Reflux.createStore( {

    store: [],

    init() {
        this.listenTo( authStore, authenticated.bind( this ) );
        this.listenTo( meActions.getMyFriends.completed, gotMyFriends.bind( this ) );
        this.listenTo( meActions.addFriend.completed, getFriends.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

} );

//////////////////////////
//// Private

function authenticated( user ) {
    if ( user && user.id ) {
        getFriends();
    }
}

function getFriends() {
    meActions.getMyFriends();
}

function gotMyFriends( friends ) {
    this.store = friends;
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}