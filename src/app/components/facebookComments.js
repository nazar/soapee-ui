/*global FB*/

import React from 'react/addons';
import loadFBSdk from 'resources/loadFBSdk';

import Spinner from 'components/spinner';

export default React.createClass( {

    mixins: [
        React.addons.PureRenderMixin
    ],

    componentDidMount() {
        loadFBSdk()
            .then( this.initialiseCommentsWidget );
    },

    componentDidUpdate() {
        loadFBSdk()
            .then( this.initialiseCommentsWidget );
    },

    render() {
        return (
            <div className="facebook-comments">
                <div className="fb-comments"
                     data-href={ this.props.url }
                     data-width="100%">
                    <Spinner />
                </div>
            </div>
        );
    },

    initialiseCommentsWidget() {
        //reparse to load comments for the updated data-href
        if ( typeof FB !== 'undefined') {
            FB.XFBML.parse( this.getDOMNode() );
        }
    }


} );