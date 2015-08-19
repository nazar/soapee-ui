import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import feedActions from 'actions/feed';
import feedStore from 'stores/feed';

import FeedItem from 'components/feedItem';


export default React.createClass( {

    statics: {
        willTransitionTo: () => {
            feedActions.getFeed();
        }
    },

    mixins: [
        Reflux.connect( feedStore, 'feed' )
    ],

    render() {
        return (
            <div id="feed">
                { _.map( this.state.feed, this.renderFeedItem ) }
            </div>
        );
    },

    renderFeedItem( feedItem ) {
        return (
            <FeedItem
                feedItem={feedItem}
                />
        );
    }
} );