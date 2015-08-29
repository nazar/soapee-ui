import _ from 'lodash';
import React from 'react/addons';

import formLinkHandlers from 'mixins/formLinkHandlers';

import ListOilsSelector from 'components/listOilsSelector';
import ListOilsRecipe from 'components/listOilsRecipe';
import PropertiesOil from 'components/propertiesOil';
import RecipeBreakdown from 'components/recipeBreakdown';
import RecipeFattyAcids from 'components/recipeFattyAcids';
import RecipeProperties from 'components/recipeProperties';
import RecipeTotals from 'components/recipeTotals';
import TooltipQuestion from 'components/tooltipQuestion';

import BootstrapModalLink from 'components/bootstrapModalLink';
import SelectOils from 'modals/selectOils';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass( {
    mixins: [
        React.addons.LinkedStateMixin,
        formLinkHandlers
    ],

    getInitialState() {
        return {
            selectedOil: null
        };
    },

    componentDidMount() {
        SelectOils.setRecipeModel( this.props.recipe );
    },

    render() {
        return (
            <div className="sap-calculator">
                <div className="row">

                    <div className="col-md-6 col-sm-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong>1 - Liquid</strong> or <strong>Solid</strong> soap recipe?</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="soap-type" value="naoh" checkedLink={this.radioModel( this.props.recipe, 'soapType', 'naoh' ) } />
                                            <strong>Solid</strong> Soap - using <strong>NaOH</strong> (Sodium Hydroxide)
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="soap-type" value="koh" checkedLink={ this.radioModel( this.props.recipe, 'soapType', 'koh' ) }/>
                                            <strong>Liquid</strong> Soap - using <strong>KOH</strong> (Potassium Hydroxide)
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="soap-type" value="mixed" checkedLink={ this.radioModel( this.props.recipe, 'soapType', 'mixed' ) }/>
                                            <strong>Hybrid</strong> Soap - using both <strong>KOH</strong> and <strong>NaOH</strong>
                                        </label>
                                    </div>
                                </div>
                                <ReactCSSTransitionGroup  transitionName="fade" transitionAppear={true}>
                                    { this.renderKohPurity() }
                                    { this.renderMixedRatios() }
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
                                        <input type="radio" name="uom" value="percent" checkedLink={this.radioModel( this.props.recipe, 'uom', 'percent' )} /> Percentages
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="uom"  value="gram" checkedLink={this.radioModel( this.props.recipe, 'uom', 'gram' )} /> Grams
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="uom"  value="kilo" checkedLink={this.radioModel( this.props.recipe, 'uom', 'kilo' )} /> Kilograms
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="uom"  value="pound" checkedLink={this.radioModel( this.props.recipe, 'uom', 'pound' )} /> Pounds
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="uom"  value="ounce" checkedLink={this.radioModel( this.props.recipe, 'uom', 'ounce' )} /> Ounces
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
                                        <label className="radio">
                                            <input type="radio" name="lyeCalcType" value="ratio" checkedLink={this.radioModel( this.props.recipe, 'lyeCalcType', 'ratio' )} />
                                            <input type="text"
                                                   className="form-control compact-numeric"
                                                   placeholder="%"
                                                   valueLink={ this.linkModel( this.props.recipe, 'waterRatio' ) }
                                                />
                                            <span> % Water as a percent of oils - recommended 33%-38%</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label className="radio">
                                            <input type="radio" name="lyeCalcType" value="concentration" checkedLink={this.radioModel( this.props.recipe, 'lyeCalcType', 'concentration' )} />
                                            <input type="text"
                                                   className="form-control compact-numeric"
                                                   placeholder="%"
                                                   valueLink={ this.linkModel( this.props.recipe, 'recipeLyeConcentration' ) }
                                                />
                                            <span> % Lye Concentration</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label className="radio">
                                            <input type="radio" name="lyeCalcType" value="concentration" checkedLink={this.radioModel( this.props.recipe, 'lyeCalcType', 'lyewater' )} />
                                            <input type="text"
                                                   className="form-control super-short-numeric"
                                                   placeholder="water"
                                                   valueLink={ this.linkModel( this.props.recipe, 'lyeWaterWaterRatio' ) }
                                                />
                                            &nbsp;<strong> : </strong>&nbsp;
                                            <input type="text"
                                                   className="form-control super-short-numeric"
                                                   placeholder="lye"
                                                   valueLink={ this.linkModel( this.props.recipe, 'lyeWaterLyeRatio' ) }
                                                />
                                            <span> Water : Lye Ratio</span>
                                        </label>
                                    </div>
                                </div>
                                <br/>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label className="radio">
                                            <input type="text"
                                                   className="form-control compact-numeric"
                                                   placeholder="%"
                                                   valueLink={ this.linkModel( this.props.recipe, 'waterDiscount' ) }
                                                />
                                            <span> % Water Discount</span>
                                        </label>
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
                                               className="form-control compact-numeric"
                                               placeholder="%"
                                               valueLink={ this.linkModel( this.props.recipe, 'superFat' ) }
                                            />
                                        <span> % superfat of oils - recommended 5%</span>
                                    </div>
                                </div>
                                <div className="form-inline superfat-after">
                                    <div className="form-group">
                                        <label className="radio-inline">
                                            <input type="checkbox" name="superfar-after"  checkedLink={this.checkboxModel( this.props.recipe, 'superfatAfter', true )} /> Superfat after cook
                                        </label>
                                        <TooltipQuestion
                                            placement="top"
                                            >
                                            The recipe will be calculated with 0% superfat but will show the <strong>Frgrance Oil Weight</strong> to add to the recipe after cooking.
                                        </TooltipQuestion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">5 - Fragrances</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label className="radio">
                                            <input type="radio" name="fragranceType" value="ratio" checkedLink={this.radioModel( this.props.recipe, 'fragranceType', 'ratio' )} />
                                            <input type="text"
                                                   className="form-control compact-numeric"
                                                   placeholder="%"
                                                   valueLink={ this.linkModel( this.props.recipe, 'fragrance' ) }
                                                />
                                            <span> % oil weight - recommended 3%</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label className="radio">
                                            <input type="radio" name="fragranceType" value="ppo" checkedLink={this.radioModel( this.props.recipe, 'fragranceType', 'ppo' )} />
                                            <input type="text"
                                                   className="form-control compact-numeric"
                                                   placeholder={ this.smallUomFragrance() }
                                                   valueLink={ this.linkModel( this.props.recipe, 'fragrancePpo', { round: 2 } ) }
                                                />
                                            <span> { this.smallUomFragrance() }/{ this.largeUomFragrance() } </span>
                                        </label>
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
                                <h3 className="panel-title">6 - Select Oils</h3>
                            </div>
                            <ListOilsSelector
                                onSelectedOil={this.selectedOil}
                                onAddedOil={this.addOil}
                                />
                        </div>
                    </div>

                    <ReactCSSTransitionGroup  transitionName="zoom" >
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

                    <ReactCSSTransitionGroup  transitionName="zoom" >
                        { this.props.recipe.countOils() > 0 &&
                        <div className="col-md-5 col-sm-12">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Recipe Oils</h3>
                                </div>
                                <div className="recipe-oils-container">
                                    <ListOilsRecipe
                                        recipe={ this.props.recipe }
                                        />
                                </div>
                            </div>
                        </div>
                        }
                    </ReactCSSTransitionGroup>

                </div>

                <ReactCSSTransitionGroup  transitionName="zoom" >
                    { this.props.recipe.countWeights() > 0 &&
                    <div>
                        <legend>Recipe</legend>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="panel panel-success">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Recipe Oils</h3>
                                    </div>
                                    <RecipeBreakdown
                                        recipe={ this.props.recipe }
                                        />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="panel panel-success">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Recipe Totals</h3>
                                    </div>
                                    <RecipeTotals
                                        recipe={ this.props.recipe }
                                        />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="panel panel-success">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Recipe Properties</h3>
                                    </div>
                                    <RecipeProperties
                                        recipe={ this.props.recipe }
                                        withRange={true}
                                        />
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="panel panel-success">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Fatty Acids %</h3>
                                    </div>
                                    <RecipeFattyAcids
                                        recipe={ this.props.recipe }
                                        />
                                </div>
                            </div>
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
                        <input type="text" id="inputHelpBlock" className="form-control short-numeric" valueLink={this.linkModel(this.props.recipe, 'kohPurity')}  /> %
                        <span id="helpBlock">KOH Purity - recommended 90%</span>
                    </div>
                </div>
            );
        }
    },

    renderMixedRatios() {
        if ( this.isMixed() ) {
            return (
                <div key="mixedFields" id="mixed-fields" className="form-inline">
                    <div>
                        <div className="form-group">
                            <input type="text" className="form-control short-numeric" valueLink={this.linkModel(this.props.recipe, 'ratioKoh')}  /> %
                            <span> KOH</span>
                        </div>
                        <div className="form-group left-spacer">
                            <input type="text" className="form-control short-numeric" valueLink={this.linkModel(this.props.recipe, 'ratioNaoh')}  /> %
                            <span> NaOH</span>
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                            <input type="text" className="form-control short-numeric" valueLink={this.linkModel(this.props.recipe, 'kohPurity')}  /> %
                            <span> KOH Purity - recommended 90%</span>
                        </div>
                    </div>
                    { this.props.recipe.mixedTotalRatios() > 100 &&
                        <div className="alert alert-danger text-center animate bounceIn" role="alert">
                            Lye ratios are over 100%
                        </div>
                    }
                    { this.props.recipe.mixedTotalRatios() < 100 &&
                        <div className="alert alert-warning text-center animate bounceIn" role="alert">
                            Lye ratios should total 100%
                        </div>
                    }
                </div>
            );
        }
    },

    renderTotalSoapWeight() {
        if ( this.percentMode() ) {
            return (
                <div>
                    <div className="form-inline">
                        <div className="form-group">
                            <label>Oils total:</label>&nbsp;
                            <input type="text" className="form-control short-numeric" valueLink={ this.linkModel( this.props.recipe, 'totalWeight', { round: this.props.recipe.roundPlaces() + 1 } ) } />&nbsp;&nbsp;&nbsp;
                            <label className="radio-inline">
                                <input type="radio" name="total-uom"  value="gram" checkedLink={this.radioModel( this.props.recipe, 'totalUom', 'gram' )} /> Grams
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="total-uom"  value="kilo" checkedLink={this.radioModel( this.props.recipe, 'totalUom', 'kilo' )} /> Kilograms
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="total-uom"  value="pound" checkedLink={this.radioModel( this.props.recipe, 'totalUom', 'pound' )} /> Pounds
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="total-uom"  value="ounce" checkedLink={this.radioModel( this.props.recipe, 'totalUom', 'ounce' )} /> Ounces
                            </label>
                        </div>

                    </div>
                    <div className="form-inline weights-water">
                        <div className="form-group">
                            <label className="radio-inline">
                                <input type="checkbox" name="totals-include-water"  checkedLink={this.checkboxModel( this.props.recipe, 'totalsIncludeWater', true )} /> Adjust oil weights to include water in Oils total
                            </label>
                            <TooltipQuestion
                                placement="top"
                                >
                                Less oil will be used as the lye calculator will adjust total oil weights to include water weight.
                            </TooltipQuestion>
                        </div>
                    </div>
                </div>
            );
        }
    },

    addOil( e, oil ) {
        let oilToAdd;

        oilToAdd = this.state.selectedOil || _.isObject( oil ) && oil;

        if ( oilToAdd ) {
            this.props.recipe.addOil( oilToAdd );
        }
    },

    selectedOil( oil ) {
        this.setState( {
            selectedOil: oil
        } );
    },

    percentMode() {
        return this.props.recipe.isPercentRecipe();
    },

    isKoh() {
        return this.props.recipe.isKohRecipe();
    },

    isMixed() {
        return this.props.recipe.isMixedRecipe();
    },

    smallUomFragrance() {
        return {
            gram: 'g',
            kilo: 'g',
            pound: 'oz',
            ounce: 'oz'
        }[ this.props.recipe.uomToUse() ];
    },

    largeUomFragrance() {
        return {
            gram: 'kg',
            kilo: 'kg',
            pound: 'lb',
            ounce: 'lb'
        }[ this.props.recipe.uomToUse() ];
    }

} );