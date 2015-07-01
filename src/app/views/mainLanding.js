import React from 'react';

import {RouteHandler} from 'react-router';

export default React.createClass( {

    render() {
        return (
            <div id="main-landing">

                <div className="jumbotron">
                    <h1>Welcome to Soapee</h1>
                    <p>Soapee main landing / marketing page</p>
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
                </div>


                <RouteHandler/>
            </div>
        );
    }

} );