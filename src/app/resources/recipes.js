import _ from 'lodash';
import when from 'when';

import { get, post, put } from 'utils/http';
import baseUrl from 'utils/baseUrl';

export function createRecipe( recipeModel ) {
    let packet  = recipeModelToPacket( recipeModel );

    return when(
        post( baseUrl( 'recipes' ), {
            params: packet
        } )
    );
}

export function updateRecipe( recipeModel ) {
    let packet  = recipeModelToPacket( recipeModel );

    return when(
        put( baseUrl( `recipes/${ recipeModel.getModelValue( 'id' ) }` ), {
            params: packet
        } )
    );
}

export function getRecipes() {
    return when(
        get( baseUrl( 'recipes' ) )
    );
}

export function getRecipeById( id ) {
    return when(
        get( baseUrl( `recipes/${id}` ) )
    );
}

export function soapTypeToDescription( soapType ) {
    return {
        noah: 'solid',
        koh: 'liquid'
    }[ soapType ];
}



///////////////
/// private

function recipeModelToPacket( recipeModel ) {
    let recipe = recipeModel.recipe;

    return {
        name: recipe.name,
        notes: recipe.notes,

        kohPurity: recipe.kohPurity,
        soapType: recipe.soapType,
        superFat: recipe.superFat,
        totalUom: recipe.totalUom,
        totalWeight: recipe.totalWeight,
        uom: recipe.uom,
        waterRatio: recipe.waterRatio,

        oils: _.pluck( recipe.oils, 'id' ),
        weights: recipe.weights,
        summary: recipe.summary
    };
}