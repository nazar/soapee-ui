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
        document.title = 'Soapee - Edit';

        return (
            <div id="recipe-edit">
                <SapCalculator
                    recipe={ this.state.recipe }
                    />

                { this.state.recipe.countWeights() > 0 &&
                    <div className="row">
                        <FormSaveRecipe
                            recipe={ this.state.recipe }
                            buttonCancel={ true }
                            onSave={ this.saveRecipe }
                            onSaveAs={ this.saveAsRecipe }
                            onCancel={ this.goBackToView }
                            />
                    </div>
                }

            </div>
        );
    },

    saveRecipe() {
        recipeStore.calculate();

        recipeActions.updateRecipe( this.state.recipe )
            .then( this.toRecipeView );
    },

    saveAsRecipe() {
        recipeActions.createRecipe( this.state.recipe )
            .then( this.toRecipeView );
    },

    printRecipe() {
        this.replaceWith( 'printRecipe', { id: this.state.recipe.getModelValue( 'id' ) } );
    },

    goBackToView() {
        this.toRecipeView( this.state.recipe.recipe );
    },

    toRecipeView( recipe ) {
        this.transitionTo( 'recipe', { id: recipe.id } );
    }

} );