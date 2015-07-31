import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';

import meStore from 'stores/me';
import meActions from 'actions/me';

import RecipeListItem from 'components/recipeListItem';
import Spinner from 'components/spinner';



export default React.createClass( {

    mixins: [
        Reflux.connect( meStore, 'profile' )
    ],

    componentDidMount() {
        meActions.getMyFavouriteRecipes();
    },

    render() {
        document.title = 'Soapee - Saved Recipes';

        return (
            <div id="my-recipes">
                <legend>My Favourite Recipes</legend>

                { this.renderLoading() }
                { this.renderRecipes() }
            </div>
        );
    },

    renderLoading() {
        if ( !(this.state.profile.myFavouriteRecipes) ) {
            return <Spinner />;
        }
    },

    renderRecipes() {
        let lengthRecipes = _.get(this.state.profile.myFavouriteRecipes, 'length', 0);

        if ( lengthRecipes > 0 ) {
            return _( this.state.profile.myFavouriteRecipes )
                .sortBy( 'created_at' )
                .reverse()
                .map( this.renderRecipe )
                .value();
        } else if ( lengthRecipes === 0 ) {
            return (
                <div className="jumbotron">
                    No Recipes found. Add other member's <Link to="recipes">recipes</Link> to your favourites to view them here.
                </div>
            );
        }
    },

    renderRecipe( recipe ) {
        return (
            <div key={ `recipe-${ recipe.id }` }>
                <RecipeListItem
                    recipe={recipe}
                    showUser={ true }
                    />
            </div>
        );
    }


} );