import _ from 'lodash';
import React from 'react';

export default React.createClass( {

    render() {
        let uom = this.props.recipe.recipeOilsUom() + 's';
        let places = this.props.recipe.roundPlaces();

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
                                { this.roundedValue( 'summary.totals.totalWaterWeight', places ) } { uom }
                            </td>
                        </tr>
                        { this.props.recipe.isMixedRecipe() &&
                            [
                                <tr>
                                    <td>
                                        Total NaOH Weight
                                    </td>
                                    <td>
                                        { this.roundedValue( 'summary.totals.totalNaoh', places ) } {uom}
                                    </td>
                                </tr>
                                ,
                                <tr>
                                    <td>
                                        Total KoH Weight
                                    </td>
                                    <td>
                                        { this.roundedValue( 'summary.totals.totalKoh', places ) } {uom} { `at ${this.props.recipe.getModelValue( 'kohPurity' )}% purity` }
                                    </td>
                                </tr>
                                ,
                                <tr>
                                    <td>
                                        Total Lye Weight
                                    </td>
                                    <td>
                                        { this.roundedValue( 'summary.totals.totalLye', places ) } {uom}
                                    </td>
                                </tr>
                            ]
                        }
                        { !(this.props.recipe.isMixedRecipe()) &&
                            <tr>
                                <td>
                                    Total {this.props.recipe.soapTypeToLye()} Weight
                                </td>
                                <td>
                                    { this.roundedValue( 'summary.totals.totalLye', places ) } {uom} {this.purityInfo()}
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>
                                Total Oil Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.totalOilWeight', places ) } { uom }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total Batch Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.totalBatchWeight', places ) } { uom }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Lye Concentration
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.lyeConcentration', places ) }%
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
        return _.round( this.props.recipe.getModelValue( key ), precision );
    },

    roundedSaturation( fatType ) {
        return _.round( this.props.recipe.getModelValue( `summary.saturations.${fatType}` ) );
    },

    purityInfo() {
        if ( this.props.recipe.isKohRecipe() ) {
            return `at ${this.props.recipe.getModelValue( 'kohPurity' )}% purity`;
        }
    }



} );