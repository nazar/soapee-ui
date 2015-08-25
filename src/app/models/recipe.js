import _ from 'lodash';
import { EventEmitter } from 'events';

import oilsStore from 'stores/oils';

let defaults = {
    name: '',
    description: '',
    notes: '',

    oils: [],
    weights: {},
    recipe: {},

    soapType: 'naoh',
    ratioNaoh: 50,
    ratioKoh: 50,
    kohPurity: 90,
    uom: 'percent',
    totalWeight: 500,
    totalUom: 'gram',
    superFat: 5,
    waterRatio: 38,
    fragrance: 3,
    recipeLyeConcentration: 30,
    totalsIncludeWater: false,
    superfatAfter: false,
    lyeCalcType: 'ratio',
    lyeWaterLyeRatio: 1,
    lyeWaterWaterRatio: 3,
    waterDiscount: 0,
    fragranceType: 'ratio',
    fragrancePpo: 30,
    visibility: 0
};

export default class extends EventEmitter {

    constructor() {
        super();

        this.setDefaults();

        this.on( 'changing', this.adjustHybridLyeFields );
        this.on( 'changing', this.convertUnitesOnPercentageUomChanges );
        this.on( 'changing', this.convertPpoUnitesOnPercentageUomChanges );
    }

    setRecipe( recipe ) {
        let summary = _.omit( recipe, 'settings' );

        this.recipe = _.extend( {}, this.recipe, summary, recipe.settings );
    }

    setModelValue( key, value ) {
        this.emit( 'changing', key, value );
        _.set( this.recipe, key, value );
        this.calculateRecipe();

        this.emit( 'calculated' );
    }

    setDefaults() {
        this.recipe = _.extend( {}, defaults );

        this.recipe.oils = null;
        this.recipe.weights = null;
        this.recipe.recipe = null;

        this.recipe.oils = [];
        this.recipe.weights = {};
        this.recipe.recipe = {};
    }

    reset() {
        this.setDefaults();

        this.calculateRecipe();
        this.emit( 'calculated' );
    }

    getModelValue( key ) {
        return _.get( this.recipe, key );
    }

    recipe() {
        return this.recipe;
    }

    isPercentRecipe() {
        return this.recipe.uom === 'percent';
    }

    isKohRecipe() {
        return this.recipe.soapType === 'koh';
    }

    isMixedRecipe() {
        return this.recipe.soapType === 'mixed';
    }

    isUomGrams() {
        return this.uomToUse() === 'gram';
    }

    isPrivate() {
        return Number( this.recipe.visibility ) === 0;
    }

    isPrivateFriends() {
        return Number( this.recipe.visibility ) === 2;
    }

    mixedTotalRatios() {
        return Number( this.recipe.ratioNaoh ) + Number( this.recipe.ratioKoh );
    }

    roundPlaces() {
        return this.roundPlacesForUom( this.uomToUse() );
    }

    roundPlacesForUom( uom ) {
        return {
            gram: 1,
            ounce: 2,
            kilo: 3,
            pound: 3
        }[ uom ];
    }

    sapForSoapType( lye, oil ) {
        let factors = {
            koh: ( this.recipe.kohPurity / 100 ),
            naoh: 1.403
        };

        return oil.sap / factors[ lye ];
    }

    setRecipeOilsByIds( oilIds ) {
        let existingOilsIds = _.pluck( this.recipe.oils, 'id' );
        let toRemoveOilsIds = _.difference( existingOilsIds, oilIds );
        let toKeepIds = _.intersection( existingOilsIds, oilIds );
        let toAdd = _.difference( oilIds, toKeepIds );

        _.each( toRemoveOilsIds, oilId => {
            let oil = _.find( this.recipe.oils, { id: Number( oilId ) } );
            this.removeOil( oil, true );
        } );

        _.each( toAdd, oilId => {
            let oil = oilsStore.getOilById( oilId );
            this.addOil( oil, true );
        } );

        this.calculateRecipe();
        this.emit( 'calculated' );
    }

