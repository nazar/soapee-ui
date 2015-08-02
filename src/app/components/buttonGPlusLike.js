/*global gapi*/

import React from 'react/addons';
import when from 'when';

export default React.createClass( {

    mixins: [
        React.addons.PureRenderMixin
    ],

    getDefaultProps() {
        return {
            url: null,
            layout: 'tall' //also standard
        };
    },

    componentDidMount() {
        this.initialiseCommentsWidget();
    },

    componentDidUpdate() {
        this.initialiseCommentsWidget();
    },

    render() {
        return (
            <div className="button-gplus-like">
                <div className="g-plusone"
                     data-href={ this.props.url }
                     data-size={ this.props.layout }
                    >
                </div>
            </div>
        );
    },

    initialiseCommentsWidget() {
        function clear() {
            $( this.getDOMNode() ).find( '.button-gplus-like' ).empty();
        }

        function initialize() {
            gapi.plusone.go( this.getDOMNode() );
        }

        when.try( clear.bind( this ) )
            .then( initialize.bind( this ) );
    }


} );