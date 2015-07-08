import React from 'react';
import cx from 'classnames';
import {Link, State} from 'react-router';

import NavLink from 'components/navLink';

//import authStore from 'stores/authStore';

export default React.createClass( {

    mixins: [
        State
    ],

    getInitialState() {
        return {
            loggedIn: false
        };
    },

    activeClassForTo( to ) {
        return cx( { active: this.isActive( to ) } );
    },

    render() {
        return (
            <div className="navbar navbar-default navbar-static-top navbar-inverse" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="home" className="navbar-brand">Soapee</Link>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-left">
                            <NavLink to="calculator">Calculator</NavLink>
                            <NavLink to="recipes">Recipes</NavLink>
                            <NavLink to="oils">Oils</NavLink>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#/login">Login</a></li>
                            <li><a href="#/login">Signup</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

} );