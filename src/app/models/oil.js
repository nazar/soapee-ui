import _ from 'lodash';

let fattyOils = {
    caprylic: '8:0',
    capric: '10:0',
    lauric: '12:0',
    myristic: '14:0',
    palmitic: '16:0',
    stearic: '18:0',
    ricinoleic: '18:1',
    oleic: '18:1',
    linoleic: '18:2',
    linolenic: '18:3',
    eicosenoic: '20:1',
    docosenoid: '22:1',
    erucic: '22:1',
    docosadienoic: '22:2'
};

export default class {

    constructor( oil ) {
        this.oil = oil;
    }

    getExtendedOil() {
        this.extendOil();
        return this.oil;
    }

    extendOil() {
        this.oil.properties = this.buildProperties();
        this.oil.saturation = this.saturationBreakdown();
    }

    buildProperties() {
        return {
            bubbly: this.propertyValueForOil( this.oil, [ 'lauric', 'myristic', 'ricinoleic', 'caprylic', 'capric' ] ),
            cleansing: this.propertyValueForOil( this.oil, [ 'lauric', 'myristic', 'caprylic', 'capric' ] ),
            condition: this.propertyValueForOil( this.oil, [ 'ricinoleic', 'oleic', 'linoleic', 'linolenic', 'eicosenoic', 'docosenoid', 'docosadienoic', 'erucic' ] ),
            hardness: this.propertyValueForOil( this.oil, [ 'lauric', 'myristic', 'palmitic', 'stearic', 'caprylic', 'capric' ] ),
            longevity: this.propertyValueForOil( this.oil, [ 'palmitic', 'stearic' ] ),
            stable: this.propertyValueForOil( this.oil, [ 'palmitic', 'stearic', 'ricinoleic' ] )
        };
    }

    saturationBreakdown() {
        return _.transform( this.saturationBreakdowns(), ( result, fats, group ) => {
            result[ group ] = this.propertyValueForOil( this.oil, fats );
        } );
    }

    saturationBreakdowns() {
        return {
            saturated: _( fattyOils ).pick( this.filterByMatch( ':0' ) ).keys().value(),
            monoSaturated: _( fattyOils ).pick( this.filterByMatch( ':1' ) ).keys().value(),
            polySaturated: _( fattyOils ).pick( this.filterByMatch( ':2' ) ).keys().value()
        };
    }

    propertyValueForOil( oil, fats ) {
        return _.reduce( fats, ( total, fat ) => {
            return total + ( oil.breakdown[ fat ] || 0 );
        }, 0 );
    }

    filterByMatch( matcher ) {
        return oilType => {
            return oilType.match( matcher );
        };
    }

}