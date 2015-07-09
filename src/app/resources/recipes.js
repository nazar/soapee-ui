import _ from 'lodash';
import when from 'when';

import {post} from 'utils/http';
import baseUrl from 'utils/baseUrl';

export function createRecipe( recipe ) {
    let packet;

    packet = {
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

    console.log( 'packet', packet );

    return when(
        post( baseUrl( 'recipes' ), {
            params: packet
        } )
    );
}