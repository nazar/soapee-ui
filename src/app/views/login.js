import React from 'react';
import { Navigation } from 'react-router';
import Reflux from 'reflux';

import MediaSigninButtons from 'components/mediaSigninButtons';
import LocalSigninForm from 'components/localSigninForm';

import ValidateLoginFields from 'services/validateLoginFields';

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
            <div id="login">

                <div className="jumbotron">
                    <h1 className="text-center">Sign in</h1>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <LocalSigninForm
                                buttonCaption="Sign In"
                                errors={ this.state.errors }
                                onButtonClick={this.login}
                                />

                            <div className="strike"><span className="or">OR</span></div>

                            <MediaSigninButtons />

                        </div>
                    </div>
                </div>

            </div>
        );
    },

    login( payload ) {
        validateLogin.call( this, payload )
            .then( loginLocal.bind( this ) )
            .catch( setErrors.bind( this ) );
    }

} );


//////////////////////

function validateLogin( payload ) {
    return new ValidateLoginFields( {
        username: payload.username,
        password: payload.password
    } )
        .execute();
}

function loginLocal( payload ) {
    return authActions.loginLocal( payload.username, payload.password );
}

function setErrors( e ) {
    if ( e.name === 'CheckitError' ) {
        this.setState( {
            errors: e.toJSON()
        } );
    } else if ( e.status === 422 ) {
        this.setState( {
            errors: e.responseJSON.fields
        } );
    }
}