import React from 'react';
import Reflux from 'reflux';
import { Navigation } from 'react-router';

import recipeActions from 'actions/recipe';
import recipeStore from 'stores/recipe';

import SapCalculator from 'components/sapCalculator';
import FormSaveRecipe from 'components/formSaveRecipe';

export default React.createClass( {

    statics: {
        willTransitionTo: function ( transition, params ) {
            recipeActions.getRecipeById( params.id );
        }
    },

    mixins: [
        Navigation,
        Reflux.connect( recipeStore, 'recipe' )
    ],

    render() {
        return (
            <div id="recipe-edit">
                <SapCalculator
                    recipe={ this.state.recipe }
                    />

                { this.state.recipe.countWeights() > 0 &&
                    <div className="row">
                        <FormSaveRecipe
                            recipe={ this.state.recipe }
                            onSave={ this.saveRecipe }
                            onPrint={ this.printRecipe }
                            />
                    </div>
                }

            </div>
        );
    },

    saveRecipe() {
        function toRecipeView( recipe ) {
            this.transitionTo( 'recipe', { id: recipe.id } );
        }

        recipeActions.updateRecipe( this.state.recipe )
            .then( toRecipeView.bind( this ) );
    },

    printRecipe() {
        this.replaceWith( 'printRecipe', { id: this.state.recipe.getModelValue( 'id' ) } );
    }

} );