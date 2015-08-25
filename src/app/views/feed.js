import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import Pager from 'react-pager';

import feedActions from 'actions/feed';
import feedStore from 'stores/feed';

import FeedItem from 'components/feedItem';
import Spinner from 'components/spinner';


export default React.createClass( {

    statics: {
        willTransitionTo: () => {
            feedActions.getFeed();
        }
    },

    getInitialState() {
        return {
            activePage: 0
        };
    },

    mixins: [
        Reflux.connect( feedStore, 'feed' )
    ],

    render() {
        document.title = 'Soapee - News Feed';

        return (
            <div id="feed">
                { this.renderLoading() }
                { this.renderNewsFeed() }
            </div>
        );
    },

    renderLoading() {
        if ( !(this.state.feed.length) ) {
            return <Spinner />;
        }
    },

    renderNewsFeed() {
        if ( this.state.feed.length ) {
            return (
                <div>
                    { _.map( this.state.feed, this.renderFeedItem ) }
                    { this.paginator() }
                </div>
            );
        }
    },

    renderFeedItem( feedItem ) {
        return (
            <FeedItem
                feedItem={feedItem}
                />
        );
    },

    paginator() {
        if ( feedStore.pagerVisible() ) {
            return (
                <Pager
                    total={feedStore.totalPages()}
                    current={this.state.activePage}
                    visiblePages={5}
                    onPageChanged={this.onPageChanged}
                    />
            );
        }
    },

    onPageChanged( page ) {
        this.setState( {
            activePage: page
        } );
        feedActions.getFeed( {
            page
        } );
    }

} );