import _ from 'lodash';
import React from 'react/addons';
import Reflux from 'reflux';

import recipeStore from 'stores/recipe';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass( {

    mixins: [
        Reflux.connect( recipeStore, 'recipe' )
    ],

    render() {
        return (
            <div className="list-oils-recipe">
                <table className="recipe-oils form-inline table table-striped table-condensed table-super-condensed">
                    <ReactCSSTransitionGroup  transitionName="fade" component="tbody" >
                        { _.map( this.state.recipe.oils, this.renderOil )}
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

        oilWeight   =  recipeStore.getOilWeight( oil );
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
                        { recipeStore.sumWeights() }
                        { this.getPlaceholder() }
                    </strong>
                </td>
                <td></td>
            </tr>
        );
    },

    renderCompletionMessages() {
        if ( recipeStore.isPercentRecipe() ) {
            if ( recipeStore.sumWeights() !== 100 ) {
                return (
                    <div className="alert alert-danger" role="alert">
                        Total oils % should be 100%.
                    </div>
                );
            }
        } else if (  !( recipeStore.sumWeights() > 0 )  ) {
            return (
                <div className="alert alert-danger" role="alert">
                    Total oil weights should be greater than 0.
                </div>
            );
        }
    },

    changed( oil ) {
        return e => {
            recipeStore.setOilWeight( oil, e.target.value );  //TODO should be an action?
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
            recipeStore.removeOil( oil ); //TODO should be an action?
        };
    }

} );