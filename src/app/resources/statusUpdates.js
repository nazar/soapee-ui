import when from 'when';
import { get, post, put } from 'utils/http';

import baseUrl from 'utils/baseUrl';


export function getStatusUpdate( id ) {
    return when(
        get( baseUrl( `status-updates/${id}` ) )
    );
}

export function getStatusUpdateComments( statusUpdate ) {
    return when(
        get( baseUrl( `status-updates/${statusUpdate.id}/comments` ) )
    );
}

export function addComment( comment, statusUpdate ) {
    return when(
        post( baseUrl( `status-updates/${statusUpdate.id}/comments` ), {
            params: {
                comment
            }
        } )
    );
}
