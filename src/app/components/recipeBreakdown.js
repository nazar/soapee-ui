import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import recipeStore from 'stores/recipe';

export default React.createClass( {

    mixins: [
        Reflux.connect( recipeStore, 'recipe' )
    ],

    render() {
        let uom = _.capitalize( recipeStore.recipeOilsUom() ) + 's';

        return (
            <div className="recipe-breakdown">
                { recipeStore.recipeIsValid() &&
                    <table className="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                        <tr>
                            <th>Oil</th>
                            <th>%</th>
                            <th>{uom}</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.recipeOilRows() }
                        <tr>
                            <td colSpan="2">
                                Total Water Weight
                            </td>
                            <td>
                                { this.roundedValue( 'recipe.totals.totalWaterWeight' ) }
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                Total {this.soapTypeTpLye()} Weight
                            </td>
                            <td>
                                { this.roundedValue( 'recipe.totals.totalLye' ) } {uom} {this.purityInfo()}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                Total Oil Weight
                            </td>
                            <td>
                                { this.roundedValue( 'recipe.totals.totalOilWeight' ) }
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                Total Batch Weight
                            </td>
                            <td>
                                { this.roundedValue( 'recipe.totals.totalBatchWeight' ) }
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                Lye Concentration
                            </td>
                            <td>
                                { this.roundedValue( 'recipe.totals.lyeConcentration' ) }%
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                Water <strong>:</strong> Lye Ratio
                            </td>
                            <td>
                                { this.roundedValue( 'recipe.totals.waterLyeRatio', 3 ) } <strong>:</strong> 1
                            </td>
                        </tr>
                        </tbody>
                    </table>

                }
            </div>
        );
    },

    recipeOilRows() {
        let oilRows = recipeStore.recipeOilsWeightsRatios();

        return _.map( oilRows,  row => {
            return (
                <tr>
                    <td>
                        { row.oil.name }
                    </td>
                    <td>
                        { _.round( row.ratio * 100 ) }
                    </td>
                    <td>
                        { _.round( row.weight ) }
                    </td>
                </tr>
            );
        } );
    },

    soapTypeTpLye() {
        return {
            noah: 'NaOH',
            koh: 'KOH'
        }[ this.state.recipe.soapType ];
    },

    purityInfo() {
        if ( this.state.recipe.soapType === 'koh' ) {
            return `at ${this.state.recipe.kohPurity}% purity`;
        }
    },

    roundedValue( key, precision ) {
        return _.round( _.get( this.state.recipe, key ), precision );
    }

} );

////////////////////
//// Private

function extractRecipeFromStore( store ) {
    return {
        recipe: store.recipe,
        uom: store.uom,
        soapType: store.soapType,
        kohPurity: store.kohPurity
    };
}