import _ from 'lodash';
import when from 'when';

import { get, post, put, del } from 'utils/http';
import baseUrl from 'utils/baseUrl';

export function createRecipe( recipeModel ) {
    let packet = recipeModelToPacket( recipeModel );

    return when(
        post( baseUrl( 'recipes' ), {
            params: packet
        } )
    );
}

export function updateRecipe( recipeModel ) {
    let packet = recipeModelToPacket( recipeModel );

    return when(
        put( baseUrl( `recipes/${ recipeModel.getModelValue( 'id' ) }` ), {
            params: packet
        } )
    );
}

export function deleteRecipe( recipeModel ) {
    return when(
        del( baseUrl( `recipes/${ recipeModel.getModelValue( 'id' ) }` ) )
    );
}

export function getRecipes( options = {} ) {
    return when(
        get( baseUrl( 'recipes' ), {
            params: {
                page: options.page
            }
        } )
    );
}

export function getRecipeById( id ) {
    return when(
        get( baseUrl( `recipes/${id}` ) )
    );
}

export function getRecipeComments( recipe ) {
    return when(
        get( baseUrl( `recipes/${recipe.id}/comments` ) )
    );
}

export function addCommentToRecipe( comment, recipe ) {
    return when(
        post( baseUrl( `recipes/${recipe.id}/comments` ), {
            params: {
                comment
            }
        } )
    );
}

export function getRecipeJournal( recipe, journal ) {
    return when(
        get( baseUrl( `recipes/${recipe.id}/journals/${journal.id}` ) )
    );
}

export function getRecipeJournals( recipe ) {
    return when(
        get( baseUrl( `recipes/${recipe.id}/journals` ) )
    );
}

export function addRecipeJournal( recipe, journal ) {
    return when(
        post( baseUrl( `recipes/${recipe.id}/journals` ), {
            params: {
                journal
            }
        } )
    );
}

export function updateRecipeJournal( recipe, journal ) {
    return when(
        put( baseUrl( `recipes/${recipe.id}/journals/${journal.id}` ), {
            params: {
                journal: journal.journal,
                deleting: {
                    imageables: _( journal.images ).filter( { deleting: true } ).pluck( 'id' ).value()
                }
            }
        } )
    );
}

export function deleteRecipeJournal( recipe, journal ) {
    return when(
        del( baseUrl( `recipes/${recipe.id}/journals/${journal.id}` ) )
    );
}

export function getRecipeJournalComments( recipe, journal ) {
    return when(
        get( baseUrl( `recipes/${recipe.id}/journals/${journal.id}/comments` ) )
    );
}

export function addCommentToRecipeJournal( comment, recipe, recipeJournal ) {
    return when(
        post( baseUrl( `recipes/${recipe.id}/journals/${recipeJournal.id}/comments` ), {
            params: {
                comment
            }
        } )
    );
}


///////////////
/// private

function recipeModelToPacket( recipeModel ) {
    let recipe = recipeModel.recipe;

    return {
        name: recipe.name,
        description: recipe.description,
        notes: recipe.notes,
        visibility: recipe.visibility,

        settings: {
            kohPurity: recipe.kohPurity,
            ratioNaoh: recipe.ratioNaoh,
            ratioKoh: recipe.ratioKoh,
            soapType: recipe.soapType,
            superFat: recipe.superFat,
            totalUom: recipe.totalUom,
            totalWeight: recipe.totalWeight,
            uom: recipe.uom,
            waterRatio: recipe.waterRatio,
            recipeLyeConcentration: recipe.recipeLyeConcentration,
            lyeCalcType: recipe.lyeCalcType,
            lyeWaterLyeRatio: recipe.lyeWaterLyeRatio,
            lyeWaterWaterRatio: recipe.lyeWaterWaterRatio,
            waterDiscount: recipe.waterDiscount,
            fragranceType: recipe.fragranceType,
            fragrancePpo: recipe.fragrancePpo
        },

        oils: _.pluck( recipe.oils, 'id' ),
        weights: recipe.weights,
        summary: recipe.summary,

        deleting: {
            imageables: _( recipe.images ).filter( { deleting: true } ).pluck( 'id' ).value()
        }
    };
}