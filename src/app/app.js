//load CSS assets first
require( '../assets/main.css' );

import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import ga from 'react-ga';

import config from 'config';
import routes from './routes';

///////////////////
/// INITIALISE

if ( _.get( config, 'analytics.google' )  ) {
    ga.initialize( _.get( config, 'analytics.google' ) );
}

Router.run( routes, Router.HistoryLocation, function ( Handler ) {
    React.render( <Handler/>, document.getElementById( 'application' ) );
} );