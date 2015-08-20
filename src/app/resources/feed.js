import when from 'when';
import { get } from 'utils/http';

import baseUrl from 'utils/baseUrl';


export function getFeed( options = {} ) {
    return when(
        get( baseUrl( 'feedables' ), {
            params: {
                page: options.page
            }
        } )
    );
}