import _ from 'lodash';
import React from 'react/addons';
import Reflux from 'reflux';
import { Link, Navigation, State } from 'react-router';

import recipeActions from 'actions/recipe';
import formLinkHandlers from 'mixins/formLinkHandlers';

import  recipeStore from 'stores/recipe';
import  recipeJournalStore from 'stores/recipeJournal';

import Imageable from 'components/imageable';
import ImageableEdit from 'components/imageableEdit';
import MarkdownEditor from 'components/markdownEditor';
import Spinner from 'components/spinner';

export default React.createClass( {

    mixins: [
        Navigation,
        State,
        formLinkHandlers,
        Reflux.connect( recipeStore, 'recipe' ),
        Reflux.connect( recipeJournalStore, 'journal' )
    ],

    componentDidMount() {
        recipeJournalStore.reset();

        recipeActions.getRecipeById( this.getParams().recipeId )
            .tap( recipe => recipeActions.getRecipeJournal( recipe, { id: this.getParams().journalId } ) )
            .then( recipe => recipeActions.getRecipeJournalComments( recipe, { id: this.getParams().journalId } ) );
    },


    render() {
        let recipe = this.state.recipe;
        document.title = 'Soapee - Editing Journal';

        return (
            <div id="recipe-journal-edit">
                <ol className="breadcrumb">
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="recipes">Recipes</Link></li>
                    { Number( recipe.getModelValue( 'id' ) ) > 0 && <li><Link to="recipe" params={ { id: recipe.getModelValue( 'id' ) } }>{ recipe.getModelValue( 'name' ) }</Link></li> }
                    <li className="active">Editing Recipe Journal</li>
                </ol>

                { this.renderLoading() }
                { this.renderJournalEditForm() }


            </div>
        );
    },

    renderJournalEditForm() {
        if ( this.state.journal ) {

            return (
                <div>
                    <MarkdownEditor
                        placeholder="Add your journal...."
                        valueLink={ this.linkComponentState( this, 'journal.journal' ) }
                        rows={ 3 }
                        />

                    { this.state.errors &&
                        <div className="alert alert-danger text-center animate bounceIn" role="alert">
                            { this.state.errors }
                        </div>
                    }

                    { _.get( this.state, 'journal.images.length' ) > 0 &&
                        <div className="row">
                            <div className="col-md-12">
                                <legend>Delete Photos?</legend>
                                <ImageableEdit
                                    images={ this.state.journal.images }
                                    />
                            </div>
                        </div>
                    }


                    <legend>Add Journal Photos?</legend>
                    <Imageable
                        imageableType='recipe_journals'
                        startImageUpload={ this.startImageUploadHookFn }
                        OnUploadedCompleted={ this.clearAndRedirect }
                        />

                    <div className="btn-toolbar">
                        <button className="btn btn-primary"
                                onClick={ this.updateJournal }
                                disabled={ this.state.saving }
                            >
                            <i className="fa fa-floppy-o"> Save</i>
                        </button>
                        <button className="btn btn-primary"
                                onClick={ this.clearAndRedirect }
                            >
                            <i className="fa fa-ban"> Cancel</i>
                        </button>
                        <button className="btn btn-warning"
                                onClick={ this.deleteJournal }
                            >
                            <i className="fa fa-times"> Delete</i>
                        </button>
                    </div>
                </div>
            );

        }
    },

    renderLoading() {
        if ( !(this.state.journal) ) {
            return (
                <Spinner />
            );
        }
    },

    startImageUploadHookFn( startFn ) {
        this.startImageUpload = startFn;
    },

    updateJournal() {
        this.setState( {
            saving: true
        } );

        recipeActions.updateRecipeJournal( this.state.recipe.recipe, this.state.journal )
            .then( () => this.startImageUpload( this.state.journal.id ) );
    },

    deleteJournal() {
        if ( confirm( 'Delete this recipe journal?' ) ) {
            recipeActions.deleteRecipeJournal( this.state.recipe.recipe, this.state.journal )
                .then( () => this.transitionTo( 'recipe', { id: this.state.recipe.getModelValue( 'id' ) } ) );
        }
    },

    clearAndRedirect() {
        this.setState( {
            saving: false,
            errors: null
        } );

        this.transitionTo( 'recipe-journal', {
            recipeId: this.state.recipe.getModelValue( 'id' ),
            journalId: this.state.journal.id
        } );
    }


} );