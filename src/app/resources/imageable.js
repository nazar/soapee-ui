import {resolve} from 'url';

import config from 'config';


export function imageableUrl( image ) {
    return resolve( config.imageUrl, [ image.path, image.file_name ].join( '/' ) );
}