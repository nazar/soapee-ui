import React from 'react';
import Reflux from 'reflux';
import { Navigation } from 'react-router';

import MediaSigninButtons from 'components/mediaSigninButtons';
import LocalSigninForm from 'components/localSigninForm';
import ValidateSignupFields from 'services/validateSignupFields';

import authStore from 'stores/auth';
import authActions from 'actions/auth';

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
            <div id="signup">

                <div className="jumbotron">
                    <h1 className="text-center">Start Using Soapee</h1>

                    <p className="text-center">Create a free account to save and share all your recipes</p>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <LocalSigninForm
                                buttonCaption="Get Started"
                                errors={ this.state.errors }
                                onButtonClick={this.signup}
                                />

                            <div className="strike"><span className="or">OR</span></div>

                            <MediaSigninButtons />

                        </div>
                    </div>
                </div>

            </div>
        );
    },

    signup( payload ) {
        this.setState( {
            errors: {}
        } );

        validateSignup.call( this, payload )
            .then( signupLocal.bind( this ) )
            .catch( setErrors.bind( this ) );
    }

} );


//////////////////////

function validateSignup( payload ) {
    return new ValidateSignupFields( {
        username: payload.username,
        password: payload.password
    } )
        .execute();
}

function signupLocal( payload ) {
    return authActions.signupLocal( payload.username, payload.password );
}

function setErrors( e ) {
    if ( e.name === 'CheckitError' ) { //local validation
        this.setState( {
            errors: e.toJSON()
        } );
    } else if ( e.status === 422 ) { //server validation
        this.setState( {
            errors: e.responseJSON.fields
        } );
    }
}

