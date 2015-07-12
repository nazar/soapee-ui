import React from 'react';

import authFacebook from 'resources/authFacebook';
import authGoogle from 'resources/authGoogle';

import authActions from 'actions/auth';

export default React.createClass( {

    render() {
        return (
            <div className="media-signin-buttons">
                <div className="action-button">
                    <button className="btn btn-primary link-signup" onClick={this.googleSignin}>
                        <span className="logo">
                            <i className="fa fa-google-plus"></i>
                        </span>
                        <span className="action">Sign in with Google+</span>
                    </button>
                </div>

                <div className="action-button">
                    <button className="btn btn-primary link-signup" onClick={this.facebookSignin}>
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
        authFacebook( true )
            .then( thirdPartySignup( 'facebook' ).bind( this ) );
    },

    googleSignin() {
        authGoogle( true )
            .then( thirdPartySignup( 'google' ).bind( this ) );
    }

} );


/////////////////////////
//// private

function thirdPartySignup( provider ) {
    return userDetails => {
        return authActions.signupOrLoginThirdParty( provider, userDetails );
    };
}