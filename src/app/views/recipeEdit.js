import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import { Navigation } from 'react-router';

import recipeActions from 'actions/recipe';
import recipeStore from 'stores/recipe';

import SapCalculator from 'components/sapCalculator';
import FormSaveRecipe from 'components/formSaveRecipe';
import Imageable from 'components/imageable';
import ImageableEdit from 'components/imageableEdit';

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

                { _.get(this.state, 'recipe.recipe.images.length' ) > 0  &&
                    <div className="row">
                        <div className="col-md-12">
                            <legend>Delete Photos?</legend>
                            <ImageableEdit
                                images={ this.state.recipe.recipe.images }
                                />
                        </div>
                    </div>
                }

                { this.state.recipe.countWeights() > 0 &&
                    <div className="row">
                        <FormSaveRecipe
                            recipe={ this.state.recipe }
                            buttonCancel={ true }
                            buttonCaptionSave={ this.saveCaption() }
                            buttonDisabledSave={ this.state.saving }
                            onSave={ this.saveRecipe }
                            onSaveAs={ this.saveAsRecipe }
                            onCancel={ this.goBackToView }
                            />
                    </div>
                }

            </div>
        );
    },

    startImageUploadHookFn( fnToStartUploads ) {
        this.startUploads = fnToStartUploads;
    },

    saveCaption() {
        return this.state.saving ? 'Saving Recipe' : 'Save Recipe';
    },

    saveRecipe() {
        return this.doSaveAction( recipeActions.updateRecipe );
    },

    saveAsRecipe() {
        return this.doSaveAction( recipeActions.createRecipe );
    },

    doSaveAction( action ) {
        this.setState( {
            saving: true
        } );

        recipeStore.calculate();

        return action( this.state.recipe )
            .then( this.toRecipeView.bind( this ) )
            .finally(() => this.setState({
                saving: false
            }));

        function uploadImages() {
            this.startUploads( this.state.recipe.getModelValue( 'id' ) );
        }
    },

    printRecipe() {
        this.replaceWith( 'printRecipe', { id: this.state.recipe.getModelValue( 'id' ) } );
    },

    goBackToView() {
        this.toRecipeView( this.state.recipe.recipe );
    },

    toRecipeView(recipe) {
        this.transitionTo( 'recipe', { id: recipe.id} );
    }

} );