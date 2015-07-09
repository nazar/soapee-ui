import React from 'react/addons';
import cx from 'classnames';

import TextEditor from 'components/textEditor';

export default React.createClass( {

    notes: null,

    mixins: [
        React.addons.LinkedStateMixin
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

        nameMissing = !(this.state.name);
        nameClasses = cx( 'form-group', {
            'has-error': nameMissing
        } );

        return (
            <div className="form-save-recipe">
                <form className="form-horizontal" onSubmit={ (e) => e.preventDefault() }>
                    <fieldset>
                        <h4>Save recipe?</h4>

                        <div className="col-md-6">
                            <div className={nameClasses}  >
                                <div className="col-lg-10">
                                    <input type="text"
                                           className="form-control"
                                           id="inputRecipeName"
                                           placeholder="Type recipe name"
                                           valueLink={ this.linkState( 'name' ) }
                                        />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <legend>Recipe Description / Notes</legend>
                            <TextEditor
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
        this.html = notes;
    },

    saveRecipe() {
        this.props.onSave( {
            name: this.state.name,
            notes: this.html
        } );
    },

    printRecipe() {
        this.props.onPrint( {
            name: this.state.name,
            notes: this.html
        } );
    }

} );