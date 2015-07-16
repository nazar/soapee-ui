import _ from 'lodash';
import React from 'react';

import authFacebook from 'resources/authFacebook';
import authGoogle from 'resources/authGoogle';

import authActions from 'actions/auth';

export default React.createClass( {

    getInitialState() {
        return {
            disabledButtons: {
                facebook: false,
                google: false
            }
        };
    },

    getDefaultProps() {
        return {
            onAuthenticated: () => {}
        };
    },

    render() {
        return (
            <div className="media-signin-buttons">
                <div className="action-button">
                    <button className="btn btn-primary link-signup" onClick={this.googleSignin} {...this.isButtonDisabled('google')}>
                        <span className="logo">
                            <i className="fa fa-google-plus"></i>
                        </span>
                        <span className="action">Sign in with Google+</span>
                    </button>
                </div>

                <div className="action-button">
                    <button className="btn btn-primary link-signup" onClick={this.facebookSignin} {...this.isButtonDisabled('facebook')}>
                        <span className="logo">
                            <i className="fa fa-facebook"></i>
                        </span>
                        <span className="action">Sign in with Facebook</span>
                    </button>
                </div>

            </div>
        );
    },

    facebookSignin() {
        this.disableButton( 'facebook' );

        authFacebook( true )
            .then( this.thirdPartySignup( 'facebook' ) )
            .then( this.props.onAuthenticated )
            .finally( this.enableButton( 'facebook' ) );
    },

    googleSignin() {
        this.disableButton( 'google' );

        authGoogle( true )
            .then( this.thirdPartySignup( 'google' ) )
            .then( this.props.onAuthenticated )
            .finally( this.enableButton( 'google' ) );

    },

    isButtonDisabled( button ) {
        if ( this.state.disabledButtons[ button ]) {
            return {
                disabled: 'disabled'
            };
        }
    },


    disableButton( button ) {
        this.setButtonStateFor( button, true );
    },

    enableButton( button ) {
        return () => {
            this.setButtonStateFor( button, false );
        };
    },

    setButtonStateFor( provider, disabled ) {
        let newState;

        newState = _.merge( this.state,  {
            disabledButtons: {
                [ provider ]: disabled
            }
        } );

        this.setState( newState );
    },

    thirdPartySignup( provider ) {
        return userDetails => {
            return authActions.signupOrLoginThirdParty( provider, userDetails );
        };
    }

} );