import _ from 'lodash';
import React from 'react';

export default React.createClass( {

    render() {
        let uom = _.capitalize( this.props.recipe.recipeOilsUom() ) + 's';

        return (
            <div className="recipe-breakdown">
                { this.props.recipe.countWeights() > 0 &&
                    <table className="table table-striped table-hover table-condensed">
                        <thead>
                        <tr>
                            <th>Oil</th>
                            <th>%</th>
                            <th>{uom}</th>
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

    totalsRow() {
        let totals = _.reduce( this.props.recipe.recipeOilsWeightsRatios(), ( result, oilRow ) => {
            return _.tap( result, r => {
                r.ratio = result.ratio + oilRow.ratio * 100;
                r.weight = result.weight + Number( oilRow.weight );
            } );
        }, { ratio: 0, weight: 0 } );

        return (
            <tr>
                <td>
                </td>
                <td>
                    <strong>{ _.round( totals.ratio ) }</strong>
                </td>
                <td>
                    <strong>{ _.round( totals.weight ) }</strong>
                </td>
            </tr>
        );
    }

} );