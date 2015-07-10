/*global FB*/

import when from 'when';
import load from 'load-script';
import config from 'config';

export default function authenticate( doLogin ) {

    return loadFacebookSdk()
        .then( initialiseSdk )
        .then( authoriseUser )
        .then( extractUserInfo );


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
                    FB.api( 'me', resolve );
                } else if ( doLogin ) {
                    FB.login( response => {
                        if ( response.authResponse ) {
                            FB.api( 'me', resolve );
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

    function extractUserInfo( response ) {
        return {
            id: response.id,
            name: response.name,
            imageUrl: 'https://graph.facebook.com/' + response.id + '/picture'
        };
    }

}