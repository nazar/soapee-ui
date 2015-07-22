import React from 'react';
import Reflux from 'reflux';
import { Navigation } from 'react-router';

import calculatorStore from 'stores/calculator';

import RecipePrintArea from 'components/recipePrintArea';

export default React.createClass( {

    mixins: [
        Navigation,
        Reflux.connect( calculatorStore, 'recipe' )
    ],

    componentDidMount() {
        window.print();
        this.replaceWith( 'calculator' );
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