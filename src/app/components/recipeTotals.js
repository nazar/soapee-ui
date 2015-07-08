import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import recipeStore from 'stores/recipe';

export default React.createClass( {

    mixins: [
        Reflux.connectFilter( recipeStore, 'recipe', extractTotals )
    ],

    render() {
        let uom = recipeStore.recipeOilsUom() + 's';
        console.log('state', this.state );

        return (
            <div className="recipe-totals">
                { recipeStore.countWeights() > 0 &&
                    <table className="table table-striped table-hover table-condensed">
                        <tbody>
                        <tr>
                            <td>
                                Total Water Weight
                            </td>
                            <td>
                                { this.roundedValue( 'totals.totalWaterWeight' ) } { uom }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total {this.soapTypeToLye()} Weight
                            </td>
                            <td>
                                { this.roundedValue( 'totals.totalLye' ) } {uom} {this.purityInfo()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total Batch Weight
                            </td>
                            <td>
                                { this.roundedValue( 'totals.totalBatchWeight' ) } { uom }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Lye Concentration
                            </td>
                            <td>
                                { this.roundedValue( 'totals.lyeConcentration' ) }%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Water <strong>:</strong> Lye Ratio
                            </td>
                            <td>
                                { this.roundedValue( 'totals.waterLyeRatio', 3 ) } <strong>:</strong> 1
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
        return _.round( _.get( this.state.recipe, key ), precision );
    },

    roundedSaturation( fatType ) {
        return _.round( _.get( this.state.recipe, `saturations.${fatType}` ) );
    },

    soapTypeToLye() {
        return {
            noah: 'NaOH',
            koh: 'KOH'
        }[ this.state.recipe.soapType ];
    },

    purityInfo() {
        if ( this.state.recipe.soapType === 'koh' ) {
            return `at ${this.state.recipe.kohPurity}% purity`;
        }
    }



} );


/////////////////////
//// Private

function extractTotals( store ) {
    return {
        totals: _.get( store.recipe, 'totals' ),
        saturations: _.get( store.recipe, 'saturations' ),
        soapType: store.soapType,
        kohPurity: store.kohPurity
    };
}