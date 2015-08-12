import when from 'when';
import { get, post } from 'utils/http';

import baseUrl from 'utils/baseUrl';


export function getOils() {
    return when(
        get( baseUrl( 'oils' ) )
    );
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