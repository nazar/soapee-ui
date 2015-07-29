import React from 'react/addons';
import Reflux from 'reflux';
import cx from 'classnames';

import authStore from 'stores/auth';
import formLinkHandlers from 'mixins/formLinkHandlers';

import ValidateRecipeFormFields from 'services/validateRecipeFormFields';

import BootstrapModalLink from 'components/bootstrapModalLink';
import MarkdownEditor from 'components/markdownEditor';

import SignupOrLoginToSaveRecipe from 'modals/signupOrLoginToSaveRecipe';

export default React.createClass( {

    notes: null,

    mixins: [
        Reflux.connect( authStore, 'user' ),
        React.addons.LinkedStateMixin,
        formLinkHandlers
    ],

    getInitialState() {
        return {
            name: '',
            errors: {}
        };
    },

    render() {
        let  nameClasses = cx( 'form-group', {
            'has-error': this.state.errors.name
        } );

        return (
            <div className="form-save-recipe">
                <form className="form-horizontal" onSubmit={ (e) => e.preventDefault() }>
                    <fieldset>
                        <legend>Save recipe?</legend>

                        <div className="col-md-12">
                            <legend>Recipe Name</legend>
                            <div className={nameClasses}  >
                                <div className="col-lg-10">
                                    <input type="text"
                                           className="form-control"
                                           id="inputRecipeName"
                                           placeholder="Type recipe name"
                                           valueLink={ this.linkModel( this.props.recipe, 'name' ) }
                                        />

                                    { this.state.errors.name &&
                                        <span className="label label-danger animate bounceIn">{ this.state.errors.name[ 0 ]}</span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <legend>Recipe Description</legend>
                            <MarkdownEditor
                                className="input-description"
                                valueLink={ this.linkModel( this.props.recipe, 'description' ) }
                                placeholder="Add a short description"
                                rows="10"
                                />
                        </div>

                        <div className="col-md-12">
                            <legend>Recipe Notes / Method </legend>
                            <MarkdownEditor
                                className="input-description"
                                valueLink={ this.linkModel( this.props.recipe, 'notes' ) }
                                placeholder="Add a short description"
                                rows="20"
                                />
                        </div>


                        <div className="col-sm-12">
                            <div className="btn-toolbar action-buttons">
                                {this.renderSaveRecipeButton()}
                                <button className="btn btn-primary" onClick={ this.printRecipe }>Print Recipe</button>
                            </div>
                        </div>

                    </fieldset>
                </form>
            </div>
        );
    },

    renderSaveRecipeButton() {
        let nameMissing = !(this.props.recipe.getModelValue( 'name' ));

        if ( authStore.isAuthenticated() ) {
            return <button className="btn btn-primary" onClick={ this.saveRecipe } disabled={nameMissing}>Save Recipe</button>;
        } else {
            return (
                <BootstrapModalLink
                    elementToClick={<button className="btn btn-primary" disabled={nameMissing}>Save Recipe</button>}
                    modal={SignupOrLoginToSaveRecipe}
                    />
            );
        }
    },

    saveRecipe() {

        function validateForm() {
            return new ValidateRecipeFormFields( {
                name: this.props.recipe.getModelValue( 'name' )
            } )
                .execute();
        }

        this.setState( {
            errors: {}
        } );

        validateForm.call( this )
            .then( this.props.onSave )
            .catch( setErrors.bind( this ) );
    },

    printRecipe() {
        setTimeout( () => {
            this.props.onPrint();
        } );
    }

} );

///////////////
///

function setErrors( e ) {
    if ( e.name === 'CheckitError' ) {
        this.setState( {
            errors: e.toJSON()
        } );
    }
}
