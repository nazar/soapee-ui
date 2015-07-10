import when from 'when';

import {post} from 'utils/http';
import baseUrl from 'utils/baseUrl';

export function signupOrLoginThirdParty( provider, userDetails ) {
    return when(
        post( baseUrl( 'auths' ), {
            params: {
                provider,
                userDetails
            }
        } )
    );
}

export function signupLocal( username, password ) {
    return when(
        post( baseUrl( 'auths' ), {
            params: {
                provider: 'local',
                userDetails: {
                    username,
                    password
                }
            }
        } )
    );
}

export function loginLocal( username, password ) {
    return when(
        post( baseUrl( 'auths/login' ), {
            params: {
                username,
                password
            }
        } )
    );
}