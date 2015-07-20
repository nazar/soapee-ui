import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';

import recipesStore from 'stores/recipes';

import RecipeListItem from 'components/recipeListItem';
import Spinner from 'components/spinner';

export default React.createClass( {

    mixins: [
        Reflux.connect( recipesStore, 'recipes' )
    ],

    render() {
        return (
            <div id="recipes">
                <h1>Latest Soap Recipes</h1>

                { this.renderLoading() }
                { this.renderRecipes() }
            </div>
        );
    },

    renderLoading() {
        if ( !(this.state.recipes.length > 0) ) {
            return <Spinner />;
        }
    },

    renderRecipes() {
        if ( this.state.recipes.length > 0 ) {
            return _( this.state.recipes )
                .sortBy( 'created_at' )
                .reverse()
                .map( this.renderRecipe )
                .value();
        }
    },

    renderRecipe( recipe ) {
        return (
            <RecipeListItem
                recipe={recipe}
                />
        );
    }

} );