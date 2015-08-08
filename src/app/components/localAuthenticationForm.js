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
        let passwordFieldType;

        usernameCx = cx( 'form-group', {
            'has-error': this.props.errors.username,
            'has-success': this.state.username && !(this.props.errors.username)
        } );
        passwordCx = cx( 'form-group', {
            'has-error': this.props.errors.password,
            'has-success': this.state.password && !(this.props.errors.password)
        } );

        passwordFieldType = this.props.hidePassword ? 'password' : 'text';

        return (
            <div className="local-signin-form">
                <form action={ this.signup }>
                    <div className="signup-options text-center form">
                        <div className={usernameCx}>
                            <input type="text"
                                   className="form-control"
                                   placeholder="Your Username"
                                   valueLink={this.linkState( 'username' )}
                                />
                            { this.props.errors.username &&
                            <span className="label label-danger animate bounceIn">{ this.props.errors.username[ 0 ]}</span>
                            }
                        </div>
                        <div className={passwordCx}>
                            <input type={ passwordFieldType }
                                   className="form-control"
                                   placeholder="Your Password"
                                   valueLink={this.linkState( 'password' )}
                                />
                            { this.props.errors.password &&
                            <span className="label label-danger animate bounceIn">{ this.props.errors.password[ 0 ]}</span>
                            }
                        </div>

                        <button className="btn btn-lg btn-primary btn-signup" onClick={this.signup}>{ this.props.buttonCaption }</button>
                    </div>
                </form>
            </div>
        );
    },

    signup( e ) {
        e.preventDefault();

        this.props.onButtonClick( {
            username: this.state.username,
            password: this.state.password
        } );
    }

} );