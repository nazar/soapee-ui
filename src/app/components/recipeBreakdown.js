import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import roundFormatted from 'utils/roundFormated';

export default React.createClass( {

    render() {
        let uom = _.capitalize( this.props.recipe.uomToUse() ) + 's';

        return (
            <div className="recipe-breakdown">
                { this.props.recipe.countWeights() > 0 &&
                    <table className="table table-striped table-hover table-condensed">
                        <thead>
                        <tr>
                            <th>Oil</th>
                            <th>%</th>
                            <th>{uom}</th>
                            { this.showGrams() && <th>Grams</th> }
                        </tr>
                        </thead>
                        <tbody>
                        { this.recipeOilRows() }
                        { this.totalsRow() }
                        </tbody>
                    </table>

                }
            </div>
        );
    },

    recipeOilRows() {
        let oilRows = this.props.recipe.recipeOilsWeightsRatios();
        let places = this.props.recipe.roundPlaces();

        return _.map( oilRows,  row => {
            return (
                <tr key={ `recipe-oil-row-${ row.oil.id }` }>
                    <td>
                        { this.oilCell( row.oil ) }
                    </td>
                    <td>
                        { _.round( row.ratio * 100 ) }
                    </td>
                    <td>
                        { roundFormatted( row.weight, places ) }
                    </td>
                    { this.showInGrams( row.weight ) }
                </tr>
            );
        } );
    },

    oilCell( oil ) {
        if ( this.props.withOilLinks ) {
            return <Link to="oil" params={ { id: oil.id } }>{ oil.name }</Link>;
        } else {
            return oil.name;
        }
    },

    totalsRow() {
        let totals = _.reduce( this.props.recipe.recipeOilsWeightsRatios(), ( result, oilRow ) => {
            return _.tap( result, r => {
                r.ratio = result.ratio + oilRow.ratio * 100;
                r.weight = result.weight + Number( oilRow.weight );
            } );
        }, { ratio: 0, weight: 0 } );
        let places = this.props.recipe.roundPlaces();

        return (
            <tr>
                <td>
                </td>
                <td>
                    <strong>{ _.round( totals.ratio, 1 ) }</strong>
                </td>
                <td>
                    <strong>{ roundFormatted( totals.weight, places ) }</strong>
                </td>
                { this.showInGrams( totals.weight ) }
            </tr>
        );
    },

    showGrams() {
        return !(this.props.recipe.isUomGrams());
    },

    showInGrams( weight ) {
        let placesGrams = this.props.recipe.roundPlacesForUom( 'gram' );
        let converted = this.props.recipe.convertWeightToGrams( weight );

        if ( this.showGrams() ) {
            return (
                <td>
                    { roundFormatted( converted, placesGrams ) }
                </td>
            );
        }
    }

} );