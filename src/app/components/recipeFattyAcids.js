import _ from 'lodash';
import React from 'react';

export default React.createClass( {

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
        let breakdowns = this.props.recipe.getModelValue( 'summary.breakdowns' );

        return _( breakdowns )
            .keys()
            .sort()
            .map( fattyAcid => {
                let value = _.round( breakdowns[ fattyAcid ] );

                if (  value ) {
                    return (
                        <tr key={ `fatty-acid-prop-${ fattyAcid }` }>
                            <td>{_.capitalize( fattyAcid )}</td>
                            <td>{value}</td>
                        </tr>
                    );
                }
            } )
            .compact()
            .value();
    }

} );