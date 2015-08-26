import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import { State, Link } from 'react-router';
import { Button } from 'react-bootstrap';

import userActions from 'actions/user';
import meActions from 'actions/me';

import userProfileStore from 'stores/userProfile';
import userRecipesStore from 'stores/userRecipes';
import userFriendsStore from 'stores/userFriends';
import authStore from 'stores/auth';

import UserAvatar from 'components/userAvatar';
import MarkedDisplay from 'components/markedDisplay';
import RecipesLinkTable from 'components/recipesLinkTable';
import Spinner from 'components/spinner';

export default React.createClass( {

    statics: {
        willTransitionTo: function ( transition, params ) {
            userActions.getProfile( params.id );
        }
    },

    mixins: [
        State,
        Reflux.connect( userProfileStore, 'user' ),
        Reflux.connect( userRecipesStore, 'recipes' ),
        Reflux.connect( userFriendsStore, 'friends' )
    ],

    getInitialState() {
        return {
            display: {
                addFriend: true
            }
        };
    },

    render() {
        return (
            <div id="user-profile">
                { this.renderLoading() }
                { this.renderUserProfile() }
            </div>
        );
    },

    renderUserProfile() {
        let user = this.state.user;

        if ( this.pageIsForUser() ) {
            return (
                <div className="user-profile">
                    <legend>{ user.name } Public Profile</legend>
                    <div className="profile-avatar">
                        <UserAvatar
                            user={ user }
                            />
                    </div>

                    { user.about &&
                    <div className="jumbotron compact">
                        <MarkedDisplay
                            content={ user.about }
                            />
                    </div>
                    }

                    { this.renderFriends() }

                    { this.renderUserRecipes() }
                </div>
            );
        }
    },

    renderFriends() {
        let addFriendButton;
        let willRender;

        function renderFriend( user ) {
            return (
                <Link className="friend-profile-link" to="userProfile" params={ { id: user.id } }>
                    <UserAvatar
                        user={ user }
                        showTooltip={ true }
                        />
                </Link>
            );
        }

        if ( this.state.display.addFriend && this.isNotMe() && userFriendsStore.iAmNotFriendOfUser() ) {
            if ( authStore.isAuthenticated() ) {
                addFriendButton = (
                    <Button bsStyle="primary"
                            onClick={ this.addFriend }
                            className="button-add-friend"
                        >
                        <i className="fa fa-smile-o"> Add Friend</i>
                    </Button>
                );
            }
        }

        willRender = typeof addFriendButton !== 'undefined' || this.state.friends.length > 0;

        return (
            <div className="friends clearfix">
                { willRender && <legend>Friends</legend> }
                { addFriendButton }
                { _.map( this.state.friends, renderFriend, this ) }
            </div>
        );
    },

    renderUserRecipes() {
        if ( this.state.recipes.length ) {
            return (
                <div className="user-recipes">
                    <legend>Public Recipes</legend>
                    <RecipesLinkTable
                        recipes={ this.state.recipes }
                        />

                </div>
            );
        }
    },

    renderLoading() {
        if ( !(this.pageIsForUser()) ) {
            return <Spinner />;
        }
    },

    pageIsForUser() {
        let requested = Number( this.getParams().id );
        let got = Number( _.get( this.state.user, 'id' ) );

        return requested === got;
    },

    isNotMe() {
        return !(authStore.isMyId( _.get( this.state.user, 'id' ) ));
    },

    addFriend() {
        meActions.addFriend( this.state.user )
            .then( this.hideAddFriend )
            .then( this.notifySent )
            .catch( this.showError );
    },

    hideAddFriend() {
        this.setState( {
            display: {
                addFriend: false
            }
        } );
    },

    notifySent() {
        $.bootstrapGrowl( `Friend Request Sent to ${this.state.user.name}`, { type: 'warning', delay: 5000 } );
    },

    showError( e ) {
        if ( e.status === 422 ) {
            $.bootstrapGrowl( `Friend Request has already been sent to ${this.state.user.name}`, { type: 'danger', delay: 5000 } );
        } else {
            $.bootstrapGrowl( 'Unknown error has occurred. Please contact us on our Facebook Page or sub-Reddit; links are in the home page', { type: 'danger', delay: 5000 } );
        }
    }


} );