import Reflux from 'reflux';

import userProfileStore from 'stores/userProfile';
import userActions from 'actions/user';

export default Reflux.createStore( {

    store: null,

    init() {
        this.listenTo( userProfileStore, gotUserProfile.bind( this ) );
        this.listenTo( userActions.getRecipes.completed, gotRecipes.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

} );

///////////////////
////

function gotUserProfile( user ) {
    userActions.getRecipes( user );
}

function gotRecipes( recipes ) {
    this.store = recipes;
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}