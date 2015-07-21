import _ from 'lodash';
import React from 'react';

export default React.createClass( {

    render() {
        let uom = this.props.recipe.recipeOilsUom() + 's';

        return (
            <div className="recipe-totals">
                { this.props.recipe.countWeights() > 0 &&
                    <table className="table table-striped table-hover table-condensed">
                        <tbody>
                        <tr>
                            <td>
                                Total Water Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.totalWaterWeight' ) } { uom }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total {this.props.recipe.soapTypeToLye()} Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.totalLye' ) } {uom} {this.purityInfo()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total Batch Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.totalBatchWeight' ) } { uom }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Lye Concentration
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.lyeConcentration' ) }%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Water <strong>:</strong> Lye Ratio
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.waterLyeRatio', 3 ) } <strong>:</strong> 1
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Saturated <strong>:</strong> Unsaturated
                            </td>
                            <td>
                                { this.roundedSaturation( 'saturated' ) } <strong>:</strong> { this.roundedSaturation( 'unsaturated' ) }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                }
            </div>
        );
    },

    roundedValue( key, precision ) {
        return _.round( this.props.recipe.getRecipeValue( key ), precision );
    },

    roundedSaturation( fatType ) {
        return _.round( this.props.recipe.getRecipeValue( `summary.saturations.${fatType}` ) );
    },

    purityInfo() {
        if ( this.props.recipe.isKohRecipe() ) {
            return `at ${this.props.recipe.getRecipeValue( 'kohPurity' )}% purity`;
        }
    }



} );