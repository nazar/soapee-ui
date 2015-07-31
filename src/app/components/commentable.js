import _ from 'lodash';
import React from 'react';

import AddComment from 'components/addComment';
import Comment from 'components/comment';

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
                { _.get( this.state.comments, 'length' ) > 0 && <legend>Comments</legend> }
                { _.map( this.state.comments, this.renderComment, this ) }
            </div>
        );
    },

    renderComment( comment ) {
        return (
            <div className="animate zoomIn" key={ `comment-${ comment.id }` }>
                <Comment
                    comment={ comment }
                    />
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