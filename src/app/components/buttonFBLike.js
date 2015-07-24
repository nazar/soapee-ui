/*global FB*/

import React from 'react';
import loadFBSdk from 'resources/loadFBSdk';

export default React.createClass( {

    getDefaultProps() {
        return {
            url: null,
            layout: 'box_count'
        };
    },

    componentDidMount() {
        this.initialiseCommentsWidget();
    },

    componentDidUpdate() {
        this.initialiseCommentsWidget();    },

    render() {
        return (
            <div className="button-fb-like">
                <div className="fb-like"
                     data-href={ this.props.url || window.location }
                     data-layout={ this.props.layout }
                     data-action="like"
                     data-show-faces="true"
                     data-share="true">
                </div>
            </div>
        );
    },

    initialiseCommentsWidget() {
        function clear() {
            $( this.getDOMNode() ).find( '.button-fb-like' ).empty();
        }

        function initialize() {
            FB.XFBML.parse( this.getDOMNode() );
        }

        loadFBSdk()
            .then( clear.bind( this ) )
            .then( initialize.bind( this ) );
    }

} )