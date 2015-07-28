import _ from 'lodash';
import React from 'react';
import { Link, Navigation } from 'react-router';

import UserAvatar from 'components/userAvatar';
import MarkedDisplay from 'components/markedDisplay';

export default React.createClass( {

    mixins: [
        Navigation
    ],

    render() {
        let recipe = this.props.recipe;

        return (
            <div className='recipe-list-item' key={ `recipe-list-item-${recipe.id}` }>
                <table className="table table-striped table-bordered table-condensed">
                    <tr>
                        <td colSpan="3">
                            { this.props.showUser &&
                                <UserAvatar
                                    user={ recipe.user }
                                    />
                            }
                            <Link className="recipe-name" to="recipe" params={{id: recipe.id}}>{ recipe.name }</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>{recipe.soapType}</td>
                        <td>
                            <span className="iodine">Iodine: { _.round( recipe.summary.properties.iodine ) }</span>
                            <span className="ins">INS: { _.round( recipe.summary.properties.ins ) }</span>
                        </td>
                        <td className="properties">
                            <ul className="list-unstyled">
                                { this.renderOrderedBreakdowns() }
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="oils">
                            <ul className="list-unstyled">
                                { this.renderOils() }
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="fats" >
                            <ul className="list-unstyled">
                                { this.renderFats() }
                            </ul>
                        </td>
                    </tr>
                    { recipe.description &&
                        <tr>
                            <td colSpan="3">
                                <MarkedDisplay
                                    content={ recipe.description }
                                    />
                            </td>
                        </tr>
                    }

                </table>
            </div>
        );
    },

    renderOrderedBreakdowns() {
        let properties = this.props.recipe.summary.properties;

        return _( properties )
            .keys()
            .filter( property => { return !( _.contains( [ 'ins', 'iodine' ], property ) ); } )
            .sort()
            .map( property => {
                let value = _.round( properties[ property ] );
                return (
                    <li>
                        <span className="name">{_.capitalize( property )}:</span>
                        <span className="value">{ _.round( value ) }%</span>
                    </li>
                );
            } )
            .value();
    },

    renderFats() {
        let fats = this.props.recipe.summary.breakdowns;

        return _( fats )
            .keys()
            .sort()
            .map( fat => {
                let value = _.round( fats[ fat ] );
                return (
                    <li>
                        <span className="name">{_.capitalize( fat )}:</span>
                        <span className="value">{ _.round( value ) }%</span>
                    </li>
                );
            } )
            .value();

    },

    renderOils() {
        function renderOil( oil ) {
            return (
                <li>
                    <Link to="oil" params={ { id: oil.id } }>{ oil.name }</Link>
                </li>
            );
        }

        return  _( this.props.recipe.oils )
            .sortBy( 'name' )
            .map( renderOil )
            .value();
    }



} );