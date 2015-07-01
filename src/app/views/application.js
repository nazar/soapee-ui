import React from 'react';

import {RouteHandler} from 'react-router';

import NavBar from 'components/navbar';

export default React.createClass( {

    render() {
        return (
            <div>
                <NavBar />

                <div className="container">
                    <RouteHandler/>
                </div>
            </div>
        );
    }

} );