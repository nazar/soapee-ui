import when from 'when';
import {del, get, post, put} from 'utils/http';

import baseUrl from 'utils/baseUrl';


export function getMyProfile() {
    return when(
        get( baseUrl( 'me' ) )
    );
}

export function updateMyProfile( packet ) {
    return when(
        post( baseUrl( 'me' ), {
            params: {
                name: packet.name,
                about: packet.about
            }
        } )
    );
}

export function getMyRecipes() {
    return when(
        get( baseUrl( 'me/recipes' ) )
    );
}

export function getMyFavouriteRecipes() {
    return when(
        get( baseUrl( 'me/favourite/recipes' ) )
    );
}

export function getComments() {
    return when(
        get( baseUrl( 'me/comments' ) )
    );
}

export function addRecipeToFavourites( recipe ) {
    return when(
        put( baseUrl( `me/favourite/recipes/${recipe.id}` ) )
    );
}

export function removeRecipeFromFavourites( recipe ) {
    return when(
        del( baseUrl( `me/favourite/recipes/${recipe.id}` ) )
    );
}