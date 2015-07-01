import React from 'react';

import {RouteHandler} from 'react-router';

export default React.createClass( {

    render() {
        return (
            <div id="guest-landing">

                <div className="jumbotron">
                    <h1>Welcome to </h1>
                    <p>Soapee guest landing page template for login and signups</p>
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
                </div>


                <RouteHandler/>
            </div>
        );
    }

} );