    addOil( oil, skipUpdate = false ) {
        this.recipe.oils = _.union( this.recipe.oils, [ oil ] );

        if ( skipUpdate === false ) {
            this.calculateRecipe();
            this.emit( 'calculated' );
        }
    }

    removeOil( oil, skipUpdate = false ) {
        this.recipe.oils = _.without( this.recipe.oils, oil );
        delete this.recipe.weights[ oil.id ];

        if ( skipUpdate === false ) {
            this.calculateRecipe();
            this.emit( 'calculated' );
        }
    }

    getOilWeight( oil ) {
        return this.recipe.weights[ oil.id ] || '';
    }

    setOilWeight( oil, weight ) {
        //accepts numeric only
        if ( _.isFinite( Number( weight ) ) || weight === '.' ) {
            this.recipe.weights[ oil.id ] = weight;

            this.calculateRecipe();
            this.emit( 'calculated' );
        }
    }

    uomToUse() {
        if ( this.isPercentRecipe() ) {
            return this.recipe.totalUom;
        } else {
            return this.recipe.uom;
        }
    }

    totalWeight() {
        if ( this.recipe.totalsIncludeWater ) {
            return this.recipe.totalWeight / ( 1 + ( this.recipe.waterRatio / 100 ) );
        } else {
            return this.recipe.totalWeight;
        }
    }

    recipeOilsWeightsRatios() {
        let totalOilWeight;

        if ( this.isPercentRecipe() ) {
            totalOilWeight = this.totalWeight();
        } else {
            totalOilWeight = _.get( this.recipe, 'summary.totals.totalOilWeight' );
        }

        if ( totalOilWeight ) {
            return _.map( this.recipe.weights, ( weightOrRation, oilId ) => {
                let oil;
                let ratio;
                let weight;

                oil = _.find( this.recipe.oils, { id: Number( oilId ) } );

                if ( this.isPercentRecipe() ) {
                    ratio = weightOrRation / 100;
                    weight = totalOilWeight * ratio;
                } else {
                    ratio = weightOrRation / totalOilWeight;
                    weight = weightOrRation;
                }

                return {
                    oil,
                    ratio,
                    weight
                };
            } );
        }
    }


    sumWeights() {
        return _.sum( this.recipe.weights );
    }

    countWeights() {
        return _.filter( this.recipe.weights, ( weight ) => {
            return Number( weight ) > 0;
        } ).length;
    }

    countOils() {
        return this.recipe.oils.length;
    }

