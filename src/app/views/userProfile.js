import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import { State } from 'react-router';

import userActions from 'actions/user';
import userProfileStore from 'stores/userProfile';
import userRecipesStore from 'stores/userRecipes';

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
        Reflux.connect( userRecipesStore, 'recipes' )
    ],

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
                    <UserAvatar
                        user={ user }
                        />
                    { user.about &&
                        <div className="jumbotron">
                            <MarkedDisplay
                                content={ user.about }
                                />
                        </div>
                    }
                    { this.renderUserRecipes() }
                </div>
            );
        }
    },

    renderUserRecipes() {
        if ( this.state.recipes ) {
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
    }


} );