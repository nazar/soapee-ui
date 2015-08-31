import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import meFriendsRecipesStore from 'stores/myFriendsRecipes';
import meActions from 'actions/me';

import RecipeListItem from 'components/recipeListItem';
import Spinner from 'components/spinner';



export default React.createClass( {

    mixins: [
        Reflux.connect( meFriendsRecipesStore, 'recipes' )
    ],

    componentDidMount() {
        meActions.getMyFriendsRecipes();
    },

    render() {
        document.title = 'Soapee - My Friend\'s Recipes';

        return (
            <div id="my-friends-recipes">
                <legend>My Friend's Recipes</legend>

                { this.renderLoading() }
                { this.renderRecipes() }
            </div>
        );
    },

    renderLoading() {
        if ( !(this.state.recipes) ) {
            return <Spinner />;
        }
    },

    renderRecipes() {
        let lengthRecipes = _.get(this.state.recipes, 'length', 0);

        if ( lengthRecipes > 0 ) {
            return _.map( this.state.recipes, this.renderRecipe );
        } else if ( lengthRecipes === 0 ) {
            return (
                <div className="jumbotron">
                    No recipes found.
                </div>
            );
        }
    },

    renderRecipe( recipe ) {
        return (
            <div key={ `recipe-${ recipe.id }` }>
                <RecipeListItem
                    showUser={ true }
                    recipe={recipe}
                    />
            </div>
        );
    }


} );