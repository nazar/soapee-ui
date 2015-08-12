import _ from 'lodash';
import React from 'react';

export default React.createClass( {

    getDefaultProps() {
        return {
            withRange: false
        };
    },

    render() {
        return (
            <div className="recipe-fatty-acids">
                <table className="table table-striped table-condensed table-super-condensed">
                    <thead>
                    <tr>
                        <th>Property</th>
                        <th>%</th>
                        { this.props.withRange && <th width="1%">Recommended</th> }
                    </tr>
                    </thead>
                    <tbody>
                        { this.renderOrderedBreakdowns() }
                        <tr>
                            <td colSpan="3"></td>
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
                    <tr key={ `recipe-oil-prop-${ property }` }>
                        <td>{_.capitalize( property )}</td>
                        <td>{value}</td>
                        { this.props.withRange && <td style={ {textAlign: 'center'} }>{ this.rangesForProperty( property ) }</td> }
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
                    <tr key={ `non-prop-${ property }` }>
                        <td>{_.capitalize( property )}: </td>
                        <td>{value}</td>
                        { this.props.withRange && <td style={ {textAlign: 'center'} }>{ this.rangesForProperty( property ) }</td> }
                    </tr>
                );
            } );
        }
    },

    rangesForProperty( property ) {
        return {
            bubbly: '14 - 46',
            cleansing: '12 - 22',
            condition: '44 - 69',
            hardness: '29 - 54',
            longevity: '25 - 50',
            stable: '16 - 48',
            iodine: '41 - 70',
            ins: '136 - 165'
        }[ property ];
    }
} );