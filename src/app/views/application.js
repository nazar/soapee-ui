import React from 'react';

import {RouteHandler} from 'react-router';

import NavBar from 'components/navbar';
import Footer from 'components/footer';

export default React.createClass( {

    render() {
        return (
            <div id="application-view">
                <NavBar />

                <div className="container">
                    <RouteHandler />
                </div>

                <Footer />

            </div>
        );
    }

} );