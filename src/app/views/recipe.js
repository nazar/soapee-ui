import React from 'react';
import Reflux from 'reflux';
import { Link, Navigation, State } from 'react-router';

import recipeStore from 'stores/recipe';
import authStore from 'stores/auth';

import recipeActions from 'actions/recipe';

import Spinner from 'components/spinner';
import RecipeBreakdown from 'components/recipeBreakdown';
import RecipeTotals from 'components/recipeTotals';
import RecipeFattyAcids from 'components/recipeFattyAcids';
import RecipeProperties from 'components/recipeProperties';
import GoogleComments from 'components/googleComments';
import FacebookComments from 'components/facebookComments';
import BootstrapModalLink from 'components/bootstrapModalLink';

import SignupOrLoginToSaveRecipe from 'modals/signupOrLoginToSaveRecipe';

export default React.createClass( {

    statics: {
        willTransitionTo: function ( transition, params ) {
            recipeActions.getRecipeById( params.id );
        }
    },

    mixins: [
        State,
        Navigation,
        Reflux.connect( recipeStore, 'recipe' ),
        Reflux.connect( authStore, 'auth' )
    ],

    render() {
        return (
            <div id="recipe">
                { this.renderLoading() }
                { this.renderRecipe() }
            </div>
        );
    },

    renderRecipe() {
        let recipeName = this.state.recipe.getRecipeValue( 'name' );
        let recipeDescription = this.state.recipe.getRecipeValue( 'description' );
        let recipeNotes = this.state.recipe.getRecipeValue( 'notes' );

        if ( this.state.recipe ) {
            return (
                <div>
                    <ol className="breadcrumb">
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="recipes">Recipes</Link></li>
                        <li className="active">{recipeName}</li>
                    </ol>

                    <legend><h1>{recipeName}</h1></legend>
                    { recipeDescription && <div className="description" dangerouslySetInnerHTML={ { __html: recipeDescription } }></div> }
                    <div className="row">
                        <div className="col-md-4 col-sm-6">
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Oils</h3>
                                </div>
                                <RecipeBreakdown
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Total Weights</h3>
                                </div>
                                <RecipeTotals
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Fatty Acids</h3>
                                </div>
                                <RecipeFattyAcids
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Recipe Properties</h3>
                                </div>
                                <RecipeProperties
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                        </div>
                    </div>

                    <legend></legend>
                    { this.renderActionButtons() }

                    <div>
                        <ul className="nav nav-tabs" role="tablist">
                            { recipeNotes && <li role="presentation" className="active"><a href="#notes" aria-controls="notes" role="tab" data-toggle="tab">Recipe Notes and Directions</a></li> }
                            <li role="presentation"><a href="#facebook" aria-controls="facebook" role="tab" data-toggle="tab">Facebook Comments</a></li>
                            <li role="presentation"><a href="#google" aria-controls="google" role="tab" data-toggle="tab">Google+ Comments</a></li>
                        </ul>
                        <div className="tab-content">
                            { recipeNotes &&
                            <div role="tabpanel" className="tab-pane active" id="notes">
                                <div dangerouslySetInnerHTML={ { __html: recipeNotes } }></div>
                            </div>
                            }
                            <div role="tabpanel" className="tab-pane" id="facebook">
                                <FacebookComments />
                            </div>
                            <div role="tabpanel" className="tab-pane" id="google">
                                <GoogleComments />
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    },

    renderLoading() {
        if ( !(this.state.recipe) ) {
            return <Spinner />;
        }
    },

    renderActionButtons() {
        let printButton;
        let editButton;
        let addToFavouritesButton;

        printButton = <Link to="printRecipe" params={ { id: this.getParams().id } } className="btn btn-primary"><i className="fa fa-print"></i> Print Recipe</Link>;

        if ( authStore.isAuthenticated() ) {
            addToFavouritesButton = <button className="btn btn-primary"><i className="fa fa-star"></i> Add to Favourites</button>;

            if ( authStore.isMyId( this.state.recipe.getRecipeValue( 'user_id' ) ) ) {
                editButton = <button className="btn btn-primary" onClick={this.editRecipe}><i className="fa fa-pencil-square-o"></i> Edit Recipe</button>;
            } else {
                editButton = <button className="btn btn-primary" onClick={this.editRecipe}><i className="fa fa-pencil-square-o"></i> Copy and Edit Recipe</button>;
            }
        } else {
            editButton = <button className="btn btn-primary" onClick={this.editRecipe}><i className="fa fa-pencil-square-o"></i> Edit Recipe</button>;
            addToFavouritesButton = (
                <BootstrapModalLink
                    elementToClick={<button className="btn btn-primary"><i className="fa fa-star"></i> Add to Favourites</button>}
                    modal={SignupOrLoginToSaveRecipe}
                    action="add recipe to favourites"
                    />
            );

        }

        return (
            <div className="btn-toolbar">
                { printButton }
                { editButton }
                { addToFavouritesButton }
            </div>
        );
    },

    editRecipe() {
        function redirectToCalculator() {
            this.transitionTo( 'calculator' );
        }

        recipeActions.editRecipeById( this.state.recipe.getRecipeValue( 'id' ) )
            .then( redirectToCalculator.bind( this ) );
    }

} );