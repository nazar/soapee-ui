import moment from 'moment';
import React from 'react';
import Reflux from 'reflux';
import { Link, State, Navigation } from 'react-router';

import statusUpdateActions from 'actions/statusUpdate';

import statusUpdateStore from 'stores/statusUpdate';
import statusUpdateCommentStore from 'stores/statusUpdateComments';
import authStore from 'stores/auth';

import Commentable from 'components/commentable';
import ImageableCarousel from 'components/imageableCarousel';
import MarkedDisplay from 'components/markedDisplay';
import Spinner from 'components/spinner';
import UserAvatar from 'components/userAvatar';

export default React.createClass( {

    mixins: [
        Navigation,
        State,
        Reflux.connect( statusUpdateStore, 'statusUpdate' )
    ],

    componentDidMount() {
        statusUpdateActions.getStatusUpdate( this.getParams().id )
            .then( statusUpdateActions.getStatusUpdateComments );
    },

    render() {
        document.title = 'Soapee - Status Update';

        return (
            <div id="status-update">
                <ol className="breadcrumb">
                    <li><Link to="home">Home</Link></li>
                    <li className="active">Status Update</li>
                </ol>

                { this.renderLoading() }
                { this.renderStatusUpdate() }
            </div>
        );
    },

    renderLoading() {
        if ( !(this.state.statusUpdate) ) {
            return <Spinner />;
        }
    },

    renderStatusUpdate() {
        let {statusUpdate} = this.state;

        if ( statusUpdate ) {
            return (
                <div className="status-update">
                    <legend>Status Update</legend>

                    <div className="media">
                        <div className="media-left">
                            <UserAvatar
                                user={ statusUpdate.user }
                                />
                        </div>
                        <div className="media-body">
                            <div className="about">
                                <span className="user">
                                    <Link to="userProfile" params={ { id: statusUpdate.user_id } }>{ statusUpdate.user.name }</Link>
                                </span>
                                <span className="time"
                                      title={ moment( statusUpdate.created_at ).format( 'LLLL' ) }
                                    >
                                    &nbsp;posted { moment( statusUpdate.created_at ).fromNow() }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="status-update-content">
                        <MarkedDisplay
                            content={ statusUpdate.update }
                            />
                    </div>

                    { statusUpdate.images.length > 0 &&
                        <div className="col-md-12">
                            <div className="row">
                                <legend>Photos</legend>
                                <div className="col-md-10 col-md-offset-1">
                                    <ImageableCarousel
                                        images={ statusUpdate.images}
                                        />
                                </div>
                            </div>
                        </div>
                    }

                    { authStore.isMyId( statusUpdate.user_id ) &&
                        <div className="btn-toolbar actions">
                            <button className="btn btn-primary" onClick={this.editStatusUpdate}><i className="fa fa-pencil-square-o"> Edit Status Update</i></button>
                        </div>
                    }

                    <legend>Comments</legend>

                    <Commentable
                        store={statusUpdateCommentStore}
                        />
                </div>

            );
        }
    },

    editStatusUpdate() {
        this.transitionTo( 'status-update-edit', { id: this.state.statusUpdate.id } );
    }

} );