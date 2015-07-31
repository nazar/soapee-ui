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
        meActions.getMyRecipes();
    },

    render() {
        document.title = 'Soapee - My Recipes';

        return (
            <div id="my-recipes">
                <legend>My Recipes</legend>

                { this.renderLoading() }
                { this.renderRecipes() }
            </div>
        );
    },

    renderLoading() {
        if ( !(this.state.profile.myRecipes) ) {
            return <Spinner />;
        }
    },

    renderRecipes() {
        let lengthRecipes = _.get(this.state.profile.myRecipes, 'length', 0);

        if ( lengthRecipes > 0 ) {
            return _( this.state.profile.myRecipes )
                .sortBy( 'created_at' )
                .reverse()
                .map( this.renderRecipe )
                .value();
        } else if ( lengthRecipes === 0 ) {
            return (
                <div className="jumbotron">
                    No recipes found. Use the <Link to="calculator">calculator</Link> to add recipes to your profile.
                </div>
            );
        }
    },

    renderRecipe( recipe ) {
        return (
            <div key={ `recipe-${ recipe.id }` }>
                <RecipeListItem
                    recipe={recipe}
                    />
            </div>
        );
    }


} );