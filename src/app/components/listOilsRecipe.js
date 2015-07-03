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
                <table className="recipe-oils form-inline table table-striped table-condensed">
                    <ReactCSSTransitionGroup  transitionName="fade" component="tbody" >
                        {_.map( this.state.recipe.oils, this.renderOil )}
                    </ReactCSSTransitionGroup>
                </table>
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
                <td>
                    <span className="oil-name">{oil.name}</span>
                </td>
                <td>
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

    changed( oil ) {
        return e => {
            recipeStore.setOilWeight( oil, e.target.value );
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
            recipeStore.removeOil( oil );
            //this.props.onRemoveOilFromReciple( oil );
        };
    }

} );