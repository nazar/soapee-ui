import _ from 'lodash';
import React from 'react';

import oilsStore from 'stores/oils';

export default React.createClass( {

    render() {
        let oil = this.props.oil;

        return (
            <div className="properties-oil">

                { oil &&
                    <div className="properties-container">
                        <div className="name"><strong>{oil.name}</strong></div>
                        <div className="basic">
                            <ul className="list-unstyled">
                                <li><span className="title">SAP KOH / NaOH:</span> <span className="value">{oil.sap} / {oilsStore.sapForNaOh(oil)}</span> </li>
                                <li><span className="title">Iodine:</span> <span className="value">{oil.iodine}</span> </li>
                                <li><span className="title">INS:</span> <span className="value">{oil.ins}</span> </li>
                            </ul>
                        </div>
                        <div className="fats">
                            <ul className="list-unstyled">
                                {this.renderFats()}
                            </ul>
                        </div>
                        <div className="properties">
                            <ul className="list-unstyled">
                                {this.renderProperties()}
                            </ul>
                        </div>
                        <div className="saturation">
                            <ul className="list-unstyled">
                                {this.renderSaturation()}
                            </ul>
                        </div>

                    </div>
                }
            </div>
        );
    },

    renderFats() {
        let oil = this.props.oil;

        return _.transform( oilsStore.getAllFats(), ( output, fat ) => {
            let breakdown = oil.breakdown[ fat ];

            if ( breakdown ) {
                output.push( <li> <span className="title">{_.capitalize(fat)}:</span> <span className="value">{breakdown}</span> </li> );
            }
        }, [] );
    },

    renderProperties() {
        let oil = this.props.oil;

        function render( property ) {
            return (
                <li><span className="title">{_.capitalize( property )}:</span> <span className="value"> {oil.properties[ property ]} </span></li>
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

        return _.map( oil.saturation, ( satType, saturation ) => {
            return (
                <li> <span className="title">{_.capitalize(saturation)}:</span> <span className="value">{satType}</span> </li>
            );
        } );
    }

} );