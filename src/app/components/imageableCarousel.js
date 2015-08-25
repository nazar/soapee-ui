import _ from 'lodash';
import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';

import {imageableUrl} from 'resources/imageable';

export default React.createClass( {

    getInitialState() {
        return {
            index: 0,
            direction: null
        };
    },

    handleSelect(selectedIndex, selectedDirection) {
        this.setState({
            index: selectedIndex,
            direction: selectedDirection
        });
    },

    render() {
        return (
            <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
                { _.map( this.props.images, this.renderCarouselItem ) }
            </Carousel>
        );
    },

    renderCarouselItem( image ) {
        return (
            <CarouselItem>
                <img src={ imageableUrl( image ) } />
            </CarouselItem>
        );
    }

} );