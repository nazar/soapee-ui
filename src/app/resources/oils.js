import when from 'when';
import {get} from 'utils/http';

import oils from 'mocks/oils';
import baseUrl from 'utils/baseUrl';


export function getOils() {
    return when.promise( resolve => {
        resolve( oils );
    } );

}

export function getOilById( oilId ) {
    return when(
        get( baseUrl( `oils/${oilId}` ) )
    );
}