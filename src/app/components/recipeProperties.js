import _ from 'lodash';
import React from 'react';

export default React.createClass( {

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
        let properties = this.props.recipe.getModelValue( 'summary.properties' );

        return _( properties )
            .keys()
            .sort()
            .filter( property => { return !( _.contains( [ 'ins', 'iodine' ], property ) ); } )
            .map( property => {
                let value = _.round( properties[ property ] );
                return (
                    <tr>
                        <td>{_.capitalize( property )}</td>
                        <td>{value}%</td>
                    </tr>
                );
            } )
            .value();
    },

    renderNonProperties() {
        let properties = this.props.recipe.getModelValue( 'summary.properties' );

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