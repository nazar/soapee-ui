import React from 'react';
import Reflux from 'reflux';
import DocMeta from 'react-doc-meta';

import { Navigation } from 'react-router';

import calculatorStore from 'stores/calculator';
import recipeActions from 'actions/recipe';

import FormSaveRecipe from 'components/formSaveRecipe';
import Imageable from 'components/imageable';
import SapCalculator from 'components/sapCalculator';

export default React.createClass( {

    mixins: [
        Navigation,
        Reflux.connect( calculatorStore, 'recipe' )
    ],

    getInitialState() {
        return {
            saving: false
        };
    },

    componentDidMount() {
        document.title = 'Soapee - Lye Calculator';
    },

    render() {
        return (
            <div id="calculator">
                <DocMeta tags={ this.tags() } />
                <SapCalculator
                    recipe={ this.state.recipe }
                    />

                { this.state.recipe.countWeights() > 0 &&
                    <div>
                        <legend>Recipe Images</legend>
                        <Imageable
                            imageableType='recipes'
                            startImageUpload={ this.startImageUploadHookFn }
                            OnUploadedCompleted={ this.showRecipe }
                            />
                    </div>
                }

                { this.state.recipe.countWeights() > 0 &&
                    <div className="row">
                        <FormSaveRecipe
                            recipe={ this.state.recipe }
                            buttonPrint={ true }
                            buttonReset={ true }
                            buttonCaptionSave={ this.saveCaption() }
                            buttonDisabledSave={ this.state.saving }
                            onSave={ this.saveRecipe }
                            onPrint={ this.printRecipe }
                            onPrintPreview={ this.printPreviewRecipe }
                            onReset={ this.resetRecipe }
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
        function uploadImages() {
            this.startUploads( this.newRecipe.id );
        }

        this.setState( {
            saving: true
        } );

        recipeActions.createRecipe( this.state.recipe )
            .then( recipe => this.newRecipe = recipe )
            .then( uploadImages.bind( this ) );
    },

    showRecipe() {
        this.resetRecipe();
        this.transitionTo( 'recipe', { id: this.newRecipe.id } );
    },

    printRecipe() {
        this.replaceWith( 'print' );
    },

    printPreviewRecipe() {
        this.transitionTo( 'print', null, { preview: true } );
    },

    resetRecipe() {
        recipeActions.resetRecipe();
    },

    tags() {
        let description = 'Soapee Lye Calculator';

        return [
            {name: 'description', content: description},
            {name: 'twitter:card', content: description},
            {name: 'twitter:title', content: description},
            {property: 'og:title', content: description}
        ];
    }

} );