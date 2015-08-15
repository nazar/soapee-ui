import React from 'react';

import RecipeBreakdown from 'components/recipeBreakdown';
import RecipeTotals from 'components/recipeTotals';
import RecipeFattyAcids from 'components/recipeFattyAcids';
import RecipeProperties from 'components/recipeProperties';
import MarkedDisplay from 'components/markedDisplay';

export default React.createClass( {

    render() {
        let recipeName =  this.props.recipe.getModelValue( 'name' );
        let recipeDescription = this.props.recipe.getModelValue( 'description');
        let recipeNotes = this.props.recipe.getModelValue( 'notes');

        return (
            <div className="recipe-print-area">

                <div className="container">

                    { recipeName &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="name">
                                    <h4>{ recipeName }</h4>
                                </div>
                            </div>
                        </div>
                    }

                    { recipeDescription &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="description">
                                    <MarkedDisplay content={ recipeDescription } />
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
                            <RecipeProperties
                                recipe={ this.props.recipe }
                                withRange={true}
                                />
                        </div>
                        <div className="col-xs-6">
                            <h6>Fatty Acids %</h6>
                            <RecipeFattyAcids
                                recipe={ this.props.recipe }
                                />
                        </div>
                    </div>

                    { recipeNotes &&
                        <div className="row">
                            <div className="col-xs-12">
                                <h6>Notes</h6>
                                <div className="notes">
                                    <MarkedDisplay content={ recipeNotes } />
                                </div>
                            </div>
                        </div>
                    }

                </div>

            </div>
        );
    }


} );