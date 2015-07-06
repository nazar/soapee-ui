import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import recipeStore from 'stores/recipe';

export default React.createClass( {

    mixins: [
        Reflux.connectFilter( recipeStore, 'recipe', extractRecipeFromStore.bind( this ) )
    ],

    render() {
        return (
            <div className="recipe-breakdown">
                <ul className="list-unstyled">
                    <li>
                        <span className="title">Total Oil Weight:</span>
                        <span className="value">{ _.get( this.state.recipe, 'recipe.totals.totalOilWeight' ) }</span>
                    </li>
                    <li>
                        <span className="title">Total Water Weight:</span>
                        <span className="value">{ _.get( this.state.recipe, 'recipe.totals.totalWaterWeight' ) }</span>
                    </li>
                    <li>
                        <span className="title">Total {this.soapTypeTpLye()} Weight:</span>
                        <span className="value">{ _.get( this.state.recipe, 'recipe.totals.totalLye' ) } {this.purityInfo()}</span>
                    </li>
                    <li>
                        <span className="title">Total Batch Weight:</span>
                        <span className="value">{ _.get( this.state.recipe, 'recipe.totals.totalBatchWeight' ) }</span>
                    </li>
                    <li>
                        <span className="title">Lye Concentration:</span>
                        <span className="value">{ _.get( this.state.recipe, 'recipe.totals.lyeConcentration' ) }</span>
                    </li>
                    <li>
                        <span className="title">Water : Lye Ratio:</span>
                        <span className="value">{ _.get( this.state.recipe, 'recipe.totals.waterLyeRatio' ) } : 1</span>
                    </li>
                </ul>
            </div>
        );
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
    }

} );

////////////////////
//// Private

function extractRecipeFromStore( store ) {
    return {
        recipe: store.recipe,
        oum: store.uom,
        soapType: store.soapType,
        kohPurity: store.kohPurity
    };
}