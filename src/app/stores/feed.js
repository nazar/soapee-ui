import Reflux from 'reflux';

import feedActions from 'actions/feed';

export default Reflux.createStore( {

    store: [],

    init() {
        this.listenTo( feedActions.getFeed.completed, gotFeed.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    unread() {

    }


} );

//////////////////////////
//// Private

function gotFeed( feed ) {
    this.store = feed;
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}