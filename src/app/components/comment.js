import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router';

import MarkedDisplay from 'components/markedDisplay';
import UserAvatar from 'components/userAvatar';

export default React.createClass( {

    render() {
        let comment = this.props.comment;

        return (
            <div className="comment media">
                <div className="media-left">
                    <UserAvatar
                        user={ comment.user }
                        />
                </div>
                <div className="media-body">
                    <div className="about">
                        <span className="user">
                            <Link to="userProfile" params={ { id: comment.user_id } }>{ comment.user.name }</Link>
                        </span>
                        <span className="time"
                              title={ moment( comment.created_at ).format( 'LLLL' ) }
                            >
                            { moment( comment.created_at ).fromNow() }
                        </span>
                        { this.renderExtraLinks() }
                    </div>
                    <MarkedDisplay
                        content={ comment.comment }
                        />
                </div>
            </div>
        );
    },

    renderExtraLinks() {
        function renderLink( link ) {
            return (
                <span className="link">{ link }</span>
            );
        }

        return _.map( this.props.links, renderLink, this );
    }


} );