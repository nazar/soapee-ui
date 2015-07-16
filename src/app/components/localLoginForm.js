import _ from 'lodash';
import React from 'react';

import LocalAuthenticationForm from 'components/localAuthenticationForm';
import ValidateLoginFields from 'services/validateLoginFields';
import authActions from 'actions/auth';

export default React.createClass( {

    getInitialState() {
        return {
            errors: {}
        };
    },

    getDefaultProps() {
        return {
            onLoggedIn: () => {}
        };
    },

    render() {
        return (
            <div className="local-login-form">

                { this.state.badPassword &&
                    <div className="alert alert-danger text-center animate bounceIn" role="alert">
                        <strong>Username</strong> and <strong>Password</strong> do not match
                    </div>
                }
                <LocalAuthenticationForm
                    buttonCaption={ this.props.buttonCaption || 'Log In' }
                    errors={ this.state.errors }
                    onButtonClick={this.login}
                    />

            </div>
        );
    },

    login( payload ) {
        this.setState( {
            badPassword: false,
            errors: {}
        } );

        validateLogin.call( this, payload )
            .then( loginLocal.bind( this ) )
            .then( this.props.onLoggedIn )
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
    } else if ( _.get( e.responseJSON, 'errorType' ) === 'BadPasswordError' ) {
        this.setState( {
            badPassword: true
        } );
    } else if ( e.status === 422 ) {
        this.setState( {
            errors: e.responseJSON.fields
        } );
    }
}