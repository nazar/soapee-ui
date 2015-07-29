import React from 'react';
import Reflux from 'reflux';
import { Navigation } from 'react-router';

import MediaSigninButtons from 'components/mediaSigninButtons';
import LocalSigninForm from 'components/localSignupForm';

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

    componentWillUpdate() {
        if ( authStore.isAuthenticated() ) {
            this.replaceWith( 'profile' );
        }
    },

    render() {
        document.title = 'Soapee - Signup';

        return (
            <div id="signup">

                <div className="jumbotron">
                    <h1 className="text-center">Start Using Soapee</h1>

                    <p className="text-center">Create a free account to save and share all your recipes</p>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <LocalSigninForm />

                            <div className="strike"><span className="or">OR</span></div>

                            <MediaSigninButtons />

                        </div>
                    </div>
                </div>

            </div>
        );
    }

} );