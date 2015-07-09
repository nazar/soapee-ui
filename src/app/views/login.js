import React from 'react';

import MediaSigninButtons from 'components/mediaSigninButtons';

export default React.createClass( {

    render() {
        return (
            <div id="login">

                <div className="jumbotron">
                    <h1 className="text-center">Sign in</h1>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="signup-options text-center form">
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Your Username"
                                        />
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Your Password"
                                        />
                                </div>

                                <button className="btn btn-lg btn-primary btn-signup">Sign in</button>
                            </div>

                            <div className="strike"><span className="or">OR</span></div>

                            <MediaSigninButtons />

                        </div>
                    </div>
                </div>

            </div>
        );
    }

} );