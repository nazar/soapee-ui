import _ from 'lodash';
import Reflux from 'reflux';

import authActions from 'actions/auth';
import { getCurrentUser } from 'resources/auths';

export default Reflux.createStore( {

    store: {},

    init() {
        this.listenTo( authActions.signupOrLoginThirdParty.completed, authenticated.bind( this ) );
        this.listenTo( authActions.logout.completed, loggedOut.bind( this ) );

        getCurrentUser()
            .then( authenticated.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    ///public methods

    isAuthenticated() {
        return _.keys( this.store ).length > 0;
    },

    avatarUrl() {
        return this.store.imageUrl;
    },

    userName() {
        return this.store.name;
    }


} );

//////////////////////////
//// Private

function authenticated( authUser ) {
    this.store = authUser;

    doTrigger.call( this );
}

function loggedOut() {
    this.store = {};

    doTrigger.call( this );
}


function doTrigger() {
    this.trigger( this.store );
}