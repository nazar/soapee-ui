import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import { Button, Thumbnail } from 'react-bootstrap';

import { imageableThumbUrl } from 'resources/imageable';

export default React.createClass( {

    render() {
        return (
            <div className="imageable-edit">
                { _.map( this.props.images, this.renderImage ) }
            </div>
        );
    },

    renderImage( image ) {
        return (
            <div key={image.id} className="edit col-md-2 col-xs-4">
                <Thumbnail src={ imageableThumbUrl( image ) } className={ cx( { deleting: this.deleting( image ) } ) }>
                    <p>
                        <Button bsStyle='warning'
                                active={ this.deleting( image ) }
                                onClick={ this.markForDelete( image ) }>
                            <i className="fa fa-times"> Delete</i>
                        </Button>
                    </p>
                </Thumbnail>
            </div>
        );
    },

    deleting( image ) {
        return image.deleting;
    },

    markForDelete( image ) {
        return () => {
            image.deleting = !image.deleting;
            this.forceUpdate();
        };
    }
} );