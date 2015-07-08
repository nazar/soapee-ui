import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import recipeStore from 'stores/recipe';

export default React.createClass( {

    mixins: [
        Reflux.connectFilter( recipeStore, 'recipe', extractBreakdowns )
    ],

    render() {
        return (
            <div className="recipe-fatty-acids">
                <ul className="list-unstyled">
                    { this.renderOrderedBreakdowns() }
                </ul>
                <div className="summary">
                    Sat : Unsat Ratio { this.roundedSaturation( 'saturated' ) } <strong>:</strong> { this.roundedSaturation( 'unsaturated' ) }
                </div>
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
                        <li>
                            <span className="title">{_.capitalize( fattyAcid )}: </span> <span className="value">{value}</span>
                        </li>
                    );
                }
            } )
            .compact()
            .value();
    },

    roundedSaturation( fatType ) {
        return _.round( _.get( this.state, `recipe.saturations.${fatType}` ) );
    }
} );


/////////////////////
//// Private

function extractBreakdowns( store ) {
    return {
        breakdowns: _.get( store.recipe, 'breakdowns' ),
        saturations: _.get( store.recipe, 'saturations' )
    };
}