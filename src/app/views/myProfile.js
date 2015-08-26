import _ from 'lodash';
import React from 'react/addons';
import Reflux from 'reflux';
import cx from 'classnames';

import formLinkHandlers from 'mixins/formLinkHandlers';
import ValidateProfileForm from 'services/validateProfileForm';

import meStore from 'stores/me';
import authStore from 'stores/auth';
import myFriendsStore from 'stores/myFriends';

import meActions from 'actions/me';

import UserAvatar from 'components/userAvatar';
import MarkdownEditor from 'components/markdownEditor';

export default React.createClass( {

    mixins: [
        Reflux.connect( meStore, 'profile' ),
        Reflux.connect( myFriendsStore, 'friends' ),
        React.addons.LinkedStateMixin,
        formLinkHandlers
    ],

    getInitialState() {
        return {
            errors: {}
        };
    },

    componentDidMount() {
        meActions.getMyProfile();
    },

    render() {
        let  nameClasses = cx( 'form-group', {
            'has-error': this.state.errors.name
        } );

        document.title = 'Soapee - My Profile';

        return (
            <div id="profile">
                <legend>My Profile</legend>

                <div className="jumbotron clearfix">
                    <form className="form-horizontal" onSubmit={ (e) => e.preventDefault() }>
                        <div className="col-sm-11">
                            <div className={nameClasses}  >
                                { this.renderUsername() }
                                <legend>My Name</legend>
                                <input type="text"
                                       className="form-control"
                                       valueLink={ this.linkStore( meStore, 'name' ) }
                                    />

                                { this.state.errors.name &&
                                    <span className="label label-danger animate bounceIn">{ this.state.errors.name[ 0 ]}</span>
                                }
                            </div>
                        </div>

                        <div className="col-sm-1">
                            <UserAvatar
                                user={ this.state.profile }
                                />
                        </div>

                        <div className="col-sm-12">
                            <div className="form-group">
                                <legend>About Me</legend>
                                <MarkdownEditor
                                    className="input-description"
                                    useCacheForDOMMeasurements
                                    valueLink={ this.linkStore( meStore, 'about' ) }
                                    rows={ 2 }
                                    />
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="form-group">
                                <div className="btn-toolbar action-buttons">
                                    <button className="btn btn-primary" onClick={ this.updateProfile }>Update Profile</button>
                                    <a href={ this.mailToLink() } className="btn btn-primary">Invite a friend to Soapee</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                { this.renderMyFriends() }
            </div>
        );
    },

    renderMyFriends() {
        function renderFriend( user ) {
            return (
                <a href={ `/users/${user.id}` } className="friend-profile-link">
                    <UserAvatar
                        user={ user }
                        showTooltip={ true }
                        />
                </a>
            );
        }

        if ( this.state.friends.length ) {
            return (
                <div className="friends">
                    <legend>My Friends</legend>
                    { _.map( this.state.friends, renderFriend, this ) }
                </div>
            );
        }
    },

    renderUsername() {
        let profile = this.state.profile;

        if ( profile.verifications && profile.verifications.length === 1 ) {
            return (
                <div className="username">
                    <legend>My Username</legend>
                    <strong>{ profile.verifications[0].provider_id }</strong>
                </div>
            );
        }
    },

    updateProfile() {
        function validateForm() {
            return new ValidateProfileForm( {
                name: this.state.profile.name
            } )
                .execute();
        }

        function save() {
            return meActions.updateMyProfile( {
                name: this.state.profile.name,
                about: this.state.profile.about
            } );
        }

        function successNotification() {
            $.bootstrapGrowl( 'Profile Updated', { type: 'warning', delay: 5000 } );
        }

        function setErrors( e ) {
            if ( e.name === 'CheckitError' ) {
                this.setState( {
                    errors: e.toJSON()
                } );
            }
        }

        this.setState( {
            errors: {}
        } );

        validateForm.call( this )
            .then( save.bind( this ) )
            .then( successNotification )
            .catch( setErrors.bind( this ) );
    },

    mailToLink() {
        let subject;
        let body;

        subject = `Check out the Soapee calculator and soap recipes`;
        body = `You can register on Soapee here: http://soapee.com/signup

        Once you've registered, check out my Soapee profile here: http://soapee.com/users/${authStore.userId()} and press the "Add Friend" button to connect with me.

        You'll be able to see my soap recipes once you've connected.

        ${authStore.userName()}
        `;

        body = encodeURIComponent(body);

        return `mailto:?subject=${subject}&body=${body}`;
    }

} );

