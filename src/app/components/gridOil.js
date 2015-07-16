import React from 'react';
import Reflux from 'reflux';
import Griddle from 'griddle-react';
import cx from 'classnames';

import oilsStore from 'stores/oils';

import GriddlePager from 'components/griddlePager';
import Spinner from 'components/spinner';


export default React.createClass( {

    mixins:[
        Reflux.connect( oilsStore, 'oils' )
    ],

    getInitialState() {
        return {
            gridColumns: 'fats-common'
        };
    },

    render() {
        let data = oilsStore.getFlatOilProperties();

        if ( data.length ) {
            return (
                <div className="grid-oil">
                    {this.renderColumnButtons()}
                    <div className="table-responsive">
                        <Griddle
                            results={data}
                            tableClassName="table table-striped table-hover table-bordered table-condensed"
                            columns={ this.getViewColumns() }
                            useGriddleStyles={false}
                            showFilter={true}
                            showSettings={true}
                            initialSort="name"
                            resultsPerPage="150"
                            settingsText="Select Columns"
                            settingsToggleClassName="btn btn-default btn-sm"
                            useCustomPagerComponent="true"
                            customPagerComponent={GriddlePager}
                            />
                    </div>
                </div>
            );
        } else {
            return <Spinner />;
        }
    },

    renderColumnButtons() {
        let fattyClass    = cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'fats-common' } );
        let fattyAllClass = cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'fats-all' } );
        let propClass     =  cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'properties' } );

        return (
            <div className="toolbar">
                <div className="text-right">
                    <button className={propClass} onClick={this.switchViewTo('properties')} ><i className="fa fa-bullseye"></i>Properties</button>
                    <button className={fattyClass} onClick={this.switchViewTo('fats-common')}><i className="fa fa-bars"></i>Fatty Acids - Common</button>
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
        let columns = oilsStore.oilPropertyGroupings();

        return columns[ this.state.gridColumns ];
    }

} );

