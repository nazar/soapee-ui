import _ from 'lodash';
import React from 'react';
import { Link, Navigation } from 'react-router';

import { soapTypeToDescription } from 'resources/recipes';

export default React.createClass( {

    mixins: [
        Navigation
    ],

    render() {
        let recipe = this.props.recipe;

        return (
            <div className='recipe-list-item'>
                <Link className="recipe-name" to="recipe" params={{id: recipe.id}}>{ recipe.name }</Link>
                <div className="description">
                    <div className="soap-type">{ _.capitalize( soapTypeToDescription( recipe.soapType ) ) } soap</div>
                    <div className="ins-iodine">
                        <span className="iodine">Iodine: { _.round( recipe.summary.properties.iodine ) }</span>
                        <span className="ins">INS: { _.round( recipe.summary.properties.ins ) }</span>
                    </div>
                    <div className="properties clearfix">
                        <ul className="list-unstyled">
                            { this.renderOrderedBreakdowns() }
                        </ul>
                    </div>
                    <div className="fats clearfix">
                        <ul className="list-unstyled">
                            { this.renderFats() }
                        </ul>
                    </div>
                    <div className="recipe-description">
                        { recipe.description }
                    </div>
                </div>
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

    }



} );