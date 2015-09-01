import _ from 'lodash';
import moment from 'moment';
import React from 'react/addons';
import Reflux from 'reflux';
import { Link } from 'react-router';

import meActions from 'actions/me';
import statusUpdateActions from 'actions/statusUpdate';

import myStatusUpdatesStore from 'stores/myStatusUpdates';

import ValidateComment from 'services/validateComment';

import Imageable from 'components/imageable';
import ImageableThumbnails from 'components/imageableThumbnails';
import MarkdownEditor from 'components/markdownEditor';
import MarkedDisplay from 'components/markedDisplay';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass( {

    mixins: [
        React.addons.LinkedStateMixin,
        Reflux.connect( myStatusUpdatesStore, 'statusUpdates' )
    ],

    getInitialState() {
        return {
            statusUpdate: null
        };
    },

    componentDidMount() {
        meActions.getMyStatusUpdates();
    },

    render() {
        document.title = 'Soapee - My Status Updates';
        return (
            <div id="my-status-updates">
                <div className="add-status-update">
                    <legend>Add a Status Update</legend>
                    <MarkdownEditor
                        placeholder="Add your status update...."
                        valueLink={ this.linkState( 'statusUpdate' ) }
                        rows={ 4 }
                        />

                    <legend>Add Photos</legend>
                    <Imageable
                        imageableType='status_updates'
                        startImageUpload={ this.startImageUploadHookFn }
                        OnUploadedCompleted={ this.clearAndReload }
                        />
                    <button className="btn btn-primary"
                            onClick={ this.addStatusUpdate }
                            disabled={ this.state.saving }
                        >
                        <i className="fa fa-plus"> Add a Status Update</i>
                    </button>
                </div>

                { this.state.errors &&
                    <div className="alert alert-danger text-center animate bounceIn" role="alert">
                        { this.state.errors }
                    </div>
                }

                <div className="status-updates">
                    <legend>My Status Updates</legend>
                    <ReactCSSTransitionGroup  transitionName="zoom">
                        { this.renderStatusUpdates() }
                    </ReactCSSTransitionGroup>
                </div>


            </div>
        );
    },

    renderStatusUpdates() {
        return _.map( this.state.statusUpdates, this.renderStatusUpdate );
    },

    renderStatusUpdate( statusUpdate ) {
        return (
            <div className="status-update" key={statusUpdate.id}>
                <div className="info">
                    Posted on {moment(statusUpdate.created_at).format('LLL')}
                </div>

                <MarkedDisplay
                    content={statusUpdate.update}
                    />

                <ImageableThumbnails
                    images={ statusUpdate.images }
                    />

                <div className="btn-toolbar actions">
                    <Link className="btn btn-primary btn-xs" to="status-update" params={ { id: statusUpdate.id } }><i className="fa fa-eye"> View</i></Link>
                    <Link className="btn btn-primary btn-xs" to="status-update-edit" params={ { id: statusUpdate.id } }><i className="fa fa-pencil-square-o"> Edit</i></Link>
                </div>
            </div>
        );
    },

    startImageUploadHookFn( fnToStartUploads ) {
        this.startUploads = fnToStartUploads;
    },

    saveCaption() {
        return this.state.saving ? 'Saving Recipe' : 'Save Recipe';
    },

    addStatusUpdate() {
        let newUpdate;

        this.setState( {
            errors: null,
            saving: true
        } );

        validate.call( this )
            .with( this )
            .then( createStatusUpdate )
            .then( data => newUpdate = data )
            .then( uploadImages )
            .catch( this.showError );


        function validate() {
            return new ValidateComment( {
                comment: this.state.statusUpdate
            } ).execute();
        }

        function createStatusUpdate() {
            return statusUpdateActions.addStatusUpdate( this.state.statusUpdate );
        }

        function uploadImages() {
            this.startUploads( newUpdate.id );
        }
    },

    clearAndReload() {
        this.setState( {
            statusUpdate: '',
            saving: false
        } );

        meActions.getMyStatusUpdates();
    },

    showError( e ) {
        if ( e.name === 'CheckitError' ) {
            this.setState( {
                errors: e.toJSON()
            } );
        } else  {
            this.setState( {
                errors: 'Ooops. Something went wrong!!1'
            } );
        }
    }

} );