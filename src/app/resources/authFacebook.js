/*global FB*/

import when from 'when';
import load from 'load-script';
import config from 'config';

export default function authenticate( doLogin ) {

    return loadFacebookSdk()
        .then( initialiseSdk )
        .then( authoriseUser )
        .then( extractAccessToken );


    function loadFacebookSdk() {
        return when.promise( resolve => {
            if ( typeof FB === 'undefined' ) {
                load( 'https://connect.facebook.net/en_US/sdk.js', () => {
                    resolve();
                } );
            } else {
                resolve();
            }
        } );
    }

    function initialiseSdk() {
        FB.init( {
            appId: config.auth.facebookClientId,
            cookie: true,
            version: 'v2.4'
        } );
    }

    function authoriseUser() {
        return when.promise( ( resolve, reject ) => {

            FB.getLoginStatus( response => {
                if ( response.status === 'connected' ) {
                    resolve( response );
                } else if ( doLogin ) {
                    FB.login( response => {
                        if ( response.authResponse ) {
                            resolve( response);
                        } else {
                            reject();
                        }
                    } );
                } else {
                    reject();
                }
            } );

        } );
    }

    function extractAccessToken( response ) {
        return response.authResponse.accessToken;
    }

}