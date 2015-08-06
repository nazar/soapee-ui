import _ from 'lodash';
import Reflux from 'reflux';

import userProfileStore from 'stores/userProfile';
import authStore from 'stores/auth';

import userActions from 'actions/user';

export default Reflux.createStore( {

    store: [],

    init() {
        this.listenTo( userProfileStore, gotUserProfile.bind( this ) );
        this.listenTo( userActions.getFriends.completed, gotFriends.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    iAmNotFriendOfUser() {
        return _.filter( this.store, { id: authStore.userId() } ).length === 0;
    }

} );

///////////////////
////

function gotUserProfile( user ) {
    userActions.getFriends( user );
}

function gotFriends( users ) {
    this.store = users;
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}