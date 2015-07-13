import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import Login from 'views/login';
import Signup from 'views/signup';

import Application from 'views/application';
import Account from 'views/account';
import Calculator from 'views/calculator';
import Logout from 'views/logout';
import MainLanding from 'views/mainLanding';
import Oils from 'views/oils';
import Profile from 'views/profile';
import Recipes from 'views/recipes';


let routes = (
    <Route name="home" path="/" handler={Application}>

        <DefaultRoute handler={MainLanding}></DefaultRoute>

        <Route name="login" handler={Login} />
        <Route name="signup" handler={Signup} />
        <Route name="logout" handler={Logout} />

        <Route name="calculator" handler={Calculator} />
        <Route name="recipes" handler={Recipes} />
        <Route name="oils" handler={Oils} />

        <Route name="account" path="/my" handler={Account}>
            <Route name="profile" handler={Profile} />
        </Route>


    </Route>
);

export default routes;