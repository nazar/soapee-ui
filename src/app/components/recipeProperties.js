import _ from 'lodash';
import React from 'react';

import TooltipQuestion from 'components/tooltipQuestion';

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
                        <td className="property-cell">
                            {_.capitalize( property )}
                            {this.props.showTooltips &&
                            <TooltipQuestion
                                placement="top"
                            >
                                {this.tooltipsForProperty(property)}
                            </TooltipQuestion>
                            }
                        </td>
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
                        <td>{_.capitalize( property )}</td>
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
    },

    tooltipsForProperty( property ) {
        return {
            bubbly: 'This is a measure of how much loose, fluffy lather is produced. A "bubbly" lather is produced quickly by a soap, but doesn\'t last long',
            cleansing: 'It is a measure of how water soluble the soap is -- meaning it is a measure of how easily the soap dissolves in difficult situations such as hard water, cold water, or salt water. The Cleansing number does NOT tell you whether the soap will actually get your skin clean.',
            condition: 'The conditioning value is a measure of the soap\'s ability to soften and soothe the skin. The "anti tight-and-dry" property, so to speak.',
            hardness: 'The Hardness number is a measure of the physical hardness-like-a-rock. It tells you how relatively easy it will be to unmold a particular soap after saponification. It does NOT necessarily tell you how long-lived the soap will be.',
            longevity: 'It is a guideline for how long you soap will last. The higher the number the longer lasting the soap. Too low and the soap doesn\'t last sufficiently long in the shower. Too high and the soap doesn\'t lather as well.',
            stable: 'How long the lather will stay fluffy with big bubbles'
        }[ property ];
    }
} );