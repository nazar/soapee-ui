import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import Login from 'views/login';
import Signup from 'views/signup';

import Account from 'views/account';
import Application from 'views/application';
import Calculator from 'views/calculator';
import Logout from 'views/logout';
import MainLanding from 'views/mainLanding';
import Oil from 'views/oil';
import Oils from 'views/oils';
import PrintCalculation from 'views/printCalculation';
import Recipe from 'views/recipe';
import RecipeEdit from 'views/recipeEdit';
import RecipePrint from 'views/recipePrint';
import Recipes from 'views/recipes';
import Resources from 'views/resources';
import UserProfile from 'views/userProfile';

import Profile from 'views/profile';
import MyComments from 'views/myComments';
import MyRecipes from 'views/myRecipes';
import SavedRecipes from 'views/savedRecipes';


let routes = (
    <Route name="home" path="/" handler={Application}>

        <DefaultRoute handler={MainLanding} />

        <Route name="login" handler={Login} />
        <Route name="signup" handler={Signup} />
        <Route name="logout" handler={Logout} />

        <Route name="calculator" handler={Calculator} />

        <Route name="recipes" handler={Recipes} />
        <Route name="recipe" path="recipes/:id" handler={Recipe} />
        <Route name="editRecipe" path="recipes/:id/edit" handler={RecipeEdit} />
        <Route name="printRecipe" path="recipes/:id/print" handler={RecipePrint} />

        <Route name="oils" handler={Oils} />
        <Route name="oil" path="oils/:id" handler={Oil} />

        <Route name="print" handler={PrintCalculation} />

        <Route name="resources" handler={Resources} />

        <Route name="userProfile" path="users/:id" handler={UserProfile} />

        <Route name="account" path="/my" handler={Account}>
            <Route name="profile" handler={Profile} />
            <Route name="my-recipes" handler={MyRecipes} />
            <Route name="saved-recipes" handler={SavedRecipes} />
            <Route name="my-comments" handler={MyComments} />
        </Route>

    </Route>
);

export default routes;