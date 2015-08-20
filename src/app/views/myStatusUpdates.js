import _ from 'lodash';
import moment from 'moment';
import React from 'react/addons';
import Reflux from 'reflux';
import { Link } from 'react-router';

import meActions from 'actions/me';

import myStatusUpdatesStore from 'stores/myStatusUpdates';

import ValidateComment from 'services/validateComment';

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
        }
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
                    <button className="btn btn-primary" onClick={ this.addStatusUpdate }><i className="fa fa-plus"> Add a Status Update</i></button>
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
        return _.map( this.state.statusUpdates, this.renderStatusUpdate )
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

                <div className="actions">
                    <span>
                        <Link to="status-update" params={ { id: statusUpdate.id } }><i className="fa fa-eye"> View</i></Link>
                    </span>
                </div>
            </div>
        );
    },

    addStatusUpdate() {

        validate.call( this )
            .then( createStatusUpdate.bind( this ) )
            .then( clear.bind( this ) )
            .catch( this.showError );

        function validate() {
            return new ValidateComment( {
                comment: this.state.statusUpdate
            } )
                .execute();
        }

        function createStatusUpdate() {
            return meActions.addStatusUpdate( this.state.statusUpdate );
        }

        function clear() {
            this.setState( { statusUpdate: '' } );
        }


        this.setState( {
            errors: null
        } );

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