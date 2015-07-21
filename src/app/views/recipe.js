import React from 'react';
import Reflux from 'reflux';
import { State, Link } from 'react-router';

import recipeStore from 'stores/recipe';
import recipeActions from 'actions/recipe';

import Spinner from 'components/spinner';
import RecipeBreakdown from 'components/recipeBreakdown';
import RecipeTotals from 'components/recipeTotals';
import RecipeFattyAcids from 'components/recipeFattyAcids';
import RecipeProperties from 'components/recipeProperties';

export default React.createClass( {

    statics: {
        willTransitionTo: function ( transition, params ) {
            recipeActions.getRecipeById( params.id );
        }
    },

    mixins: [
        State,
        Reflux.connect( recipeStore, 'recipe' )
    ],

    componentDidMount() {
        this.width = $( this.getDOMNode() ).width();
    },

    render() {
        return (
            <div id="recipe">
                { this.renderLoading() }
                { this.renderRecipe() }
            </div>
        );
    },

    renderRecipe() {
        if ( this.state.recipe ) {
            return (
                <div>
                    <ol className="breadcrumb">
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="recipes">Recipes</Link></li>
                        <li className="active">{this.state.recipe.name}</li>
                    </ol>

                    <legend><h1>{this.state.recipe.name}</h1></legend>
                    { this.state.recipe.description && <div className="description" dangerouslySetInnerHTML={ { __html: this.state.recipe.description } }></div> }
                    <div className="row">
                        <div className="col-md-4 col-sm-6">
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Oils</h3>
                                </div>
                                <RecipeBreakdown />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Total Weights</h3>
                                </div>
                                <RecipeTotals />
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Fatty Acids</h3>
                                </div>
                                <RecipeFattyAcids/>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Recipe Properties</h3>
                                </div>
                                <RecipeProperties/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ul className="nav nav-tabs" role="tablist">
                            { this.state.recipe.notes && <li role="presentation" className="active"><a href="#notes" aria-controls="notes" role="tab" data-toggle="tab">Recipe Notes and Directions</a></li> }
                            <li role="presentation"><a href="#facebook" aria-controls="facebook" role="tab" data-toggle="tab">Facebook Comments</a></li>
                            <li role="presentation"><a href="#google" aria-controls="google" role="tab" data-toggle="tab">Google+ Comments</a></li>
                        </ul>
                        <div className="tab-content">
                            { this.state.recipe.notes &&
                                <div role="tabpanel" className="tab-pane active" id="notes">
                                    <div dangerouslySetInnerHTML={ { __html: this.state.recipe.notes } }></div>
                                </div>
                            }
                            <div role="tabpanel" className="tab-pane" id="facebook">
                                <div className="fb-comments"
                                     data-href={window.location}
                                     data-width="100%">
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="google">
                                <div className="g-comments"
                                     data-href={window.location}
                                     data-width={this.width}
                                     data-first_party_property="BLOGGER"
                                     data-view_type="FILTERED_POSTMOD">
                                </div>
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
    }

} );