/*global FB*/

import React from 'react/addons';

export default React.createClass( {

    mixins: [
        React.addons.PureRenderMixin
    ],

    componentDidMount() {
        this.initialiseCommentsWidget();
    },

    componentDidUpdate() {
        this.initialiseCommentsWidget();
    },

    render() {
        return (
            <div className="facebook-comments">
                <div className="fb-comments"
                     data-href={ this.props.url.href }
                     data-width="100%"
                    >
                </div>
            </div>
        );
    },

    initialiseCommentsWidget() {
        $( this.getDOMNode() ).find( '.fb-comments' ).empty();
        FB.XFBML.parse( $( this.getDOMNode() ).get( 0 ) );
    }


} );