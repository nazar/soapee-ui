import React from 'react';
import DocMeta from 'react-doc-meta';

import GridOil from 'components/gridOil';

export default React.createClass( {

    render() {
        document.title = 'Soapee - Oils';

        return (
            <div id="oils">
                <DocMeta tags={ this.tags() } />
                <GridOil />
            </div>
        );
    },

    tags() {
        let description = `Soapee Oils Database`;

        return [
            {name: 'description', content: description},
            {name: 'twitter:card', content: description},
            {name: 'twitter:title', content: description},
            {property: 'og:title', content: description}
        ];
    }


} );