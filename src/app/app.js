//load CSS assets first
require( '../assets/main.css' );

import React from 'react';
import Router from 'react-router';

import routes from './routes';

///////////////////
/// INITIALISE

Router.run( routes, function ( Handler ) {
    React.render( <Handler/>, document.getElementById( 'application' ) );
} );