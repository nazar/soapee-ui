import _ from 'lodash';
import React from 'react/addons';
import Reflux from 'reflux';
import { Navigation } from 'react-router';

import formLinkHandlers from 'mixins/formLinkHandlers';

import recipeStore from 'stores/recipe';
import recipeActions from 'actions/recipe';

import FormSaveRecipe from 'components/formSaveRecipe';
import ListOilsSelector from 'components/listOilsSelector';
import ListOilsRecipe from 'components/listOilsRecipe';
import PropertiesOil from 'components/propertiesOil';
import RecipeBreakdown from 'components/recipeBreakdown';
import RecipeFattyAcids from 'components/recipeFattyAcids';
import RecipeProperties from 'components/recipeProperties';
import RecipeTotals from 'components/recipeTotals';

import BootstrapModalLink from 'components/bootstrapModalLink';
import SelectOils from 'modals/selectOils';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass( {
    mixins: [
        Reflux.connect( recipeStore, 'recipe' ),
        React.addons.LinkedStateMixin,
        formLinkHandlers,
        Navigation
    ],

    getInitialState() {
        return {
            selectedOil: null
        };
    },

    render() {
        return (
            <div className="sap-calculator">
                <div className="row">

                    <div className="col-md-6 col-sm-12">
                        <div className="panel panel-primary">
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

                    <div className="col-md-6 col-sm-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">2 - Select recipe units of measure</h3>
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

                                <ReactCSSTransitionGroup  transitionName="fade" >
                                    {this.renderTotalSoapWeight()}
                                </ReactCSSTransitionGroup>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6 col-sm-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">3 - Amount of water in recipe</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control short-numeric"
                                               placeholder="%"
                                               valueLink={ this.linkStore( recipeStore, 'waterRatio' ) }
                                            />
                                        <span> % water as a percent of oils - recommended 33%-38% for solid soaps</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">4 - Oil superfat</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control short-numeric"
                                               placeholder="%"
                                               valueLink={ this.linkStore( recipeStore, 'superFat' ) }
                                            />
                                        <span> % of superfat of oils - recommended 5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-4 col-sm-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="btn-toolbar pull-right">
                                    <button onClick={this.addOil} className="pull-right btn btn-xs btn-default"><i className="fa fa-plus-circle"></i></button>
                                    <BootstrapModalLink
                                        elementToClick={<button className="btn btn-xs btn-default"><i className="fa fa-search-plus"></i></button>}
                                        modal={SelectOils}
                                        large={true}
                                        title="Select Recipe Oils"
                                        />
                                </div>
                                <h3 className="panel-title">5 - Select Oils</h3>
                            </div>
                            <ListOilsSelector
                                onSelectedOil={this.selectedOil}
                                onAddedOil={this.addOil}
                                />
                        </div>
                    </div>

                    <ReactCSSTransitionGroup  transitionName="fade" >
                        { this.state.selectedOil &&
                        <div className="col-md-3 col-sm-6">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <div className="btn-toolbar pull-right">
                                        <button onClick={this.addOil} className="pull-right btn btn-xs btn-default"><i className="fa fa-plus-circle"></i></button>
                                    </div>
                                    <h3 className="panel-title">Selected Oil Properties</h3>
                                </div>
                                <PropertiesOil
                                    oil={ this.state.selectedOil }
                                    />
                            </div>
                        </div>
                        }
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup  transitionName="fade" >
                        { recipeStore.countOils() > 0 &&
                        <div className="col-md-5 col-sm-12">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Recipe Oils</h3>
                                </div>
                                <div className="recipe-oils-container">
                                    <ListOilsRecipe
                                        uom={this.state.recipe.uom}
                                        />
                                </div>
                            </div>
                        </div>
                        }
                    </ReactCSSTransitionGroup>

                </div>

                <ReactCSSTransitionGroup  transitionName="fade" >
                    { recipeStore.countWeights() > 0 &&
                    <div>
                        <legend>Recipe</legend>
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="panel panel-success">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Recipe Oils</h3>
                                    </div>
                                    <RecipeBreakdown />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="panel panel-success">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Recipe Totals</h3>
                                    </div>
                                    <RecipeTotals />
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <div className="panel panel-success">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Fatty Acids</h3>
                                    </div>
                                    <RecipeFattyAcids/>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <div className="panel panel-success">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Recipe Properties</h3>
                                    </div>
                                    <RecipeProperties/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <FormSaveRecipe
                                onSave={this.saveRecipe}
                                onPrint={this.printRecipe}
                                />
                        </div>
                    </div>
                    }
                </ReactCSSTransitionGroup>
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
            );
        }
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

    saveRecipe() {
        recipeActions.createRecipe( this.state.recipe );
    },

    printRecipe() {
        //todo save recipe to localstorage to guard against F5s
        this.replaceWith( 'print' );
    }

} );