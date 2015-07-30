import _ from 'lodash';
import React from 'react';

import AddComment from 'components/addComment';
import MarkedDisplay from 'components/markedDisplay';
import UserAvatar from 'components/userAvatar';
import moment from 'moment';

export default React.createClass( {

    componentDidMount: function () {
        this.unsubscribe = this.props.store.listen( this.onComments );
    },

    componentWillUnmount: function () {
        this.unsubscribe();
    },

    getInitialState() {
        return {
            comments: null
        };
    },

    render() {
        return (
            <div className="commentable">
                <AddComment
                    onNewComment={ this.addComment }
                    />
                { _.map( this.state.comments, this.renderComment, this ) }
            </div>
        );
    },

    renderComment( comment ) {
        return (
            <div className="media animate zoomIn" key={ `comment-${ comment.id }` }>
                <div className="media-left">
                    <UserAvatar
                        user={ comment.user }
                        />
                </div>
                <div className="media-body">
                    <div className="about">
                        <span className="user">
                            { comment.user.name }
                        </span>
                        <span className="time"
                              title={ moment( comment.created_at ).format( 'LLLL' ) }
                            >
                            { moment( comment.created_at ).fromNow() }
                        </span>
                    </div>
                    <MarkedDisplay
                        content={ comment.comment }
                        />
                </div>
            </div>
        );
    },

    onComments: function ( comments ) {
        this.setState( {
            comments
        } );
    },

    addComment( comment ) {
        return this.props.store.addComment( comment );
    }


} );