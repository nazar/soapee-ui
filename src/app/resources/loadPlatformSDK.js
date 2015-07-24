/*global gapi*/

import when from 'when';
import load from 'load-script';

export default function () {

    return loadSdk();

}

function loadSdk() {
    return when.promise( resolve => {
        if ( typeof gapi === 'undefined' ) {
            load( 'https://apis.google.com/js/platform.js', { attrs: { defer: 'defer' } }, () => {
                resolve();
            } );
        } else {
            resolve();
        }
    } );
}