import _ from 'lodash';
import Reflux from 'reflux';

import feedActions from 'actions/feed';

export default Reflux.createStore( {

    store: [],
    count: 0,

    init() {
        this.listenTo( feedActions.getFeed, reset.bind( this ) );
        this.listenTo( feedActions.getFeed.completed, gotFeed.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    totalPages() {
        return _.ceil( this.count / 15 );
    },

    pagerVisible() {
        return this.count > 15;
    }

} );

//////////////////////////
//// Private

function reset() {
    this.store = [];
    doTrigger.call( this );
}

function gotFeed( feed ) {
    this.store = feed.feed;
    this.count = Number( feed.count );

    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}