import config from 'config';
import {resolve} from 'url';

export default function( url ) {
    return resolve( config.baseUrl, url );
}