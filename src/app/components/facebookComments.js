/*global FB*/

import React from 'react';
import loadFBSdk from 'resources/loadFBSdk';

export default React.createClass( {

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
                     data-href={window.location}
                     data-width="100%">
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