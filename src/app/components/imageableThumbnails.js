import _ from 'lodash';
import React from 'react';

import { imageableThumbUrl } from 'resources/imageable';

export default React.createClass( {

    render() {
        return (
                <div className="imageable-thumbnails clearfix">
                    { _.map( this.props.images, this.renderImage ) }
                </div>
        );
    },

    renderImage( image ) {
        return (
            <img key={image.id} className="thumbnail pull-left" src={ imageableThumbUrl( image ) } />
        );
    }

} );