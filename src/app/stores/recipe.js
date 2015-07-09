import _ from 'lodash';
import Reflux from 'reflux';

export default Reflux.createStore( {

    store: {
        oils: [],
        weights: {},
        recipe: {},

        soapType: 'noah',
        kohPurity: 90,
        uom: 'gram',
        totalWeight: 500,
        totalUom: 'gram',
        superFat: 5,
        waterRatio: 38
    },

    getInitialState() {
        return this.store;
    },

    setStoreValue( key, value ) {
        _.set( this.store, key, value );

        this.calculateRecipe();

        doTrigger.call( this );
    },

    getStoreValue( key ) {
        return _.get( this.store, key );
    },

    sapForNaOh( oil ) {
        return _.round( oil.sap / 1.403, 3 );
    },

    sapForSoapType( oil ) {
        let factors = {
            koh: (this.store.kohPurity / 100),
            noah: 1.403
        };

        return _.round( oil.sap / factors[ this.store.soapType ], 3 );
    },

    addOil( oil ) {
        this.store.oils = _.union( this.store.oils, [ oil ] );

        this.calculateRecipe();

        doTrigger.call( this );
    },

    removeOil( oil ) {
        this.store.oils = _.without( this.store.oils, oil );
        delete this.store.weights[ oil.id ];

        this.calculateRecipe();

        doTrigger.call( this );
    },

    getOilWeight( oil ) {
        return this.store.weights[ oil.id ] || '';
    },

    setOilWeight( oil, weight ) {
        //accepts numeric only
        if ( _.isFinite( Number( weight ) ) || weight === '.' ) {
            this.store.weights[ oil.id ] = weight;

            this.calculateRecipe();

            doTrigger.call( this );
        }
    },

    recipeOilsUom() {
        if ( this.isPercentRecipe() ) {
            return this.store.totalUom;
        } else {
            return this.store.uom;
        }
    },

    recipeIsValid() {
        if ( this.isPercentRecipe() ) {
            return !( this.sumWeights() < 100 );
        } else {
            return this.sumWeights() > 0;
        }
    },

    recipeOilsWeightsRatios() {
        let totalOilWeight;

        if ( this.isPercentRecipe() ) {
            totalOilWeight = this.store.totalWeight;
        } else {
            totalOilWeight = _.get( this.store, 'recipe.totals.totalOilWeight' );
        }

        if ( totalOilWeight ) {
            return _.map( this.store.weights, ( weightOrRation, oilId ) => {
                let oil;
                let ratio;
                let weight;

                oil = _.find( this.store.oils, { id: Number( oilId ) } );

                if ( this.isPercentRecipe() ) {
                    ratio  =  weightOrRation / 100;
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
    },

    isPercentRecipe() {
        return this.store.uom === 'percent';
    },

    sumWeights() {
        return _.sum( this.store.weights );
    },

    countWeights() {
        return _.filter( this.store.weights, ( weight ) => {
            return Number( weight ) > 0;
        } ).length;
    },

    countOils() {
        return this.store.oils.length;
    },

    calculateRecipe() {
        let totalOilWeight;
        let totalWaterWeight;
        let totalLye;
        let totalBatchWeight;
        let lyeConcentration;
        let waterLyeRatio;

        let breakdowns;
        let properties;
        let saturations;

        //total weights either % ratios or uoms
        if ( this.isPercentRecipe() ) {
            totalOilWeight = this.store.totalWeight;
        } else {
            totalOilWeight = this.sumWeights();
        }

        totalWaterWeight = totalOilWeight * ( this.store.waterRatio / 100 );
        totalLye = _.sum( this.store.weights, ( weightOrRatio, oilId ) => {
            return lyeWeightForOilId.call( this, weightOrRatio, oilId );
        } );
        totalBatchWeight = Number( totalOilWeight ) + Number( totalWaterWeight ) + Number( totalLye );

        if ( totalWaterWeight + totalLye ) {
            lyeConcentration = 100 * (totalLye / ( totalWaterWeight + totalLye ));
            waterLyeRatio = totalWaterWeight / totalLye;

            breakdowns = recipeOilFatBreakdowns.call( this );
            properties = recipeOilProperties.call( this );
            saturations = recipeOilSaturations.call( this );
        }

        this.store.summary = {
            totals: {
                totalOilWeight,
                totalWaterWeight,
                totalLye,
                totalBatchWeight,
                lyeConcentration,
                waterLyeRatio
            },
            breakdowns,
            properties,
            saturations
        };
    }
} );

//////////////////////
///// Private

function doTrigger() {
    this.trigger( this.store );
}

function lyeWeightForOilId( weightRatio, oilId ) {
    if ( weightRatio ) {
        let oilWeight;
        let oil;
        let grams;
        let lyeGrams;

        if ( this.isPercentRecipe() ) {
            oilWeight = this.store.totalWeight * ( weightRatio / 100 );
        } else {
            oilWeight = weightRatio;
        }

        grams = convertToGrams.call( this, oilWeight );
        oil = _.find( this.store.oils, { id: Number( oilId ) } );
        lyeGrams = this.sapForSoapType( oil ) * grams;

        //factor in superfat discount
        lyeGrams = lyeGrams - _.round( ( this.store.superFat / 100 ) * lyeGrams, 3 );

        return convertToUom.call( this, lyeGrams );
    } else {
        return 0;
    }

}

function oilsToRatioIterator( block ) {
    let total;

    total = this.sumWeights();

    _.each( this.store.weights, ( weightOrRation, oilId ) => {
        let oil;
        let ratio;

        if ( this.isPercentRecipe() ) {
            ratio = weightOrRation / 100;
        } else {
            ratio = weightOrRation / total;
        }

        oil = _.find( this.store.oils, { id: Number( oilId ) } );

        block( oil, ratio );
    }, this );
}

function recipeOilProperties() {
    return _.tap( {}, result => {
        oilsToRatioIterator.call( this, ( oil, ratio ) => {
            _.each( oil.properties, ( value, key ) => {
                result[ key ] = ( result[ key ] || 0 ) + oil.properties[ key ] * ratio;
            } );
            _.each( ['iodine', 'ins'], key => {
                result[ key ] = ( result[ key ] || 0 ) + oil[ key ] * ratio;
            } );
        } );
    } );
}

function recipeOilFatBreakdowns() {
    return _.tap( {}, result => {
        oilsToRatioIterator.call( this, ( oil, ratio ) => {
            _.each( oil.breakdown, ( acidRatio, fattyAcid ) => {
                result[ fattyAcid ] = ( result[ fattyAcid ] || 0 ) + acidRatio * ratio;
            } );
        } );
    } );
}


function recipeOilSaturations() {
    return _.tap( {}, result => {
        oilsToRatioIterator.call( this, ( oil, ratio ) => {
            _.each( oil.breakdown, ( acidRatio, fattyAcid ) => {
                let classification = classifyFattyType( fattyAcid );
                result[ classification ] = ( result[ classification ] || 0 ) + acidRatio * ratio;
            } );
        } );
    } );
}

function classifyFattyType( fattyAcid ) {
    let types = {
        caprylic: 'saturated',
        capric: 'saturated',
        lauric: 'saturated',
        myristic: 'saturated',
        palmitic: 'saturated',
        stearic: 'saturated',
        ricinoleic: 'unsaturated',
        oleic: 'unsaturated',
        linoleic: 'unsaturated',
        linolenic: 'unsaturated',
        eicosenoic: 'unsaturated',
        docosenoid: 'unsaturated',
        erucic: 'unsaturated',
        docosadienoic: 'unsaturated'
    };

    return types[ fattyAcid ];
}

function convertToGrams( weightOrRatio ) {
    return weightOrRatio * conversions()[ uomToUse.call( this ) ];
}

function convertToUom( grams ) {
    return grams / conversions()[ uomToUse.call( this ) ];
}

function uomToUse() {
    if ( this.isPercentRecipe() ) {
        return this.store.totalUom;
    } else {
        return this.store.uom;
    }
}

function conversions() {
    return {
        gram: 1,
        kilo: 0.001,
        pound: 0.00220462,
        ounce: 0.035274
    };
}