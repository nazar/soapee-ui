import _ from 'lodash';
import React from 'react';

import oilsStore from 'stores/oils';
import calculatorStore from 'stores/calculator';

export default React.createClass( {

    shouldComponentUpdate( nextProps ) {
        return !( _.isEqual( this.props, nextProps ) );
    },

    render() {
        let oil = this.props.oil;

        return (
            <div className="properties-oil">

                { oil &&
                    <div className="properties-container">
                        <table className="table table-striped table-condensed table-super-condensed">
                            <tbody>
                            <tr>
                                <td>Sap KOH<br />NaOH</td>
                                <td>{oil.sap}<br />{calculatorStore.sapForNaOh(oil)}</td>
                            </tr>
                            <tr>
                                <td>Iodine</td>
                                <td>{oil.iodine}</td>
                            </tr>
                            <tr>
                                <td>INS</td>
                                <td>{oil.ins}</td>
                            </tr>
                            {this.gap()}
                            {this.renderFats()}
                            {this.gap()}
                            {this.renderProperties()}
                            {this.gap()}
                            {this.renderSaturation()}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    },

    gap() {
        return (
            <tr>
                <td colSpan="2"></td>
            </tr>
        );
    },

    renderFats() {
        let oil = this.props.oil;

        return _.transform( oilsStore.getAllFats(), ( output, fat ) => {
            let breakdown = oil.breakdown[ fat ];

            if ( breakdown ) {
                output.push(
                    <tr>
                        <td>{_.capitalize(fat)}</td>
                        <td>{breakdown}%</td>
                    </tr>
                );
            }
        }, [] );
    },

    renderProperties() {
        let oil = this.props.oil;

        function render( property ) {
            return (
                <tr>
                    <td>{_.capitalize( property )}</td>
                    <td>{oil.properties[ property ]}%</td>
                </tr>
            );
        }

        return _( oil.properties )
            .keys()
            .sort()
            .map( render, this )
            .value();
    },

    renderSaturation() {
        let oil = this.props.oil;

        return _.map( oil.saturations, ( satType, saturation ) => {
            return (
                <tr>
                    <td>{_.capitalize(saturation)}:</td>
                    <td>{satType}%</td>
                </tr>
            );
        } );
    }

} );