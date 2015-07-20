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
        return (
            <div id="print-recipe">
                <div className="print-area">

                    <div className="container">

                        { this.state.recipe.name &&
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="name">
                                        <h4>{this.state.recipe.name}</h4>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="row">
                            <div className="col-xs-12">
                                <h6>Recipe Oils</h6>
                                <RecipeBreakdown />
                            </div>
                            <div className="col-xs-12">
                                <h6>Recipe Totals</h6>
                                <RecipeTotals />
                            </div>
                        </div>

                        <h6>Summaries</h6>
                        <div className="col-xs-12 summary">
                            <div className="col-xs-6">
                                <h6>Fatty Acids</h6>
                                <RecipeFattyAcids/>
                            </div>
                            <div className="col-xs-6">
                                <h6>Recipe Properties</h6>
                                <RecipeProperties/>
                            </div>
                        </div>

                        { this.state.recipe.notes &&
                            <div className="row">
                                <div className="col-xs-12">
                                    <h6>Notes</h6>
                                    <div className="notes">
                                        <div dangerouslySetInnerHTML={ { __html: this.state.recipe.notes } }></div>
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