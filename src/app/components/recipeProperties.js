import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import recipeStore from 'stores/recipe';

export default React.createClass( {

    mixins: [
        Reflux.connectFilter( recipeStore, 'properties', extractBreakdowns )
    ],

    render() {
        return (
            <div className="recipe-fatty-acids">
                <ul className="list-unstyled">
                    { this.renderOrderedBreakdowns() }
                </ul>
                <ul className="list-unstyled">
                    { this.renderNonProperties() }
                </ul>
            </div>
        );
    },

    renderOrderedBreakdowns() {
        let properties = this.state.properties;

        return _( properties )
            .keys()
            .sort()
            .filter( property => { return !( _.contains( [ 'ins', 'iodine' ], property ) ); } )
            .map( property => {
                let value = _.round( properties[ property ] );
                return (
                    <li>
                        <span className="title">{_.capitalize( property )}: </span> <span className="value">{value}</span>
                    </li>
                );
            } )
            .value();
    },

    renderNonProperties() {
        let properties = this.state.properties;

        if (  _.keys( properties ).length  ) {
            return _.map( [ 'iodine', 'ins' ], property => {
                let value = _.round( properties[ property ] );
                return (
                    <li>
                        <span className="title">{_.capitalize( property )}: </span> <span className="value">{value}</span>
                    </li>
                );
            } );
        }
    }
} );


/////////////////////
//// Private

function extractBreakdowns( store ) {
    return _.get( store.recipe, 'properties' );
}