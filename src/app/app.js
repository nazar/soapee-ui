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

let analytics = _.get( config, 'analytics.google' );

if ( analytics ) {
    ga.initialize( analytics );
}

Router.run( routes, Router.HistoryLocation, function ( Handler, state ) {
    if ( analytics ) {
        ga.pageview( state.pathname );
    }

    React.render( <Handler/>, document.getElementById( 'application' ) );
} );