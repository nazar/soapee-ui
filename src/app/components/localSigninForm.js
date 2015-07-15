import React from 'react/addons';
import cx from 'classnames';

export default React.createClass( {

    mixins: [
        React.addons.LinkedStateMixin
    ],

    getInitialState() {
        return {
            username: null,
            password: null
        };
    },

    render() {
        let usernameCx;
        let passwordCx;

        usernameCx = cx( 'form-group', {
            'has-error': this.props.errors.username,
            'has-success': !(this.props.errors.username)
        } );
        passwordCx = cx( 'form-group', {
            'has-error': this.props.errors.password,
            'has-success': !(this.props.errors.password)
        } );

        return (
            <div className="local-signin-form">

                <div className="signup-options text-center form">
                    <div className={usernameCx}>
                        <input type="text"
                               className="form-control"
                               placeholder="Your Username"
                               valueLink={this.linkState( 'username' )}
                            />
                        { this.props.errors.username &&
                        <span className="label label-danger">{ this.props.errors.username[ 0 ]}</span>
                        }
                    </div>
                    <div className={passwordCx}>
                        <input type="text"
                               className="form-control"
                               placeholder="Your Password"
                               valueLink={this.linkState( 'password' )}
                            />
                        { this.props.errors.password &&
                        <span className="label label-danger">{ this.props.errors.password[ 0 ]}</span>
                        }
                    </div>

                    <button className="btn btn-lg btn-primary btn-signup" onClick={this.signup}>{ this.props.buttonCaption }</button>
                </div>

            </div>
        );
    },

    signup() {
        this.props.onButtonClick( {
            username: this.state.username,
            password: this.state.password
        } );
    }

} );