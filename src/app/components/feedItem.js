import moment from 'moment';
import React from 'react';
import { Link } from 'react-router';

import MarkedDisplay from 'components/markedDisplay';
import UserAvatar from 'components/userAvatar';

export default React.createClass( {

    render() {
        let { feedItem } = this.props;
        let { user } = feedItem.feedable_meta;

        console.log('feedItem', feedItem );
        return (
            <div className="feed-item media">
                <div className="media-left">
                    <UserAvatar
                        user={ user }
                        />
                </div>

                <div className="media-body">
                    <div className="about">
                        <span className="user">
                            <Link to="userProfile" params={ { id: user.id } }>{ user.name }</Link>
                        </span>

                        { this.renderActionDescription() }

                        <span className="time"
                              title={ moment( feedItem.created_at ).format( 'LLLL' ) }
                            >
                            { moment( feedItem.created_at ).fromNow() }
                        </span>
                    </div>

                    { this.renderFeedableType() }
                </div>
            </div>
        );
    },

    renderActionDescription() {
        let { feedable_meta } = this.props.feedItem;

        let action = {
            status_updates: statusUpdate,
            comments: comment,
            recipes: recipes,
            users: () => <span> joined </span>
        }[ this.props.feedItem.feedable_type ];

        return action();


        function statusUpdate() {
            return (
                <span> posted a <strong>status update</strong></span>
            )
        }

        function comment() {
            return (
                <span> commented on
                    <Link to={feedable_meta.target.targetType} params={ { id: feedable_meta.target.id } }>
                        &nbsp;<strong>{feedable_meta.target.name}</strong>
                    </Link>
                </span>
            )
        }

        function recipes() {
            return (
                <span> {feedable_meta.target.actionType}
                    <Link to="recipes" params={ { id: feedable_meta.target.id } }>
                        &nbsp;<strong>{feedable_meta.target.name}</strong>
                    </Link>
                </span>
            )
        }
    },

    renderFeedableType() {
        let { feedable_meta } = this.props.feedItem;
        let renderer = {
            status_updates: renderStatusUpdate,
            comments: renderCommentUpdate,
            recipes: () => {},
            users: () => {}
        }[ this.props.feedItem.feedable_type ];

        return renderer();


        function renderStatusUpdate() {
            return (
                <div className="status-update">
                    <MarkedDisplay
                        content={ feedable_meta.target.update }
                        />
                </div>
            )
        }

        function renderCommentUpdate() {
            return (
                <div className="status-comment">
                    <MarkedDisplay
                        content={ feedable_meta.target.comment || '' }
                        />
                </div>
            )
        }

    }


} );