import React from 'react';
import Reflux from 'reflux';
import { Navigation, State } from 'react-router';

import calculatorStore from 'stores/calculator';

import RecipePrintArea from 'components/recipePrintArea';

export default React.createClass( {

    mixins: [
        Navigation,
        State,
        Reflux.connect( calculatorStore, 'recipe' )
    ],

    componentDidMount() {
        if ( this.getQuery().preview !== 'true' ) {
            window.print();
            this.replaceWith( 'calculator' );
        }
    },

    render() {
        return (
            <div id="print-calculation">
                <RecipePrintArea
                    recipe={ this.state.recipe }
                    />
            </div>
        );
    }

} );