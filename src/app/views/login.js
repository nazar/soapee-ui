import React from 'react';
import { Navigation } from 'react-router';
import Reflux from 'reflux';

import MediaSigninButtons from 'components/mediaSigninButtons';
import LocalLoginForm from 'components/localLoginForm';

import authStore from 'stores/auth';

export default React.createClass( {

    mixins: [
        Navigation,
        Reflux.connect( authStore, 'auth' )
    ],

    getInitialState() {
        return {
            errors: {}
        };
    },

    render() {
        if ( authStore.isAuthenticated() ) {
            this.replaceWith( 'profile' );
        }

        return (
            <div id="login">

                <div className="jumbotron">
                    <h1 className="text-center">Log In</h1>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <LocalLoginForm />

                            <div className="strike"><span className="or">OR</span></div>

                            <MediaSigninButtons />

                        </div>
                    </div>
                </div>

            </div>
        );
    }

} );