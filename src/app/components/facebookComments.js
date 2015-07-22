/*global FB*/

import React from 'react';
import when from 'when';
import load from 'load-script';

export default React.createClass( {

    componentDidMount() {
        this.loadFacebookSDK()
            .then( this.initialiseCommentsWidget );
    },

    componentDidUpdate() {
        this.loadFacebookSDK()
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

    loadFacebookSDK() {
        return when.promise( resolve => {
            if ( typeof FB === 'undefined' ) {
                load( 'https://connect.facebook.net/en_US/sdk.js', () => {
                    resolve();
                } );
            } else {
                resolve();
            }
        } );
    },

    initialiseCommentsWidget() {
        FB.XFBML.parse( this.getDOMNode() );
    }


} );