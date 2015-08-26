import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import Griddle from 'griddle-react';
import cx from 'classnames';
import ga from 'react-ga';

import oilsStore from 'stores/oils';

import GriddlePager from 'components/griddlePager';
import Spinner from 'components/spinner';

let recipeOilIds = [];

let SelectedComponent = React.createClass( {

    getInitialState() {
        return {
            checked: _.contains( recipeOilIds, this.props.rowData.id )
        };
    },

    render() {
        return (
            <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.handleChange}
                />
        );
    },

    handleChange() {
        if ( this.state.checked ) {
            recipeOilIds = _.without( recipeOilIds, this.props.rowData.id );
        } else {
            recipeOilIds.push( this.props.rowData.id );
        }

        this.setState( {
            checked: !(this.state.checked)
        } );
    }
} );

let SelectOilsModal =  React.createClass( {

    statics: {
        setRecipeModel( recipe ) {
            this.recipe = recipe;
        }
    },

    mixins: [
        Reflux.connect( oilsStore, 'oils' )
    ],

    getInitialState() {
        return {
            gridColumns: 'fats-common'
        };
    },

    componentWillMount() {
        recipeOilIds = _.pluck( SelectOilsModal.recipe.getModelValue( 'oils' ), 'id' );
    },

    componentDidMount() {
        ga.modalview( 'select-oils' );
    },

    render() {
        let data = oilsStore.getFlatOilProperties();

        if ( data.length ) {
            return (
                <div className="select-oils">
                    <div className="modal-body">
                        <div className="grid-oil">
                            {this.renderColumnButtons()}
                            <div className="table-responsive">
                                <Griddle
                                    results={data}
                                    tableClassName="table table-striped table-hover table-bordered table-condensed"
                                    columns={ this.getViewColumns() }
                                    columnMetadata={ this.defineSelectedMetadata() }
                                    useGriddleStyles={false}
                                    showFilter={true}
                                    showSettings={true}
                                    initialSort="name"
                                    resultsPerPage="13"
                                    settingsText="Select Columns"
                                    settingsToggleClassName="btn btn-default btn-sm"
                                    useCustomPagerComponent="true"
                                    customPagerComponent={GriddlePager}
                                    isMultipleSelection={true}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={this.save}>Add Oils</button>
                    </div>
                </div>
            );
        } else {
            return <Spinner />;
        }
    },

    save() {
        SelectOilsModal.recipe.setRecipeOilsByIds( recipeOilIds );
        this.props.closeModal();
    },

    renderColumnButtons() {
        let fattyClass = cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'fats-common' } );
        let fattyAllClass = cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'fats-all' } );
        let propClass = cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'properties' } );
        let saturationClass     =  cx( 'btn btn-default btn-sm', { active: this.state.gridColumns === 'saturation' } );

        return (
            <div className="toolbar">
                <div className="text-right">
                    <button className={propClass} onClick={this.switchViewTo('properties')}><i className="fa fa-bullseye"></i>Properties</button>
                    <button className={saturationClass} onClick={this.switchViewTo('saturation')}><i className="fa fa-tint"></i>Saturates</button>
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

        _.each( columns, ( groupProperties ) => {
            groupProperties.unshift( 'selected' );
        } );

        return columns[ this.state.gridColumns ];
    },

    defineSelectedMetadata() {
        return [
            {
                columnName: 'selected',
                cssClassName: 'selected',
                visible: false,
                displayName: '',
                customComponent: SelectedComponent
            },
            {
                columnName: 'monoSaturated',
                displayName: 'mono-unsaturated %'
            },
            {
                columnName: 'polySaturated',
                displayName: 'poly-unsaturated %'
            }
        ];
    }

} );

export default SelectOilsModal;



