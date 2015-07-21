import React from 'react';
import Reflux from 'reflux';
import { Navigation } from 'react-router';

import calculatorStore from 'stores/calculator';

import RecipeBreakdown from 'components/recipeBreakdown';
import RecipeTotals from 'components/recipeTotals';
import RecipeFattyAcids from 'components/recipeFattyAcids';
import RecipeProperties from 'components/recipeProperties';



export default React.createClass( {

    mixins: [
        Navigation,
        Reflux.connect( calculatorStore, 'recipe' )
    ],

    componentDidMount() {
        window.print();
        this.replaceWith( 'calculator' );
    },

    render() {
        let recipeName = this.state.recipe.getRecipeValue( 'name ');
        let recipeNotes = this.state.recipe.getRecipeValue( 'notes ');

        return (
            <div id="print-recipe">
                <div className="print-area">

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
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                            <div className="col-xs-12">
                                <h6>Recipe Totals</h6>
                                <RecipeTotals
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                        </div>

                        <h6>Summaries</h6>
                        <div className="col-xs-12 summary">
                            <div className="col-xs-6">
                                <h6>Fatty Acids</h6>
                                <RecipeFattyAcids
                                    recipe={ this.state.recipe }
                                    />
                            </div>
                            <div className="col-xs-6">
                                <h6>Recipe Properties</h6>
                                <RecipeProperties
                                    recipe={ this.state.recipe }
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
            </div>
        );
    }

} );