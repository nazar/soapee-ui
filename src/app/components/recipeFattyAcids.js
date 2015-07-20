import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import calculatorStore from 'stores/calculator';

export default React.createClass( {

    mixins: [
        Reflux.connectFilter( calculatorStore, 'recipe', extractBreakdowns )
    ],

    render() {
        return (
            <div className="recipe-fatty-acids">
                <table className="table table-striped table-condensed table-super-condensed">
                    <tbody>
                    { this.renderOrderedBreakdowns() }
                    </tbody>
                </table>
            </div>
        );
    },

    renderOrderedBreakdowns() {
        let breakdowns = this.state.recipe.breakdowns;

        return _( breakdowns )
            .keys()
            .sort()
            .map( fattyAcid => {
                let value = _.round( breakdowns[ fattyAcid ] );

                if (  value ) {
                    return (
                        <tr>
                            <td>{_.capitalize( fattyAcid )}</td>
                            <td>{value}%</td>
                        </tr>
                    );
                }
            } )
            .compact()
            .value();
    }

} );


/////////////////////
//// Private

function extractBreakdowns( store ) {
    return {
        breakdowns: _.get( store.summary, 'breakdowns' ),
        saturations: _.get( store.summary, 'saturations' )
    };
}