import React from 'react/addons';
import Reflux from 'reflux';

import recipeActions from 'actions/recipe';

import authStore from 'stores/auth';

import BootstrapModalLink from 'components/bootstrapModalLink';
import Imageable from 'components/imageable';
import MarkdownEditor from 'components/markdownEditor';

import SignupOrLoginToSaveRecipe from 'modals/signupOrLoginToSaveRecipe';
import ValidateComment from 'services/validateComment';


export default React.createClass( {

    mixins: [
        React.addons.LinkedStateMixin,
        Reflux.connect( authStore, 'user' )
    ],

    getInitialState() {
        return {
            journal: null
        };
    },

    render() {
        return (
            <div className="recipe-journal-add">
                <MarkdownEditor
                    placeholder="Add your journal...."
                    valueLink={ this.linkState( 'journal' ) }
                    rows={ 3 }
                    />

                { this.state.errors &&
                    <div className="alert alert-danger text-center animate bounceIn" role="alert">
                        { this.state.errors }
                    </div>
                }

                <legend>Add Journal Photos</legend>
                <Imageable
                    imageableType='recipe_journals'
                    startImageUpload={ this.startImageUploadHookFn }
                    OnUploadedCompleted={ this.clearForm }
                    />

                <div className="btn-toolbar action-buttons">
                    { this.renderAddJournalButton() }
                </div>
            </div>
        );
    },

    renderAddJournalButton() {
        let button;
        let caption;

        caption = <i className="fa fa-book"> Add Recipe Journal</i>;

        if ( authStore.isAuthenticated() ) {
            button = <button className="btn btn-primary" disabled={this.state.saving} onClick={ this.addJournal }>{ caption }</button>;
        } else {
            button = (
                <BootstrapModalLink
                    elementToClick={<button className="btn btn-primary">{ caption }</button>}
                    modal={SignupOrLoginToSaveRecipe}
                    action="add recipe journals"
                    />
            );
        }

        return button;
    },

    addJournal() {

        this.setState( {
            saving: true
        } );

        validate.call( this )
            .with( this )
            .then( addJournal )
            .then( uploadImages )
            .catch( this.showError );

        function validate() {
            return new ValidateComment( {
                comment: this.state.journal
            } )
                .execute();
        }

        function addJournal() {
            return recipeActions.addRecipeJournal( this.props.recipe, this.state.journal );
        }

        function uploadImages( recipeJournal ) {
            this.startUpload( recipeJournal.id );
        }
    },

    startImageUploadHookFn( startUploadFn ) {
        this.startUpload = startUploadFn;
    },

    clearForm() {
        this.setState( {
            saving: false,
            journal: '',
            errors: null
        } );
        recipeActions.getRecipeJournals( this.props.recipe );
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