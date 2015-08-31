import Reflux from 'reflux';
import ga from 'react-ga';

import authActions from 'actions/auth';
import recipeActions from 'actions/recipe';

export default Reflux.createStore( {

    init() {
        //User
        this.listenTo( authActions.signupOrLoginThirdParty.completed, analytics.bind( this, 'Users', 'signupOrLoginThirdParty' ) );
        this.listenTo( authActions.signupLocal.completed, analytics.bind( this, 'Users', 'signupLocal' ) );
        this.listenTo( authActions.loginLocal.completed, analytics.bind( this, 'Users', 'loginLocal' ) );

        //Recipes
        this.listenTo( recipeActions.createRecipe, analytics.bind( this, 'Recipes', 'createRecipe' ) );
        this.listenTo( recipeActions.updateRecipe.completed, analytics.bind( this, 'updateRecipe' ) );
        this.listenTo( recipeActions.deleteRecipe.completed, analytics.bind( this, 'deleteRecipe' ) );
    }
} );


//////////////////////////
//// Private

function analytics( category, action ) {
    ga.event( {
        category,
        action
    } );
}