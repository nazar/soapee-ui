import _ from 'lodash';
import React from 'react/addons';
import Reflux from 'reflux';
import cx from 'classnames';

import oilsStore from 'stores/oils';

export default React.createClass( {

    mixins: [
        Reflux.connect( oilsStore, 'oils' ),
        React.addons.LinkedStateMixin
    ],

    shouldComponentUpdate( nextProps, nextState ) {
        return !( _.isEqual( this.state, nextState ) );
    },

    render() {
        return (
            <div className="list-oils-selector">
                <div className="input-group">
                    <input type="text" className="form-control filter" placeholder="filter oil..."
                           valueLink={this.linkState('filter')}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" onClick={this.clearSearch}><i className="fa fa-times-circle"></i></button>
                    </span>
                </div>
                <div className="oils-container">
                    <table className="table table-striped table-condensed table-super-condensed">
                        <tbody>
                        { this.renderOils() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    },

    renderOils() {
        let oils;

        function matchToName( oil ) {
            return oil.name.toLowerCase().indexOf( this.state.filter.toLowerCase() ) !== -1;
        }

        function renderOil( oil ) {
            let klass = cx( 'no-select', {selected: oil.name === this.state.selectedOil} );

            return (
                <tr key={ `list-oil-${oil.id}` }>
                    <td className={klass}
                        onClick={this.selectOil(oil)}
                        onDoubleClick={this.addOil(oil)}
                        >
                        {oil.name}
                    </td>
                </tr>
            );
        }

        if ( this.state.filter ) {
            oils = _( this.state.oils )
                .filter( matchToName, this );

        } else {
            oils = _( this.state.oils );
        }

        return oils
            .sortBy( 'name' )
            .map( renderOil, this )
            .value();
    },

    selectOil( oil ) {
        return () => {
            this.setState( {
                selectedOil: oil.name
            } );

            if ( this.props.onSelectedOil ) {
                this.props.onSelectedOil( oil );
            }
        };
    },

    addOil( oil ) {
        return e => {
            this.setState( {
                selectedOil: oil.name
            } );

            if ( this.props.onAddedOil ) {
                this.props.onAddedOil( e, oil );
            }
        };
    },

    clearSearch() {
        this.setState( {
            filter: null
        } );
    }

} );