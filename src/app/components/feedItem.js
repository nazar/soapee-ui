import moment from 'moment';
import React from 'react';
import { Link } from 'react-router';

import MarkedDisplay from 'components/markedDisplay';
import ImageableThumbnails from 'components/imageableThumbnails';
import UserAvatar from 'components/userAvatar';

export default React.createClass( {

    render() {
        let { feedItem } = this.props;
        let { user } = feedItem.feedable_meta;

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
            recipe_journals: recipeJournals,
            users: () => <span> joined</span>
        }[ this.props.feedItem.feedable_type ];

        return action();


        function statusUpdate() {
            return (
                <span> posted a <Link to="status-update" params={ { id: feedable_meta.target.id } }><strong>status update</strong></Link></span>
            );
        }

        function comment() {
            return (
                <span> commented on
                    <Link to={feedable_meta.target.targetType} params={ { id: feedable_meta.target.id } }>
                        &nbsp;<strong>{feedable_meta.target.name}</strong>
                    </Link>
                </span>
            );
        }

        function recipes() {
            return (
                <span> {feedable_meta.target.actionType}
                    <Link to="recipe" params={ { id: feedable_meta.target.id } }>
                        &nbsp;<strong>{feedable_meta.target.name}</strong>
                    </Link>
                </span>
            );
        }

        function recipeJournals() {
            return (
                <span> added a <strong>Recipe Journal</strong> to
                    <Link to="recipe" params={ { id: feedable_meta.target.id } }>
                        &nbsp;<strong>{feedable_meta.target.name}</strong>
                    </Link>
                </span>
            );
        }

    },

    renderFeedableType() {
        let { feedable_meta } = this.props.feedItem;
        let renderer = {
            status_updates: renderStatusUpdate.bind( this ),
            comments: renderCommentUpdate.bind( this ),
            recipes: renderRecipe.bind( this ),
            recipe_journals: renderRecipeJournals.bind( this ),
            users: () => {}
        }[ this.props.feedItem.feedable_type ];

        return renderer();


        function renderStatusUpdate() {
            return (
                <div className="status-update">
                    <MarkedDisplay
                        content={ feedable_meta.target.update }
                        />

                    <ImageableThumbnails
                        images={ this.props.feedItem.feedable.images }
                        />
                </div>
            );
        }

        function renderCommentUpdate() {
            return (
                <div className="status-comment">
                    <MarkedDisplay
                        content={ feedable_meta.target.comment || '' }
                        />
                </div>
            );
        }

        function renderRecipe() {
            return (
                <div className="status-recipe">
                    <ImageableThumbnails
                        images={ this.props.feedItem.feedable.images }
                        />
                </div>
            );
        }

        function renderRecipeJournals() {
            return (
                <div className="status-recipe-journals">
                    <MarkedDisplay
                        content={ feedable_meta.target.journal }
                        />

                    <ImageableThumbnails
                        images={ this.props.feedItem.feedable.images }
                        />
                </div>
            );
        }

    }


} );