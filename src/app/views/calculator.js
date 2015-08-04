import React from 'react';
import Reflux from 'reflux';
import DocMeta from 'react-doc-meta';

import { Navigation } from 'react-router';

import calculatorStore from 'stores/calculator';
import recipeActions from 'actions/recipe';

import SapCalculator from 'components/sapCalculator';
import FormSaveRecipe from 'components/formSaveRecipe';

export default React.createClass( {

    mixins: [
        Navigation,
        Reflux.connect( calculatorStore, 'recipe' )
    ],

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
                    <div className="row">
                        <FormSaveRecipe
                            recipe={ this.state.recipe }
                            onSave={ this.saveRecipe }
                            onPrint={ this.printRecipe }
                            buttonPrint={ true }
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

        recipeActions.createRecipe( this.state.recipe )
            .then( toRecipeView.bind( this ) );
    },

    printRecipe() {
        this.replaceWith( 'print' );
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