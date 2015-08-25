import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import DocMeta from 'react-doc-meta';
import Pager from 'react-pager';

import recipeActions from 'actions/recipe';
import recipesStore from 'stores/recipes';

import RecipeListItem from 'components/recipeListItem';
import Spinner from 'components/spinner';

export default React.createClass( {

    mixins: [
        Reflux.connect( recipesStore, 'recipes' )
    ],

    getInitialState() {
        return {
            activePage: 0
        };
    },

    componentDidMount() {
        document.title = 'Soapee - Recipes';
        recipeActions.getRecipes();
    },

    render() {
        return (
            <div id="recipes">
                <DocMeta tags={ this.tags() } />
                <h1>Latest Public Soap Recipes</h1>

                { this.renderLoading() }
                { this.renderRecipes() }

                { this.paginator() }
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

    paginator() {
        if ( this.state.recipes.length > 0 ) {
            return (
                <Pager
                    total={ recipesStore.totalPages() }
                    current={this.state.activePage}
                    visiblePages={5}
                    onPageChanged={this.onPageChanged}
                    />
            );
        }
    },

    onPageChanged: function( page ) {
        this.setState( {
            activePage: page
        } );

        recipeActions.getRecipes( {
            page
        } );
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