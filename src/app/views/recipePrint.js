import React from 'react';
import Reflux from 'reflux';
import { Navigation, State } from 'react-router';

import recipeStore from 'stores/recipe';
import recipeActions from 'actions/recipe';

import RecipePrintArea from 'components/recipePrintArea';

export default React.createClass( {

    mixins: [
        Navigation,
        State,
        Reflux.connect( recipeStore, 'recipe' )
    ],

    componentDidMount() {
        let recipe;

        function print() {
            return window.print();
        }

        function redirectBack() {
            this.replaceWith( 'recipe', { id: this.getParams().id } );
        }

        recipe = recipeActions.getRecipeById( this.getParams().id );

        if ( this.getQuery().preview !== 'true' ) {
            recipe
                .with( this )
                .then( print )
                .then( redirectBack );
        }
    },

    render() {
        return (
            <div id="recipe-print">
                <RecipePrintArea
                    recipe={ this.state.recipe }
                    />
            </div>
        );
    }

} );