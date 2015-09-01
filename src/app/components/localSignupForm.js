import React from 'react';

import LocalAuthenticationForm from 'components/localAuthenticationForm';
import ValidateSignupFields from 'services/validateSignupFields';
import authActions from 'actions/auth';

export default React.createClass( {

    getInitialState() {
        return {
            errors: {}
        };
    },

    getDefaultProps() {
        return {
            onSignedUp: () => {}
        };
    },


    render() {
        return (
            <div className="local-signup-form">

                <LocalAuthenticationForm
                    buttonCaption={this.props.buttonCaption || 'Get Started' }
                    errors={ this.state.errors }
                    showEmail={true}
                    onButtonClick={this.signup}
                    />

            </div>
        );
    },

    signup( payload ) {
        this.setState( {
            errors: {}
        } );

        validateSignup.call( this, payload )
            .with( this )
            .then( signupLocal )
            .then( this.props.onSignedUp )
            .catch( setErrors );
    }

} );


//////////////////////

function validateSignup( payload ) {
    return new ValidateSignupFields( payload )
        .execute();
}

function signupLocal( payload ) {
    return authActions.signupLocal( payload.username, payload.password, payload.email );
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