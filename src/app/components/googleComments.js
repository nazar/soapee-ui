/*global gapi*/

import React from 'react/addons';
import when from 'when';
import load from 'load-script';

import Spinner from 'components/spinner';

let plusOne;

export default React.createClass( {

    mixins: [
        React.addons.PureRenderMixin
    ],

    componentDidMount() {
        this.width = $( 'body .container' ).width();

        this.loadPlusOneSDK()
            .then( this.initialiseCommentsWidget );
    },

    componentDidUpdate() {
        this.loadPlusOneSDK()
            .then( this.initialiseCommentsWidget );
    },

    render() {
        return (
            <div id="google-comments-widget" className="google-comments">
                <Spinner />
            </div>
        );
    },

    loadPlusOneSDK() {
        return when.promise( resolve => {
            if ( typeof plusOne === 'undefined' ) {
                load( 'https://apis.google.com/js/plusone.js', () => {
                    plusOne = gapi.comments;
                    resolve();
                } );
            } else {
                resolve();
            }
        } );
    },

    initialiseCommentsWidget() {
        $( this.getDOMNode() ).find( '#google-comments-widget' ).empty();

        gapi.comments.render( 'google-comments-widget', {
            href: this.props.url,
            width: this.width,
            first_party_property: 'BLOGGER',
            view_type: 'FILTERED_POSTMOD'
        } );
    }


} );