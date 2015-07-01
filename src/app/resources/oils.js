import when from 'when';
//import {get} from 'utils/http';

import oils from 'mocks/oils';


export function getOils() {
    return when.promise( resolve => {
        resolve( oils );
    } );

}