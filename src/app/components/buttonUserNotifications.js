import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import meActions from 'actions/me';
import userNotificationsStore from 'stores/userNotifications';

import UserAvatar from 'components/userAvatar';

export default React.createClass( {

    mixins: [
        Reflux.connect( userNotificationsStore, 'notifications' )
    ],

    render() {
        let unread = userNotificationsStore.sizeUnread();

        if ( this.state.notifications.length ) {
            return (
                <OverlayTrigger trigger='click'
                                rootClose
                                placement='bottom'
                                overlay={ this.renderNotifications() }
                    >
                    <button type="button"
                            className="button-user-notifications btn btn-profile navbar-btn"
                        >
                        <i className={ cx( 'fa fa-bell', { active: unread } ) }>{ this.renderBadge( unread ) }</i>
                    </button>
                </OverlayTrigger>
            );
        } else {
            return <span></span>;
        }
    },

    renderBadge( unread ) {
        if ( unread ) {
            return <span className="badge">{ unread }</span>;
        }
    },

    renderNotifications() {
        return (
            <Popover>
                <ul className="list-unstyled">
                    { _.map( this.state.notifications, this.renderNotification, this ) }
                </ul>
            </Popover>
        )
    },

    renderNotification( notification ) {
        let classNames = cx( 'button-user-notifications-notification', {
            unread: notification.read === false
        } );

        return (
            <li className={ classNames } key={ `notification-${notification.id}` }>
                <a href={ `/users/${notification.userNotifiable.user_id}` }>
                    <UserAvatar
                        user={ notification.userNotifiable.user }
                        />
                </a>
                <div className="message">
                    { notification.message }
                </div>
                { notification.read === false &&
                    <div className="actions btn-toolbar">
                        { notification.type === 1 && <button className="btn btn-success" onClick={ this.confirmFriend( notification ) }><i className="fa fa-check"> Approve</i></button> }
                        <button className="btn btn-warning" onClick={ this.dismissNotification( notification ) }><i className="fa fa-times"> Dismiss</i></button>
                    </div>
                }
            </li>
        );
    },

    confirmFriend( notification ) {
        return () => {
            meActions.addFriend( notification.userNotifiable.user )
                .then( () => meActions.dismissNotification( notification ) );
        }
    },

    dismissNotification( notification ) {
        return () => {
            meActions.dismissNotification( notification )
        }
    }

} );