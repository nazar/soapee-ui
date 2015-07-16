import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import Griddle from 'griddle-react';
import cx from 'classnames';

import oilsStore from 'stores/oils';

export default React.createClass({

    mixins:[
        Reflux.connect( oilsStore, 'oils' )
    ],

    getInitialState() {
        return {
            gridColumns: 'fats'
        };
    },

    render() {
        return (
            <div className="select-oils">
                <div className="modal-body">
                    <div className="grid-oil">
                        {this.renderColumnButtons()}
                        <div className="table-responsive">
                            <Griddle
                                results={this.oilsForGrid()}
                                tableClassName="table table-striped table-hover table-bordered table-condensed"
                                columns={ this.getViewColumns() }
                                useGriddleStyles={false}
                                showFilter={true}
                                showSettings={true}
                                initialSort="name"
                                resultsPerPage="150"
                                settingsText="Select Columns"
                                settingsToggleClassName="btn btn-default btn-sm"
                                />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Cancel</button>
                    <button type="button" className="btn btn-primary">Add Oils</button>
                </div>
            </div>
        );
    },

    renderColumnButtons() {
        let fattyClass    = cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'fats' } );
        let fattyAllClass = cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'fats-all' } );
        let propClass     =  cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'properties' } );

        return (
            <div className="toolbar">
                <div className="text-right">
                    <button className={propClass} onClick={this.switchViewTo('properties')} ><i className="fa fa-bullseye"></i>Properties</button>
                    <button className={fattyClass} onClick={this.switchViewTo('fats')}><i className="fa fa-bars"></i>Fatty Acids - Common</button>
                    <button className={fattyAllClass} onClick={this.switchViewTo('fats-all')}><i className="fa fa-bars"></i>Fatty Acids - All</button>
                </div>
            </div>
        );
    },

    switchViewTo( view ) {
        return () => {
            this.setState( {
                gridColumns: view
            } );
        };
    },

    getViewColumns() {
        let columns = {
            simply: [ 'selected', 'name', 'sap' ],
            fats: [ 'selected', 'name', 'sap', 'lauric', 'linoleic', 'linolenic', 'myristic', 'oleic', 'palmitic', 'ricinoleic', 'stearic'  ],
            'fats-all': [ 'selected', 'name', 'sap', 'capric', 'caprylic', 'docosadienoic', 'docosenoid', 'eicosenoic', 'erucic', 'lauric', 'linoleic', 'linolenic', 'myristic', 'oleic', 'palmitic', 'ricinoleic', 'stearic' ],
            properties: [ 'selected', 'name', 'sap', 'bubbly', 'cleansing', 'condition', 'hardness', 'stability' ]
        };

        return columns[ this.state.gridColumns ];
    },

    oilsForGrid() {
        return _.map( this.state.oils, oil => {
            return {
                selected: false, //todo selected true for current selected oils
                name: oil.name,
                sap: oil.sap,
                iodine: oil.iodione,
                ins: oil.ins,

                bubbly: oil.properties.bubbly,
                cleansing: oil.properties.cleansing,
                condition: oil.properties.condition,
                hardness: oil.properties.hardness,
                stability: oil.properties.stable,

                capric: oil.breakdown.capric || 0,
                caprylic: oil.breakdown.caprylic || 0,
                docosadienoic: oil.breakdown.docosadienoic || 0,
                docosenoid: oil.breakdown.docosenoid || 0,
                eicosenoic: oil.breakdown.eicosenoic || 0,
                erucic: oil.breakdown.erucic || 0,
                lauric: oil.breakdown.lauric || 0,
                linoleic: oil.breakdown.linoleic || 0,
                linolenic: oil.breakdown.linolenic || 0,
                myristic: oil.breakdown.myristic || 0,
                oleic: oil.breakdown.oleic || 0,
                palmitic: oil.breakdown.palmitic || 0,
                ricinoleic: oil.breakdown.ricinoleic || 0,
                stearic: oil.breakdown.stearic || 0
            };
        } );
    }


});



