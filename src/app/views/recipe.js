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
        let recipeName;
        let recipeDescription;
        let recipeNotes;

        if ( this.state.recipe ) {
            recipeName = this.state.recipe.getModelValue( 'name' );
            recipeDescription = this.state.recipe.getModelValue( 'description' );
            recipeNotes = this.state.recipe.getModelValue( 'notes' );

            return (
                <div>
                    <ol className="breadcrumb">
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="recipes">Recipes</Link></li>
                        <li className="active">{recipeName}</li>
                    </ol>

                    <legend><h1>{recipeName}</h1></legend>
                    { recipeDescription && <div className="description">{ recipeDescription }</div> }

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Oils</h3>
                                </div>
                                <RecipeBreakdown
                                    recipe={ this.state.recipe }
                                    withOilLinks={true}
                                    />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Total Weights</h3>
                                </div>
                                <RecipeTotals
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Fatty Acids</h3>
                                </div>
                                <RecipeFattyAcids
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Recipe Properties</h3>
                                </div>
                                <RecipeProperties
                                    recipe={ this.state.recipe }
                                    withRange={true}
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
        editButton = <Link to="editRecipe" params={ { id: this.getParams().id } } className="btn btn-primary"><i className="fa fa-pencil-square-o"></i> Edit Recipe</Link>;

        if ( authStore.isAuthenticated() ) {
            addToFavouritesButton = <button className="btn btn-primary"><i className="fa fa-star"></i> Add to Favourites</button>;

            if ( !(authStore.isMyId( this.state.recipe.getModelValue( 'user_id' )) ) ) {
                editButton = <Link to="editRecipe" params={ { id: this.getParams().id } } className="btn btn-primary"><i className="fa fa-pencil-square-o"></i> Copy and Edit Recipe</Link>;
            }
        } else {
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
    }

} );