    calculateRecipe() {
        let totalOilWeight;
        let totalWaterWeight;
        let totalLye;
        let totalNaoh;
        let totalKoh;
        let totalSuperfat;
        let totalBatchWeight;
        let lyeConcentration;
        let waterLyeRatio;
        let fragranceWeight;

        let breakdowns;
        let properties;
        let saturations;

        let recipeLyeConcentration;

        //total weights either % ratios or uoms
        if ( this.isPercentRecipe() ) {
            totalOilWeight = this.totalWeight();
        } else {
            totalOilWeight = this.sumWeights();
        }

        if ( this.superfatAfter() ) {
            totalSuperfat = totalOilWeight * ( this.recipe.superFat / 100 );
        } else {
            totalSuperfat = 0;
        }

        if ( this.isMixedRecipe() ) {
            totalNaoh = _.sum( this.recipe.weights, ( weightOrRatio, oilId ) => {
                return this.lyeRatioWeightForOilId( 'naoh', weightOrRatio, oilId );
            } );
            totalKoh = _.sum( this.recipe.weights, ( weightOrRatio, oilId ) => {
                return this.lyeRatioWeightForOilId( 'koh', weightOrRatio, oilId );
            } );

            totalLye = totalNaoh + totalKoh;
        } else {
            totalLye = _.sum( this.recipe.weights, ( weightOrRatio, oilId ) => {
                return this.lyeWeightForOilId( this.recipe.soapType, weightOrRatio, oilId );
            } );
        }

        if ( this.recipe.fragranceType === 'ratio' ) {
            fragranceWeight = totalOilWeight * ( this.recipe.fragrance / 100 );
        } else {
            if ( _.contains( [ 'kilo', 'gram' ], this.uomToUse() ) ) {
                fragranceWeight = totalOilWeight * ( this.recipe.fragrancePpo / 1000 );
            } else {
                fragranceWeight = totalOilWeight * ( this.recipe.fragrancePpo / 16 );
            }
        }

        if ( this.isLyeConentration() ) {
            recipeLyeConcentration = (this.recipe.recipeLyeConcentration || 100) / 100;
            totalWaterWeight = ( totalLye / recipeLyeConcentration ) - totalLye;
            lyeConcentration = 100 * recipeLyeConcentration;
        } else if ( this.isLyeWaterRatio() ) {
            totalWaterWeight = totalLye * this.recipe.lyeWaterWaterRatio;
            lyeConcentration = 100 * (totalLye / ( totalWaterWeight + totalLye ));
        } else {
            totalWaterWeight = totalOilWeight * ( this.recipe.waterRatio / 100 );
            lyeConcentration = 100 * (totalLye / ( totalWaterWeight + totalLye ));
        }

        totalWaterWeight = totalWaterWeight - ( ((this.recipe.waterDiscount || 0) / 100) * totalWaterWeight );

        totalBatchWeight = Number( totalOilWeight ) + Number( totalWaterWeight ) + Number( totalLye ) + Number( fragranceWeight ) + Number( totalSuperfat );

        if ( totalWaterWeight + totalLye ) {
            waterLyeRatio = totalWaterWeight / totalLye;

            breakdowns = this.recipeOilFatBreakdowns();
            properties = this.recipeOilProperties();
            saturations = this.recipeOilSaturations();
        }

        this.recipe.summary = {
            totals: {
                totalOilWeight,
                totalWaterWeight,
                fragranceWeight,
                totalNaoh,
                totalKoh,
                totalLye,
                totalSuperfat,
                totalBatchWeight,
                lyeConcentration,
                waterLyeRatio
            },
            breakdowns,
            properties,
            saturations
        };
    }

    lyeWeightForOilId( lye, weightRatio, oilId ) {
        if ( weightRatio ) {
            let oilWeight;
            let oil;
            let grams;
            let lyeGrams;

            if ( this.isPercentRecipe() ) {
                oilWeight = this.totalWeight() * ( weightRatio / 100 );
            } else {
                oilWeight = weightRatio;
            }

            grams = this.convertToGrams( oilWeight );
            oil = _.find( this.recipe.oils, { id: Number( oilId ) } );
            lyeGrams = this.sapForSoapType( lye, oil ) * grams;

            //factor in superfat discount
            if ( !(this.recipe.superfatAfter) ) {
                lyeGrams = lyeGrams - ( this.recipe.superFat / 100 ) * lyeGrams;
            }

            return this.convertToUom( lyeGrams );
        } else {
            return 0;
        }
    }

    lyeRatioWeightForOilId( lye, weightRatio, oilId ) {
        let amount;
        let ratio;

        amount = this.lyeWeightForOilId( lye, weightRatio, oilId );
        ratio = this.recipe[ 'ratio' + _.capitalize( lye ) ] / 100;

        return ratio * amount;
    }

    convertToGrams( weightOrRatio ) {
        return weightOrRatio * this.conversions()[ this.uomToUse() ];
    }

    convertToUom( grams ) {
        return grams / this.conversions()[ this.uomToUse() ];
    }

    conversions() {
        return {
            gram: 1,
            kilo: 0.001,
            pound: 0.00220462,
            ounce: 0.035274
        };
    }

    oilsToRatioIterator( block ) {
        let total;

        total = this.sumWeights();

        _.each( this.recipe.weights, ( weightOrRatio, oilId ) => {
            let oil;
            let ratio;

            if ( this.isPercentRecipe() ) {
                ratio = weightOrRatio / 100;
            } else {
                ratio = weightOrRatio / total;
            }

            oil = _.find( this.recipe.oils, { id: Number( oilId ) } );

            block( oil, ratio );
        }, this );
    }

