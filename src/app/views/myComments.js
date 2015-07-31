import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';

import myCommentsStore from 'stores/myComments';
import meActions from 'actions/me';

import Comment from 'components/comment';
import Spinner from 'components/spinner';

export default React.createClass( {

    mixins: [
        Reflux.connect( myCommentsStore, 'comments' )
    ],

    componentDidMount() {
        meActions.getComments();
    },

    render() {

        return (
            <div id="my-comments">
                <legend>My Comments</legend>
                { this.renderLoading() }
                { this.renderComments() }
            </div>
        );

    },

    renderLoading() {
        if ( !(this.state.comments) ) {
            return <Spinner />;
        }
    },

    renderComments() {
        if ( this.state.comments ) {
            return (
                <div className="comments">
                    { _.map( this.state.comments, this.renderComment, this ) }
                </div>
            );
        }
    },

    renderComment( comment ) {
        let links;
        let route;

        route = {
            oils: 'oil',
            recipes: 'recipe'
        }[ comment.commentable_type ];

        links = [ <Link to={ route } params={ { id: comment.commentable_id } }>in { comment.commentable_type }</Link> ];

        return (
            <div key={ `comment-${ comment.id }` }>
                <Comment
                    comment={ comment }
                    links={ links }
                    />
            </div>
        );
    }

} );