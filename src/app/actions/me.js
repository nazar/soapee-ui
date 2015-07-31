import Reflux from 'reflux';

import {
    getMyProfile,
    updateMyProfile,

    getMyRecipes,
    getMyFavouriteRecipes,

    getComments,

    addRecipeToFavourites,
    removeRecipeFromFavourites
} from 'resources/me';

let actions = Reflux.createActions( {
    getMyProfile: { asyncResult: true },
    getMyRecipes: { asyncResult: true },
    getComments: { asyncResult: true },
    getMyFavouriteRecipes: { asyncResult: true },

    updateMyProfile: { asyncResult: true },
    addRecipeToFavourites: { asyncResult: true },
    removeRecipeFromFavourites: { asyncResult: true }
} );

export default actions;

actions.getMyProfile.listenAndPromise( getMyProfile );
actions.getMyRecipes.listenAndPromise( getMyRecipes );
actions.getComments.listenAndPromise( getComments );
actions.getMyFavouriteRecipes.listenAndPromise( getMyFavouriteRecipes );

actions.updateMyProfile.listenAndPromise( updateMyProfile );
actions.addRecipeToFavourites.listenAndPromise( addRecipeToFavourites );
actions.removeRecipeFromFavourites.listenAndPromise( removeRecipeFromFavourites );