    recipeOilProperties() {
        return _.tap( {}, result => {
            this.oilsToRatioIterator( ( oil, ratio ) => {
                _.each( oil.properties, ( value, key ) => {
                    result[ key ] = ( result[ key ] || 0 ) + oil.properties[ key ] * ratio;
                } );
                _.each( [ 'iodine', 'ins' ], key => {
                    result[ key ] = ( result[ key ] || 0 ) + oil[ key ] * ratio;
                } );
            } );
        } );
    }

    recipeOilFatBreakdowns() {
        return _.tap( {}, result => {
            this.oilsToRatioIterator( ( oil, ratio ) => {
                _.each( oil.breakdown, ( acidRatio, fattyAcid ) => {
                    result[ fattyAcid ] = ( result[ fattyAcid ] || 0 ) + acidRatio * ratio;
                } );
            } );
        } );
    }


    recipeOilSaturations() {
        return _.tap( {}, result => {
            this.oilsToRatioIterator( ( oil, ratio ) => {
                let saturated = _( oil.breakdown )
                        .filter( ( percent, type ) => _.contains( [ 'caprylic', 'capric', 'lauric', 'myristic', 'palmitic', 'stearic' ], type ) )
                        .sum() * ratio;

                result.saturated = ( result.saturated || 0 ) + saturated;
            } );
            result.unsaturated = 100 - result.saturated;
        } );
    }

    soapTypeToLye() {
        return {
            naoh: 'NaOH',
            koh: 'KOH',
            mixed: 'NaOH and KOH'
        }[ this.recipe.soapType ];
    }

    convertWeightToGrams( weight ) {
        return weight / this.conversions()[ this.uomToUse() ];
    }

    totalsIncludeWater() {
        return this.recipe.totalsIncludeWater;
    }

    superfatAfter() {
        return this.recipe.superfatAfter;
    }

    waterDiscount() {
        return this.recipe.waterDiscount;
    }

    isLyeConentration() {
        return this.recipe.lyeCalcType === 'concentration';
    }

    isLyeWaterRatio() {
        return this.recipe.lyeCalcType === 'lyewater';
    }

    adjustHybridLyeFields( key, value ) {

        if ( key === 'ratioNaoh' ) {
            this.recipe.ratioKoh = 100 - value;
        } else if ( key === 'ratioKoh' ) {
            this.recipe.ratioNaoh = 100 - value;
        }

    }

    convertUnitesOnPercentageUomChanges( key, value ) {
        let weightInGrams;

        if ( this.isPercentRecipe() ) {
            if ( key === 'totalUom' ) {
                weightInGrams = this.recipe.totalWeight / this.conversions()[ this.recipe.totalUom ];
                this.recipe.totalWeight = weightInGrams * this.conversions()[ value ];
            }
        }
    }

    convertPpoUnitesOnPercentageUomChanges( key, value ) {
        let from;
        let to;

        if ( _.contains( ['uom', 'totalUom'], key ) ) {

            if ( this.recipe.uom === 'percent' ) {
                from = this.recipe.totalUom;
                to = value;
            } else if ( value === 'percent' ) {
                from = this.recipe.uom;
                to = this.recipe.totalUom;
            } else {
                from = this.recipe[ key ];
                to = value;
            }

            if ( _.contains( [ 'gram', 'kilo' ], from ) && _.contains( [ 'ounce', 'pound' ], to ) ) {
                this.recipe.fragrancePpo = (this.recipe.fragrancePpo / 1000) / (1 / 16);
            } else if ( _.contains( [ 'ounce', 'pound' ], from ) && _.contains( [ 'gram', 'kilo' ], to ) ) {
                this.recipe.fragrancePpo = (this.recipe.fragrancePpo / 16) / (1 / 1000);
            }

        }

    }

}