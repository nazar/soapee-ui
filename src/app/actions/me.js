import Reflux from 'reflux';

import {
    getMyProfile,
    updateMyProfile,

    getMyRecipes,
    getMyFavouriteRecipes,

    addRecipeToFavourites,
    removeRecipeFromFavourites
} from 'resources/me';

let actions = Reflux.createActions( {
    getMyProfile: { asyncResult: true },
    updateMyProfile: { asyncResult: true },
    getMyRecipes: { asyncResult: true },
    getMyFavouriteRecipes: { asyncResult: true },
    addRecipeToFavourites: { asyncResult: true },
    removeRecipeFromFavourites: { asyncResult: true }
} );

export default actions;

actions.getMyProfile.listenAndPromise( getMyProfile );
actions.updateMyProfile.listenAndPromise( updateMyProfile );
actions.getMyRecipes.listenAndPromise( getMyRecipes );
actions.getMyFavouriteRecipes.listenAndPromise( getMyFavouriteRecipes );
actions.addRecipeToFavourites.listenAndPromise( addRecipeToFavourites );
actions.removeRecipeFromFavourites.listenAndPromise( removeRecipeFromFavourites );