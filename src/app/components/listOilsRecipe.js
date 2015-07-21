import _ from 'lodash';
import React from 'react/addons';
import Reflux from 'reflux';

import calculatorStore from 'stores/calculator';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass( {

    mixins: [
        Reflux.connect( calculatorStore, 'recipe' )
    ],

    render() {
        return (
            <div className="list-oils-recipe">
                <table className="recipe-oils form-inline table table-striped table-condensed table-super-condensed">
                    <ReactCSSTransitionGroup  transitionName="fade" component="tbody" >
                        { _.map( this.state.recipe.getRecipeValue( 'oils' ), this.renderOil )}
                        { this.renderTotalsRow() }
                    </ReactCSSTransitionGroup>
                </table>
                <div className="messages">
                    { this.renderCompletionMessages() }
                </div>
            </div>
        );
    },

    renderOil( oil ) {
        let oilWeight;
        let placeholder;
        let uomCaption;

        oilWeight   = this.state.recipe.getOilWeight( oil );
        placeholder = oilWeight ? '' : this.getPlaceholder();
        uomCaption  = oilWeight ? this.getPlaceholder() : '';

        return (
            <tr key={`recipe-oil-${oil.id}`}>
                <td className="oil-name">
                    {oil.name}
                </td>
                <td className="value">
                    <input type="text"
                           className="form-control short-numeric"
                           placeholder={ placeholder }
                           value={ oilWeight }
                           onChange={ this.changed( oil ) }
                        />
                    <span className="unit">{ uomCaption }</span>
                </td>
                <td>
                    <button className="btn btn-danger btn-xxs"
                            onClick={this.removeOilFromRecipe( oil )}>
                        <i className="fa fa-times"></i>
                    </button>
                </td>
            </tr>
        );
    },

    renderTotalsRow() {
        return (
            <tr key={`recipe-oil-totals`}>
                <td></td>
                <td>
                    <strong>
                        { this.state.recipe.sumWeights() }
                        { this.getPlaceholder() }
                    </strong>
                </td>
                <td></td>
            </tr>
        );
    },

    renderCompletionMessages() {
        if ( this.state.recipe.isPercentRecipe() ) {
            if ( this.state.recipe.sumWeights() !== 100 ) {
                return (
                    <div className="alert alert-warning" role="alert">
                        Total oils % should be 100%.
                    </div>
                );
            }
        } else if (  !( this.state.recipe.sumWeights() > 0 )  ) {
            return (
                <div className="alert alert-warning" role="alert">
                    Total oil weights should be greater than 0.
                </div>
            );
        }
    },

    changed( oil ) {
        return e => {
            this.state.recipe.setOilWeight( oil, e.target.value );  //TODO should be an action?
        };
    },

    getPlaceholder() {
        return {
            percent: '%',
            gram: 'g',
            kilo: 'kg',
            pound: 'p',
            ounce: 'oz'
        }[ this.props.uom ];
    },

    removeOilFromRecipe( oil ) {
        return () => {
            this.state.recipe.removeOil( oil ); //TODO should be an action?
        };
    }

} );