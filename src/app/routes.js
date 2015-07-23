import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import Login from 'views/login';
import Signup from 'views/signup';

import Application from 'views/application';
import Account from 'views/account';
import Calculator from 'views/calculator';
import PrintCalculation from 'views/printCalculation';
import Logout from 'views/logout';
import MainLanding from 'views/mainLanding';
import Oil from 'views/oil';
import Oils from 'views/oils';
import Recipe from 'views/recipe';
import RecipeEdit from 'views/recipeEdit';
import RecipePrint from 'views/recipePrint';
import Recipes from 'views/recipes';

import Profile from 'views/profile';
import MyRecipes from 'views/myRecipes';
import SavedRecipes from 'views/savedRecipes';


let routes = (
    <Route name="home" path="/" handler={Application}>

        <DefaultRoute handler={MainLanding}></DefaultRoute>

        <Route name="login" handler={Login} />
        <Route name="signup" handler={Signup} />
        <Route name="logout" handler={Logout} />

        <Route name="calculator" handler={Calculator} />

        <Route name="recipes" handler={Recipes} />
        <Route path="recipes/:id" name="recipe" handler={Recipe} />
        <Route path="recipes/:id/edit" name="editRecipe" handler={RecipeEdit} />
        <Route path="recipes/:id/print" name="printRecipe" handler={RecipePrint} />

        <Route name="oils" handler={Oils} />
        <Route path="oils/:id" name="oil" handler={Oil} />

        <Route name="print" handler={PrintCalculation} />

        <Route name="account" path="/my" handler={Account}>
            <Route name="profile" handler={Profile} />
            <Route name="my-recipes" handler={MyRecipes} />
            <Route name="saved-recipes" handler={SavedRecipes} />
        </Route>


    </Route>
);

export default routes;