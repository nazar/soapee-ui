import _ from 'lodash';
import React from 'react';

import roundFormatted from 'utils/roundFormated';

export default React.createClass( {

    render() {
        let uom = this.props.recipe.uomToUse() + 's';
        let places = this.props.recipe.roundPlaces();
        let discount = this.props.recipe.waterDiscount() ? `(${this.props.recipe.waterDiscount()}% less)` : '';

        return (
            <div className="recipe-totals">
                { this.props.recipe.countWeights() > 0 &&
                    <table className="table table-striped table-hover table-condensed">
                        <tbody>
                        { this.props.recipe.totalsIncludeWater() &&
                            <tr>
                                <td colSpan="3">
                                    Oil weight accounts for water
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>
                                Total Water Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.totalWaterWeight', places ) } { uom } { discount }
                            </td>
                            { this.gramsColumn( 'summary.totals.totalWaterWeight' ) }
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
                                    { this.gramsColumn( 'summary.totals.totalNaoh' ) }
                                </tr>
                                ,
                                <tr>
                                    <td>
                                        Total KoH Weight
                                    </td>
                                    <td>
                                        { this.roundedValue( 'summary.totals.totalKoh', places ) } {uom} { `at ${this.props.recipe.getModelValue( 'kohPurity' )}% purity` }
                                    </td>
                                    { this.gramsColumn( 'summary.totals.totalKoh' ) }
                                </tr>
                                ,
                                <tr>
                                    <td>
                                        Total Lye Weight
                                    </td>
                                    <td>
                                        { this.roundedValue( 'summary.totals.totalLye', places ) } {uom}
                                    </td>
                                    { this.gramsColumn( 'summary.totals.totalLye' ) }
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
                                { this.gramsColumn( 'summary.totals.totalLye' ) }
                            </tr>
                        }
                        <tr>
                            <td>
                                Total Oil Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.totalOilWeight', places ) } { uom }
                            </td>
                            { this.gramsColumn( 'summary.totals.totalOilWeight' ) }
                        </tr>
                        <tr>
                            <td>
                                Fragrance Oil Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.fragranceWeight', places ) } { uom }
                            </td>
                            { this.gramsColumn( 'summary.totals.fragranceWeight' ) }
                        </tr>
                        { this.props.recipe.superfatAfter() &&
                            <tr>
                                <td>
                                    Superfat after cook
                                </td>
                                <td>
                                    { this.roundedValue( 'summary.totals.totalSuperfat', places ) } { uom }
                                </td>
                                { this.gramsColumn( 'summary.totals.totalSuperfat' ) }
                            </tr>
                        }
                        <tr>
                            <td>
                                Total Batch Weight
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.totalBatchWeight', places ) } { uom }
                            </td>
                            { this.gramsColumn( 'summary.totals.totalBatchWeight' ) }
                        </tr>
                        { !(this.props.recipe.superfatAfter()) &&
                            <tr>
                                <td>
                                    Superfat
                                </td>
                                <td>
                                    { this.props.recipe.getModelValue( 'superFat')  }%
                                </td>
                                { this.gramsColumn() }
                            </tr>
                        }
                        <tr>
                            <td>
                                Lye Concentration
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.lyeConcentration', places ) }%
                            </td>
                            { this.gramsColumn() }
                        </tr>
                        { this.props.recipe.isMixedRecipe() &&
                            <tr>
                                <td>
                                    NaOH / KOH Ratio
                                </td>
                                <td>
                                    { this.props.recipe.getModelValue( 'ratioNaoh')  }% / { this.props.recipe.getModelValue( 'ratioKoh')  }%
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>
                                Water <strong>:</strong> Lye Ratio
                            </td>
                            <td>
                                { this.roundedValue( 'summary.totals.waterLyeRatio', 3 ) } <strong>:</strong> 1
                            </td>
                            { this.gramsColumn() }
                        </tr>
                        <tr>
                            <td>
                                Saturated <strong>:</strong> Unsaturated
                            </td>
                            <td>
                                { this.roundedSaturation( 'saturated' ) } <strong>:</strong> { this.roundedSaturation( 'unsaturated' ) }
                            </td>
                            { this.gramsColumn() }
                        </tr>
                        </tbody>
                    </table>
                }
            </div>
        );
    },

    roundedValue( key, precision ) {
        return roundFormatted( this.props.recipe.getModelValue( key ), precision );
    },

    roundedSaturation( fatType ) {
        return _.round( this.props.recipe.getModelValue( `summary.saturations.${fatType}` ) );
    },

    purityInfo() {
        if ( this.props.recipe.isKohRecipe() ) {
            return `at ${this.props.recipe.getModelValue( 'kohPurity' )}% purity`;
        }
    },

    gramsColumn( key ) {
        let placesGrams = this.props.recipe.roundPlacesForUom( 'gram' );

        if ( !(this.props.recipe.isUomGrams()) ) {
            if ( key ) {
                return (
                    <td>
                        { this.inGrams( key, placesGrams ) }
                    </td>
                );
            } else {
                return <td>&nbsp;</td>;
            }
        }
    },

    inGrams( key, precision ) {
        let weight = this.props.recipe.getModelValue( key );
        let inGrams;

        if ( !(this.props.recipe.isUomGrams()) ) {
            inGrams = roundFormatted( this.props.recipe.convertWeightToGrams( weight ), precision );
            return <span className="gram-convert">{ inGrams } g</span>;
        }
    }

} );