import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import Login from 'views/login';
import Signup from 'views/signup';

import Application from 'views/application';
import MainLanding from 'views/mainLanding';
import Calculator from 'views/calculator';
import Recipes from 'views/recipes';
import Oils from 'views/oils';


let routes = (
    <Route name="home" path="/" handler={Application}>

        <DefaultRoute handler={MainLanding}></DefaultRoute>

        <Route name="login" handler={Login} />
        <Route name="signup" handler={Signup} />

        <Route name="calculator" handler={Calculator} />
        <Route name="recipes" handler={Recipes} />
        <Route name="oils" handler={Oils} />

    </Route>
);

export default routes;