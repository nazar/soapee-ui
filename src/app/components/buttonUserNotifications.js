import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import userNotificationsStore from 'stores/userNotifications';

import UserNotifications from 'components/userNotifications';

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
                <UserNotifications
                    notifications={ this.state.notifications }
                    />
            </Popover>
        );
    }

} );