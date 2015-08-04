import Reflux from 'reflux';

import {
    getProfile,
    getRecipes
} from 'resources/users';

let actions = Reflux.createActions( {
    getProfile: { asyncResult: true },
    getRecipes: { asyncResult: true }
} );

export default actions;

actions.getProfile.listenAndPromise( getProfile );
actions.getRecipes.listenAndPromise( getRecipes );