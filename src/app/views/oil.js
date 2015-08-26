import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import DocMeta from 'react-doc-meta';
import { Link, State } from 'react-router';

import oilActions from 'actions/oil';

import oilStore from 'stores/oil';
import oilsStore from 'stores/oils';
import calculatorStore from 'stores/calculator';
import oilComments from 'stores/oilComments';

import Spinner from 'components/spinner';
import FacebookComments from 'components/facebookComments';
import ButtonFBLike from 'components/buttonFBLike';
import ButtonGPlusLike from 'components/buttonGPlusLike';
import Commentable from 'components/commentable';
import RecipesLinkTable from 'components/recipesLinkTable';

export default React.createClass( {

    statics: {
        willTransitionTo: function ( transition, params ) {
            oilActions.getOilById( params.id );
        }
    },

    mixins: [
        State,
        Reflux.connect( oilStore, 'oil' ),
        Reflux.connect( oilComments, 'comments' )
    ],

    render() {
        return (
            <div id="oil">
                { this.renderLoading() }
                { this.renderOil() }
            </div>
        );
    },

    renderOil() {
        let oilName;

        if ( this.pageIsForRequestedOil() ) {
            oilName = this.state.oil.name;

            document.title = `Soapee - ${ oilName }`;

            return (
                <div>
                    <DocMeta tags={ this.tags() } />
                    <ol className="breadcrumb">
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="oils">Oils</Link></li>
                        <li className="active">{oilName}</li>
                    </ol>

                    <legend><h1>{oilName}</h1></legend>

                    <div className="row">

                        <div className="col-sm-4 col-xs-6">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Fatty Acids</h3>
                                </div>
                                { this.renderFattyAcids() }
                            </div>
                        </div>

                        <div className="col-sm-3 col-xs-6">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Oil Properties</h3>
                                </div>
                                { this.renderProperties() }
                            </div>
                        </div>

                        <div className="col-sm-4 col-xs-6">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Saponification Values</h3>
                                </div>
                                { this.renderSaponification() }
                            </div>
                        </div>

                        <div className="col-sm-1 col-xs-6 text-center hidden-xs">
                            <div className="social">
                                <ButtonFBLike
                                    url={ window.location }
                                    />
                                <ButtonGPlusLike
                                    url={ window.location }
                                    />
                            </div>
                        </div>

                    </div>

                    <div className="row"    >
                        <div className="col-md-12">
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active"><a href="#in-recipes" aria-controls="in-recipes" role="tab" data-toggle="tab">Used in Recipes</a></li>
                                <li role="presentation"><a href="#comments" aria-controls="comments" role="tab" data-toggle="tab">User Comments {this.countComments()}</a></li>
                                <li role="presentation"><a href="#facebook" aria-controls="facebook" role="tab" data-toggle="tab">Facebook Comments</a></li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="in-recipes">
                                    { this.renderInRecipes() }
                                </div>
                                <div role="tabpanel" className="tab-pane" id="comments">
                                    <Commentable
                                        store={ oilComments }
                                        />
                                </div>
                                <div role="tabpanel" className="tab-pane" id="facebook">
                                    <FacebookComments
                                        url={ window.location }
                                        />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    },

    renderSaponification() {
        let oil = this.state.oil;

        return (
            <div className="properties-container">
                <table className="table table-striped table-condensed table-super-condensed">
                    <tbody>
                    <tr>
                        <td>KOH</td>
                        <td>{oil.sap}</td>
                    </tr>
                    <tr>
                        <td>NaOH</td>
                        <td>{calculatorStore.sapForNaOh(oil)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    },

    renderFattyAcids() {
        let oil = this.state.oil;
        let labels = {
            saturated: 'Saturated',
            monoSaturated: 'Mono-unsaturated',
            polySaturated: 'Poly-unsaturated'
        };
        let breakdowns = _.transform( oilsStore.getAllFats(), ( output, fat ) => {
            let breakdown = oil.breakdown[ fat ];

            if ( breakdown ) {
                output.push(
                    <tr>
                        <td>{_.capitalize(fat)}</td>
                        <td>{breakdown}%</td>
                    </tr>
                );
            }
        }, [] );
        let saturations =  _( oil.saturation )
            .pick( 'saturated', 'monoSaturated', 'polySaturated' )
            .map( ( satType, saturation ) => {
                return (
                    <tr>
                        <td>{ labels[ saturation ] }:</td>
                        <td>{ satType }%</td>
                    </tr>
                );
            } )
            .value();

        let ratios = `${oil.saturation.saturated} : ${ 100 - oil.saturation.saturated }`;
        let ratiosRow = (
            <tr>
                <td>Saturation Ratio</td>
                <td>{ ratios }</td>
            </tr>
        );


        return (
            <div className="properties-container">
                <table className="table table-striped table-condensed table-super-condensed">
                    <tbody>
                    { breakdowns }
                    { this.gap() }
                    { saturations }
                    { this.gap() }
                    { ratiosRow }
                    </tbody>
                </table>
            </div>
        );
    },

    renderProperties() {
        let oil = this.state.oil;
        let properties;

        function render( property ) {
            return (
                <tr>
                    <td>{_.capitalize( property )}</td>
                    <td>{oil.properties[ property ]}%</td>
                </tr>
            );
        }

        properties = _( oil.properties )
            .keys()
            .sort()
            .map( render, this )
            .value();

        return (
            <div className="properties-container">
                <table className="table table-striped table-condensed table-super-condensed">
                    <tbody>
                    { properties }
                    </tbody>
                </table>
            </div>
        );
    },

    renderInRecipes() {
        let oil = this.state.oil;

        if ( oil.recipes && oil.recipes.length ) {
            return (
                <RecipesLinkTable
                    recipes={ oil.recipes }
                    />
            );
        } else {
            return (
                <div>Not used in any recipes.</div>
            );
        }

    },

    countComments() {
        let count = oilComments.count();

        if ( count ) {
            return <span>({ count })</span>;
        }
    },

    renderLoading() {
        if ( !(this.pageIsForRequestedOil()) ) {
            return <Spinner />;
        }
    },

    pageIsForRequestedOil() {
        let requested = Number( this.getParams().id );
        let got = Number( _.get( this.state.oil, 'id' ) );

        return requested === got;
    },

    gap() {
        return (
            <tr>
                <td colSpan="2"></td>
            </tr>
        );
    },

    tags() {
        let description = `Soapee Oil - ${ this.state.oil.name }`;

        return [
            {name: 'description', content: description},
            {name: 'twitter:card', content: description},
            {name: 'twitter:title', content: description},
            {property: 'og:title', content: description}
        ];
    }




} );