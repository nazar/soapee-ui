import _ from 'lodash';
import React from 'react/addons';
import Reflux from 'reflux';

import formRadioHandlers from 'mixins/formLinkHandlers';

import recipeStore from 'stores/recipe';

import ListOilsSelected from 'components/listOilsSelector';
import ListOilsRecipe from 'components/listOilsRecipe';
import PropertiesOil from 'components/propertiesOil';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass( {
    mixins: [
        Reflux.connect( recipeStore, 'recipe' ),
        React.addons.LinkedStateMixin,
        formRadioHandlers
    ],

    getInitialState() {
        return {
            selectedOil: null
        };
    },

    render() {
        return (
            <div className="sap-calculator">
                <div className="page-header">
                    <h1>Soap Lye Calculator
                        <small>Design your own soap</small>
                    </h1>
                </div>

                <div className="row">

                    <div className="col-xs-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">1 - Making <strong>liquid</strong> or <strong>solid</strong> soap?</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="soap-type" value="noah" checkedLink={this.radioStore( recipeStore, 'soapType', 'noah' ) } />
                                            <strong>Solid</strong> Soap - using <strong>NaOH</strong> (Sodium Hydroxide)
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="soap-type" value="koh" checkedLink={ this.radioStore( recipeStore, 'soapType', 'koh' ) }/>
                                            <strong>Liquid</strong> Soap - using <strong>KOH</strong> (Potassium Hydroxide)
                                        </label>
                                    </div>
                                </div>
                                <ReactCSSTransitionGroup  transitionName="fade" transitionAppear={true}>
                                    {this.renderKohPurity()}
                                </ReactCSSTransitionGroup>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">2 - Select Units of Measure</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="radio-inline">
                                        <input type="radio" name="uom" value="percent" checkedLink={this.radioStore( recipeStore, 'uom', 'percent' )} /> Percentages
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="uom"  value="gram" checkedLink={this.radioStore( recipeStore, 'uom', 'gram' )} /> Grams
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="uom"  value="kilo" checkedLink={this.radioStore( recipeStore, 'uom', 'kilo' )} /> Kilograms
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="uom"  value="pound" checkedLink={this.radioStore( recipeStore, 'uom', 'pound' )} /> Pounds
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="uom"  value="ounce" checkedLink={this.radioStore( recipeStore, 'uom', 'ounce' )} /> Ounces
                                    </label>
                                </div>
                            </div>
                        </div>

                        <ReactCSSTransitionGroup  transitionName="fade" >
                            {this.renderTotalSoapWeight()}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>

                <div className="row">

                    <div className="col-xs-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">3 - Water Content</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control short-numeric"
                                               placeholder="%"
                                               valueLink={ this.linkStore( recipeStore, 'waterRatio' ) }
                                            />
                                        <span> water as a percent of oils - recommended values 33% - 38% .</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">4 - Oil super fat</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control short-numeric"
                                               placeholder="%"
                                               valueLink={ this.linkStore( recipeStore, 'superFat' ) }
                                            />
                                        <span> percentage of super fat oils - recommended 5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-xs-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <button onClick={this.addOil} className="pull-right btn btn-xs btn-default"><i className="fa fa-plus-circle"></i></button>
                                <button onClick={this.lookupOils} className="pull-right btn btn-xs btn-default"><i className="fa fa-search-plus"></i></button>
                                <h3 className="panel-title">5 - Select Oils</h3>
                            </div>
                            <div className="panel-body">
                                <ListOilsSelected
                                    onSelectedOil={this.selectedOil}
                                    onAddedOil={this.addOil}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <button onClick={this.addOil} className="pull-right btn btn-xs btn-default"><i className="fa fa-plus-circle"></i></button>
                                <h3 className="panel-title">Oil Properties</h3>
                            </div>
                            <div className="panel-body">
                                <PropertiesOil
                                    oil={ this.state.selectedOil }
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-5">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Recipe Oils</h3>
                            </div>
                            <div className="panel-body">
                                <div className="recipe-oils-container">
                                    <ListOilsRecipe
                                        uom={this.state.recipe.uom}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Recipe</h3>
                            </div>
                            <div className="panel-body">

                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Recipe Properties</h3>
                            </div>
                            <div className="panel-body">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    },

    renderKohPurity() {
        if ( this.isKoh() ) {
            return (
                <div key="kohPurity" className="form-inline">
                    <div className="form-group">
                        <input type="text" id="inputHelpBlock" className="form-control short-numeric" valueLink={this.linkStore(recipeStore, 'kohPurity')}  /> %
                        <span id="helpBlock">KOH Purity - recommended 90%</span>
                    </div>
                </div>
            );
        }
    },

    renderTotalSoapWeight() {
        if ( this.percentMode() ) {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">2.1 - Total Soap Weight</h3>
                    </div>
                    <div className="panel-body">
                        <div className="form-inline">
                            <div className="form-group">
                                <input type="text" className="form-control short-numeric" valueLink={ this.linkStore( recipeStore, 'totalWeight' ) } />&nbsp;&nbsp;&nbsp;
                                <label className="radio-inline">
                                    <input type="radio" name="total-uom"  value="gram" checkedLink={this.radioStore( recipeStore, 'totalUom', 'gram' )} /> Grams
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="total-uom"  value="kilo" checkedLink={this.radioStore( recipeStore, 'totalUom', 'kilo' )} /> Kilograms
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="total-uom"  value="pound" checkedLink={this.radioStore( recipeStore, 'totalUom', 'pound' )} /> Pounds
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="total-uom"  value="ounce" checkedLink={this.radioStore( recipeStore, 'totalUom', 'ounce' )} /> Ounces
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    },

    lookupOils( e ) {

    },

    addOil( e, oil ) {
        let oilToAdd;

        oilToAdd = this.state.selectedOil || _.isObject( oil ) && oil;

        if ( oilToAdd ) {
            recipeStore.addOil( oilToAdd );
        }
    },

    selectedOil( oil ) {
        this.setState( {
            selectedOil: oil
        } );
    },

    percentMode() {
        return this.state.recipe.uom === 'percent';
    },

    isKoh() {
        return this.state.recipe.soapType === 'koh';
    },

    disable(e) {
        e.preventDefault();
    }

} );