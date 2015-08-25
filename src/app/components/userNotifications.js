import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';

import meActions from 'actions/me';
import userNotificationsStore from 'stores/userNotifications';

import UserAvatar from 'components/userAvatar';

export default React.createClass( {

    mixins: [
        Reflux.connect( userNotificationsStore, 'notifications' )
    ],

    render() {
        return (
            <div className="user-notifications">
                <ul className="list-unstyled">
                    { _.map( this.props.notifications, this.renderNotification ) }
                </ul>
            </div>
        );
    },

    renderNotification( notification ) {
        let classNames = cx( 'user-notification', notification.user_notifiable_type, {
            unread: notification.read === false
        } );

        return (
            <li className={ classNames } key={ `notification-${notification.id}` }>
                <a href={ `/users/${notification.userNotifiable.user_id}` }>
                    <UserAvatar
                        user={ notification.userNotifiable.user }
                        />
                </a>
                { this.renderMessageForNotifiable( notification ) }
                { this.renderActionsForNotifiable( notification ) }
            </li>
        );
    },

    renderMessageForNotifiable( notification ) {
        let message;

        if ( notification.user_notifiable_type === 'friendships' ) {
            message = notification.message;
        } else if ( notification.user_notifiable_type === 'comments' ) {
            message = JSON.parse( notification.message );

            if ( message.commentable === 'recipes' ) {
                message = (
                    <span>
                        { notification.userNotifiable.user.name } commented on your <a href={ `/recipes/${message.recipe.id}` }>{ message.recipe.name }</a> recipe
                    </span>
                );
            } else if ( message.commentable === 'status_updates' ) {
                message = (
                    <span>
                        { notification.userNotifiable.user.name } commented on your <a href={ `/recipes/${message.statusUpdate.id}` }>status update</a>
                    </span>
                );
            } else {
                throw new Error( `Comment commentable type ${message.commentable} is not recognised` );
            }
        }

        return (
            <div className="message clearfix">
                { message }
            </div>
        );
    },

    renderActionsForNotifiable( notification ) {
        let actions = [];

        if ( !(notification.read) ) {
            if ( notification.user_notifiable_type === 'friendships' ) {
                if ( notification.type === 1 ) {
                    actions.push( <button className="btn btn-success" onClick={ this.confirmFriend( notification ) }><i className="fa fa-check"> Approve</i></button> );
                }
                actions.push( <button className="btn btn-warning" onClick={ this.dismissNotification( notification ) }><i className="fa fa-times"> Dismiss</i></button> );
            } else if ( notification.user_notifiable_type === 'comments' ) {
                actions.push( <button className="btn btn-warning" onClick={ this.dismissNotification( notification ) }><i className="fa fa-times"> Dismiss</i></button> );
            }

            return (
                <div className="actions btn-toolbar">
                    { actions }
                </div>
            );
        }
    },

    confirmFriend( notification ) {
        return () => {
            meActions.addFriend( notification.userNotifiable.user )
                .then( () => meActions.dismissNotification( notification ) );
        };
    },

    dismissNotification( notification ) {
        return () => {
            meActions.dismissNotification( notification );
        };
    }


} );