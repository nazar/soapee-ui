import React from 'react/addons';
import Reflux from 'reflux';
import cx from 'classnames';

import recipeActions from 'actions/recipe';
import recipeStore from 'stores/recipe';
import formLinkHandlers from 'mixins/formLinkHandlers';
import TextEditor from 'components/textEditor';

export default React.createClass( {

    notes: null,

    mixins: [
        Reflux.connectFilter( recipeStore, 'recipe', extractName ),
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
        let nameClasses;
        let nameMissing;

        nameMissing = !(this.state.recipe.name);
        nameClasses = cx( 'form-group', {
            'has-error': nameMissing
        } );

        return (
            <div className="form-save-recipe">
                <form className="form-horizontal" onSubmit={ (e) => e.preventDefault() }>
                    <fieldset>
                        <legend>Save recipe?</legend>

                        <div className="col-md-6">
                            <div className={nameClasses}  >
                                <div className="col-lg-10">
                                    <input type="text"
                                           className="form-control"
                                           id="inputRecipeName"
                                           placeholder="Type recipe name"
                                           valueLink={ this.linkStore( recipeStore, 'name' ) }
                                        />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <legend>Recipe Description / Notes</legend>
                            <TextEditor
                                content={ this.state.recipe.notes }
                                onHtml={ this.setNotes }
                                />
                        </div>


                        <div className="col-sm-12">
                            <div className="btn-toolbar">
                                <button className="btn btn-primary" onClick={ this.saveRecipe } disabled={nameMissing}>Save Recipe</button>
                                <button className="btn btn-primary" onClick={ this.printRecipe }>Print Recipe</button>
                            </div>
                        </div>

                    </fieldset>
                </form>
            </div>
        );
    },

    setNotes( notes ) {
        this.notes = notes;
    },

    saveRecipe() {
        recipeActions.setNotes( this.notes );
        this.props.onSave();
    },

    printRecipe() {
        recipeActions.setNotes( this.notes );
        this.props.onPrint();
    }

} );

//////////////////////
///// Private

function extractName( store ) {
    return {
        name: store.name,
        notes: store.notes
    };
}
