/*global FB*/

import when from 'when';
import load from 'load-script';

import config from 'config';

export default function () {

    return loadSdk()
        .then( initializeSdk );

}


function loadSdk() {
    return when.promise( resolve => {
        if ( typeof FB === 'undefined' ) {

            if ( !(window.loadingFB) ) {
                window.loadingFB = true;
                load( 'https://connect.facebook.net/en_US/sdk.js', () => {
                    resolve( 1 );
                } );
            } else {
                setTimeout( () => {
                    resolve( 0 );
                }, 1000 );
            }
        } else {
            resolve( 0 );
        }

    } );
}

function initializeSdk( loaded ) {
    if ( loaded ) {
        FB.init( {
            appId: config.auth.facebookClientId,
            cookie: true,
            version: 'v2.4',
            xfbml: true
        } );

        return true;
    }
}