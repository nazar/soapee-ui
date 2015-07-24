/*global FB*/

import when from 'when';
import loadFBSdk from 'resources/loadFBSdk';

export default function authenticate( doLogin ) {

    return loadFBSdk()
        .then( authoriseUser )
        .then( extractAccessToken );

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