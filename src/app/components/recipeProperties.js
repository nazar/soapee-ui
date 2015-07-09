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
                <table className="table table-striped table-condensed table-super-condensed">
                    <tbody>
                        { this.renderOrderedBreakdowns() }
                        <tr>
                            <td colSpan="2"></td>
                        </tr>
                        { this.renderNonProperties() }
                    </tbody>
                </table>

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
                    <tr>
                        <td>{_.capitalize( property )}</td>
                        <td>{value}</td>
                    </tr>
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
                    <tr>
                        <td>{_.capitalize( property )}: </td>
                        <td>{value}</td>
                    </tr>
                );
            } );
        }
    }
} );


/////////////////////
//// Private

function extractBreakdowns( store ) {
    return _.get( store.summary, 'properties' );
}