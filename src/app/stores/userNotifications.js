import _ from 'lodash';
import Reflux from 'reflux';

import authStore from 'stores/auth';
import meActions from 'actions/me';

export default Reflux.createStore( {

    store: [],

    init() {
        this.listenTo( authStore, authenticated.bind( this ) );
        this.listenTo( meActions.getMyUserNotifications.completed, gotNotifications.bind( this ) );
        this.listenTo( meActions.dismissNotification.completed, getNotifications.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    size() {
        return (this.store || []).length;
    },

    sizeUnread() {
        return _.filter( this.store, { read: false } ).length;
    }


} );

//////////////////////////
//// Private

function authenticated( user ) {
    if ( user && user.id ) {
        getNotifications();
    }
}

function getNotifications() {
    meActions.getMyUserNotifications();
}

function gotNotifications( notifications ) {
    this.store = notifications;
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}