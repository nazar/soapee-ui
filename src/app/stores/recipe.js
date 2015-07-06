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
        totalWeight: null,
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

        totalOilWeight = _.sum( this.store.weights );
        totalWaterWeight = _.round( totalOilWeight * ( this.store.waterRatio / 100 ), 3 );
        totalLye = _.round( _.sum( this.store.weights, ( weightOrRatio, oilId ) => {
            return lyeWeightForOilId.call( this, weightOrRatio, oilId );
        } ), 3 );
        totalBatchWeight = _.round( totalOilWeight + totalWaterWeight + totalLye, 3 );

        if ( totalWaterWeight + totalLye ) {
            lyeConcentration = _.round( 100 * (totalLye / ( totalWaterWeight + totalLye )), 3 );
            waterLyeRatio = _.round( totalWaterWeight / totalLye, 3 );

            breakdowns = recipeOilFatBreakdowns.call( this );
            properties = recipeOilProperties.call( this );
            saturations = recipeOilSaturations.call( this );
        }

        this.store.recipe = {
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

        console.log( 'recipe', this.store.recipe );
    }
} );

//////////////////////
///// Private

function doTrigger() {
    this.trigger( this.store );
}

function lyeWeightForOilId( weightRatio, oilId ) {
    if ( weightRatio ) {
        let oil;
        let grams;
        let lyeGrams;

        grams = convertToGrams.call( this, weightRatio );
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

    total = _.sum( this.store.weights );

    _.each( this.store.weights, ( weightOrRation, oilId ) => {
        let oil;
        let ratio;

        if ( this.store.uom === 'percent' ) {
            ratio = weightOrRation;
        } else {
            ratio = _.round( weightOrRation / total, 3 );
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

function namedOilPropertyRatioSummation( property ) {
    return _.tap( {}, result => {
        oilsToRatioIterator.call( this, ( oil, ratio ) => {
            _.each( oil[ property ], ( value, key ) => {
                result[ key ] = ( result[ key ] || 0 ) + oil[property][ key ] * ratio;
            } );
        } );
    } );
}

function convertToGrams( weightOrRatio ) {
    return weightOrRatio * conversions()[ this.store.uom ];
}

function convertToUom( grams ) {
    return _.round( grams / conversions()[ this.store.uom ], 2 );
}

function conversions() {
    return {
        gram: 1,
        kilo: 0.001,
        pound: 0.00220462,
        ounce: 0.035274
    };
}