import React from 'react';

import RecipeBreakdown from 'components/recipeBreakdown';
import RecipeTotals from 'components/recipeTotals';
import RecipeFattyAcids from 'components/recipeFattyAcids';
import RecipeProperties from 'components/recipeProperties';

export default React.createClass( {

    render() {
        let recipeName =  this.props.recipe.getRecipeValue( 'name' );
        let recipeNotes = this.props.recipe.getRecipeValue( 'notes');

        return (
            <div className="recipe-print-area">

                <div className="container">

                    { recipeName &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="name">
                                    <h4>{recipeName}</h4>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-xs-12">
                            <h6>Recipe Oils</h6>
                            <RecipeBreakdown
                                recipe={ this.props.recipe }
                                />
                        </div>
                        <div className="col-xs-12">
                            <h6>Recipe Totals</h6>
                            <RecipeTotals
                                recipe={ this.props.recipe }
                                />
                        </div>
                    </div>

                    <h6>Summaries</h6>
                    <div className="col-xs-12 summary">
                        <div className="col-xs-6">
                            <h6>Fatty Acids</h6>
                            <RecipeFattyAcids
                                recipe={ this.props.recipe }
                                />
                        </div>
                        <div className="col-xs-6">
                            <h6>Recipe Properties</h6>
                            <RecipeProperties
                                recipe={ this.props.recipe }
                                />
                        </div>
                    </div>

                    { recipeNotes &&
                        <div className="row">
                            <div className="col-xs-12">
                                <h6>Notes</h6>
                                <div className="notes">
                                    <div dangerouslySetInnerHTML={ { __html: recipeNotes } }></div>
                                </div>
                            </div>
                        </div>
                    }

                </div>

            </div>
        );
    }


} )