import when from 'when';
import { get, post } from 'utils/http';

import oils from 'mocks/oils';
import baseUrl from 'utils/baseUrl';


export function getOils() {
    return when.promise( resolve => {
        resolve( oils );
    } );
}

export function getOilComments( oil ) {
    return when(
        get( baseUrl( `oils/${oil.id}/comments` ) )
    );
}

export function addCommentToOil( comment, oil ) {
    return when(
        post( baseUrl( `oils/${oil.id}/comments` ), {
            params: {
                comment
            }
        } )
    );
}


export function getOilById( oilId ) {
    return when(
        get( baseUrl( `oils/${oilId}` ) )
    );
}