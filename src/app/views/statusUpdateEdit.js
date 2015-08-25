import _ from 'lodash';
import React from 'react/addons';
import Reflux from 'reflux';
import { State, Navigation } from 'react-router';

import statusUpdateActions from 'actions/statusUpdate';

import statusUpdateStore from 'stores/statusUpdate';
import authStore from 'stores/auth';

import formLinkHandlers from 'mixins/formLinkHandlers';

import MarkdownEditor from 'components/markdownEditor';
import Imageable from 'components/imageable';
import ImageableEdit from 'components/imageableEdit';

export default React.createClass( {

    mixins: [
        Navigation,
        State,
        React.addons.LinkedStateMixin,
        formLinkHandlers,
        Reflux.connect( statusUpdateStore, 'statusUpdate' )
    ],

    componentDidMount() {
        statusUpdateActions.getStatusUpdate( this.getParams().id )
            .then( this.checkIfThisIsMyStatusUpdate );
    },

    render() {
        if ( this.state.error ) {
            return (
                <div id="status-update-edit">
                    { this.renderError() }
                </div>
            );
        } else {
            return (
                <div id="status-update-edit">
                    { this.renderStatusUpdate() }
                </div>
            );
        }
    },

    renderStatusUpdate() {
        return (
            <div>
                <legend>Edit Status Update</legend>
                <MarkdownEditor
                    placeholder="Add your status update...."
                    valueLink={ this.linkComponentState( this, 'statusUpdate.update' ) }
                    rows={ 4 }
                    />

                { _.get( this.state, 'statusUpdate.images.length' ) > 0 &&
                    <div className="row">
                        <div className="col-md-12">
                            <legend>Delete Photos?</legend>
                            <ImageableEdit
                                images={ this.state.statusUpdate.images }
                                />
                        </div>
                    </div>
                }

                <legend>Add Photos?</legend>
                <Imageable
                    imageableType='status_updates'
                    startImageUpload={ this.startImageUploadHookFn }
                    OnUploadedCompleted={ this.clearAndRedirect }
                    />

                <div className="btn-toolbar">
                    <button className="btn btn-primary"
                            onClick={ this.updateStatusUpdate }
                            disabled={ this.state.saving }
                        >
                        <i className="fa fa-floppy-o"> Save</i>
                    </button>
                    <button className="btn btn-primary"
                            onClick={ this.clearAndRedirect }
                        >
                        <i className="fa fa-ban"> Cancel</i>
                    </button>
                    <button className="btn btn-warning"
                            onClick={ this.deleteStatusUpdate }
                        >
                        <i className="fa fa-times"> Delete</i>
                    </button>
                </div>

                { this.state.errors &&
                <div className="alert alert-danger text-center animate bounceIn" role="alert">
                    { this.state.errors }
                </div>
                }

            </div>
        );
    },

    renderError() {
        return (
            <div className="error">
                <h2>{ this.state.error }</h2>
            </div>
        );
    },

    startImageUploadHookFn( startImageUploadFn ) {
        this.startImageUpload = startImageUploadFn;
    },

    updateStatusUpdate() {
        this.setState( {
            saving: true
        } );

        statusUpdateActions.updateStatusUpdate( this.state.statusUpdate )
            .then( () => this.startImageUpload( this.state.statusUpdate.id ) );
    },

    deleteStatusUpdate() {
        if ( confirm( 'Delete this status update?' ) ) {
            statusUpdateActions.deleteStatusUpdate( this.state.statusUpdate )
                .then( () => this.transitionTo( 'my-status-updates' ) );
        }
    },

    clearAndRedirect() {
        this.setState( {
            saving: false
        } );

        this.transitionTo( 'status-update', { id: this.state.statusUpdate.id } );
    },

    checkIfThisIsMyStatusUpdate( statusUpdate ) {
        if ( !(authStore.isMyId( statusUpdate.user_id )) ) {
            this.setState( {
                error: 'Sorry, cannot edit another user\'s status update.'
            } );
        }
    }

} );