import React from 'react';
import Reflux from 'reflux';
import { Link, State } from 'react-router';

import recipeActions from 'actions/recipe';

import recipeStore from 'stores/recipe';
import recipeJournalStore from 'stores/recipeJournal';
import recipeJournalCommentStore from 'stores/journalComments';

import Commentable from 'components/commentable';
import RecipeJournalItem from 'components/recipeJournalItem';
import Spinner from 'components/spinner';

export default React.createClass( {

    mixins: [
        State,
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

        document.title = 'Soapee - Journal';

        return (
            <div id="recipe-journal">
                <ol className="breadcrumb">
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="recipes">Recipes</Link></li>
                    { Number(recipe.getModelValue( 'id' )) > 0 && <li><Link to="recipe" params={ { id: recipe.getModelValue( 'id' ) } }>{ recipe.getModelValue( 'name' ) }</Link></li> }
                    <li className="active">Viewing Recipe Journal</li>
                </ol>

                { this.renderLoading() }
                { this.renderJournal() }
            </div>
        );
    },

    renderJournal() {
        let journal = this.state.journal;
        let recipe = this.state.recipe.recipe;

        if ( journal ) {
            return (
                <div>
                    <legend>Recipe Journal Entry</legend>
                    <RecipeJournalItem
                        recipe={ recipe }
                        recipeJournal={ journal }
                        imagesType="carousel"
                        state="view"
                        />

                    <legend>Comments</legend>

                    <Commentable
                        store={recipeJournalCommentStore}
                        />
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
    }

} );