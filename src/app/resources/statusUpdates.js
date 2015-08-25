import _ from 'lodash';
import when from 'when';
import { get, post, put, del } from 'utils/http';

import baseUrl from 'utils/baseUrl';


export function getStatusUpdate( id ) {
    return when(
        get( baseUrl( `status-updates/${id}` ) )
    );
}

export function addStatusUpdate( update ) {
    let params = {
        update
    };

    return when(
        post( baseUrl( 'status-updates' ), {
            params
        } )
    );
}

export function updateStatusUpdate( statusUpdate ) {
    return when(
        put( baseUrl( `status-updates/${statusUpdate.id}` ), {
            params: {
                update: statusUpdate.update,
                deleting: {
                    imageables: _( statusUpdate.images ).filter( { deleting: true } ).pluck( 'id' ).value()
                }
            }
        } )
    );
}

export function deleteStatusUpdate( statusUpdate ) {
    return when(
        del( baseUrl( `status-updates/${statusUpdate.id}` ) )
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
