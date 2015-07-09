import React from 'react';

export default React.createClass( {

    render() {
        return (
            <div className="media-signin-buttons">
                <div className="action-button">
                    <a href="" className="btn btn-primary link-signup">
                        <span className="logo">
                            <i className="fa fa-google-plus"></i>
                        </span>
                        <span className="action">Sign in with Google+</span>
                    </a>
                </div>

                <div className="action-button">
                    <a href="" className="btn btn-primary link-signup">
                        <span className="logo">
                            <i className="fa fa-facebook"></i>
                        </span>
                        <span className="action">Sign in with Facebook</span>
                    </a>
                </div>

                <div className="action-button">
                    <a href="" className="btn btn-primary link-signup">
                        <span className="logo">
                            <i className="fa fa-twitter"></i>
                        </span>
                        <span className="action">Sign in with Twitter</span>
                    </a>
                </div>
            </div>
        );
    }

} );