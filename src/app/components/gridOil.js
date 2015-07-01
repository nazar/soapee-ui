import _ from 'lodash';
import React from 'react';
import Reflux from 'reflux';
import Griddle from 'griddle-react';

import oilsStore from 'stores/oils';


export default React.createClass( {

    mixins:[
        Reflux.connect( oilsStore, 'oils' )
    ],

    render() {
        let data = this.oilsForGrid();

        if ( data.length ) {
            return (
                <div className="grid-oil">
                    <Griddle
                        results={data}
                        tableClassName="table table-striped table-hover"
                        useGriddleStyles={false}
                        showFilter={true}
                        showSettings={true}
                        initialSort="name"
                        resultsPerPage="50"
                        columns={ [ 'name', 'sap', 'lauric', 'myristic', 'palmitic', 'stearic', 'ricinoleic',  'oleic', 'linoleic', 'linolenic' ] }
                        />
                </div>
            );
        } else {
            return <div></div>;
        }
    },

    oilsForGrid() {
        return _.map( this.state.oils, oil => {
            return {
                name: oil.name,
                sap: oil.sap,
                iodine: oil.iodione,
                ins: oil.ins,
                bubbly: oil.properties.bubbly,
                cleansing: oil.properties.cleansing,
                hardness: oil.properties.hardness,
                stability: oil.properties.stable,
                caprylic: oil.breakdown.caprylic,
                capric: oil.breakdown.capric,
                docosadienoic: oil.breakdown.docosadienoic,
                docosenoid: oil.breakdown.docosenoid,
                eicosenoic: oil.breakdown.eicosenoic,
                erucic: oil.breakdown.erucic,
                lauric: oil.breakdown.lauric,
                linoleic: oil.breakdown.linoleic,
                linolenic: oil.breakdown.linolenic,
                oleic: oil.breakdown.oleic,
                myristic: oil.breakdown.myristic,
                palmitic: oil.breakdown.palmitic,
                ricinoleic: oil.breakdown.ricinoleic,
                stearic: oil.breakdown.stearic
            };
        } );
    }

} );

