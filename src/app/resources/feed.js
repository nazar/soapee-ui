import when from 'when';
import { get, post, put } from 'utils/http';

import baseUrl from 'utils/baseUrl';


export function getFeed() {
    return when(
        get( baseUrl( 'feedables' ) )
    );
}