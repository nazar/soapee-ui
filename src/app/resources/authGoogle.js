/*global gapi*/

import when from 'when';

import config from 'config';

// define googleAuth as a module var as Chrome seems to hang if it is
// returned in initialiseSdk after the gapi initi call... i.e.
//  return gapi.auth2.init( {
//      client_id: config.auth.googleClientId,
//      scope: 'profile'
//  } );
// might be a when issue....

let googleAuth;

export default function authenticate( doLogin ) {

    return loadAuth2Sdk()
        .then( initialiseSdk )
        .then( authoriseUser )
        .then( extractAccessToken );


    function loadAuth2Sdk() {
        return when.promise( resolve => {
            gapi.load( 'auth2', resolve );
        } );

    }

    function initialiseSdk() {
        if ( !googleAuth ) {
            googleAuth = gapi.auth2.init( {
                client_id: config.auth.googleClientId,
                scope: 'profile'
            } );
        }
    }

    function authoriseUser() {
        return when.promise( ( resolve, reject ) => {
            googleAuth.then( () => {
                if ( googleAuth.isSignedIn.get() ) {
                    resolve( getGoogleUserAuthResponse() );
                } else {
                    if ( doLogin ) {
                        when( googleAuth.signIn() )
                            .then( getGoogleUserAuthResponse )
                            .then( resolve )
                            .catch( reject );
                    } else {
                        reject();
                    }

                }
            } );
        } );


        function getGoogleUserAuthResponse() {
            return googleAuth.currentUser.get().getAuthResponse();
        }
    }

    function extractAccessToken( response ) {
        return response.access_token;
    }

}