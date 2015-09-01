import React from 'react/addons';
import Reflux from 'reflux';

import authStore from 'stores/auth';
import ValidateComment from 'services/validateComment';

import MarkdownEditor from 'components/markdownEditor';
import BootstrapModalLink from 'components/bootstrapModalLink';

import SignupOrLoginToSaveRecipe from 'modals/signupOrLoginToSaveRecipe';

export default React.createClass( {

    mixins: [
        React.addons.LinkedStateMixin,
        Reflux.connect( authStore, 'auth' )
    ],

    getDefaultProps() {
        return {
            onNewComment: () => {}
        };
    },

    getInitialState() {
        return {
            comments: null
        };
    },

    render() {
        return (
            <div className="add-comment">
                <MarkdownEditor
                    placeholder="Add your comments...."
                    valueLink={ this.linkState( 'comments' ) }
                    rows={ 3 }
                    />

                { this.state.errors &&
                    <div className="alert alert-danger text-center animate bounceIn" role="alert">
                        { this.state.errors }
                    </div>
                }

                <div className="btn-toolbar action-buttons">
                    { this.renderAddCommentButton() }
                </div>
            </div>
        );
    },

    renderAddCommentButton() {
        let button;
        let caption;

        caption = <i className="fa fa-comment"> Add Comment</i>;

        if ( authStore.isAuthenticated() ) {
            button = <button className="btn btn-primary" onClick={ this.addComment }>{ caption }</button>;
        } else {
            button = (
                <BootstrapModalLink
                    elementToClick={<button className="btn btn-primary">{ caption }</button>}
                    modal={SignupOrLoginToSaveRecipe}
                    action="post comments"
                    />
            );
        }

        return button;
    },

    addComment() {

        function validate() {
            return new ValidateComment( {
                comment: this.state.comments
            } )
                .execute();
        }

        function triggerAddComment() {
            this.props.onNewComment( this.state.comments );
        }

        function clear() {
            this.setState( { comments: '' } );
        }


        this.setState( {
            errors: null
        } );

        validate.call( this )
            .with( this )
            .then( triggerAddComment )
            .then( clear )
            .catch( this.showError );
    },

    showError( e ) {
        if ( e.name === 'CheckitError' ) {
            this.setState( {
                errors: e.toJSON()
            } );
        } else  {
            this.setState( {
                errors: 'Ooops. Something went wrong!!1'
            } );
        }
    }

} );