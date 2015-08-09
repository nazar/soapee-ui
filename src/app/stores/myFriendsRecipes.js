import Reflux from 'reflux';

import meActions from 'actions/me';

export default Reflux.createStore( {

    store: [],

    init() {
        this.listenTo( meActions.getMyFriendsRecipes.completed, gotRecipes.bind( this ) );
        this.listenTo( meActions.addFriend.completed, getFriends.bind( this ) );
    },

    getInitialState() {
        return this.store;
    }

} );

//////////////////////////
//// Private

function getFriends() {
    meActions.getMyFriendsRecipes();
}

function gotRecipes( recipes ) {
    this.store = recipes;
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.store );
}