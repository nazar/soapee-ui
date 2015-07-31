import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import DocMeta from 'react-doc-meta';

import recipesStore from 'stores/recipes';

import RecipeListItem from 'components/recipeListItem';
import Spinner from 'components/spinner';

export default React.createClass( {

    mixins: [
        Reflux.connect( recipesStore, 'recipes' )
    ],

    componentDidMount() {
        document.title = 'Soapee - Recipes';
    },

    render() {
        return (
            <div id="recipes">
                <DocMeta tags={ this.tags() } />
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
            <div  key={ `recipe-list-item-${recipe.id}` }>
                <RecipeListItem
                    recipe={recipe}
                    showUser={ true }
                    />
            </div>
        );
    },

    tags() {
        let description = 'Soapee Community Soap Recipes';

        return [
            {name: 'description', content: description},
            {name: 'twitter:card', content: description},
            {name: 'twitter:title', content: description},
            {property: 'og:title', content: description}
        ];
    }


} );