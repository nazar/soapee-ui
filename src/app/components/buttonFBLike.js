/*global FB*/

import React from 'react/addons';
import when from 'when';

export default React.createClass( {

    mixins: [
        React.addons.PureRenderMixin
    ],

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
        this.initialiseCommentsWidget();
    },

    render() {
        return (
            <div className="button-fb-like">
                <div className="fb-like"
                     data-href={ this.props.url }
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

        when.try( clear.bind( this ) )
            .then( initialize.bind( this ) );
    }

} );