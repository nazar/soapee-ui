import when from 'when';

export function get( url, options = {} ) {
    return ajax( url, 'GET', options.params );
}

export function post( url, options = {} ) {
    return ajax( url, 'POST', options.params );
}

export function put( url, options = {} ) {
    return ajax( url, 'PUT', options.params );
}


///////////
//// PRIVATE

function ajax( url, verb, data ) {
    return when(
        $.ajax( {
            url,
            data: JSON.stringify( data ),
            type: verb,
            dataType: 'json'
        } )
    );
}