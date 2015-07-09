import React from 'react';
import Portal from 'react-portal';

import AnimatedModal from 'components/animatedModal';

export default React.createClass({

    render() {
        return (
            <Portal
                isOpened={this.props.isOpened}
                closeOnEsc={true}
                closeOnOutsideClick={true}
                onClose={this.signalClosed}
                >
                <AnimatedModal>
                    Think of the children
                </AnimatedModal>
            </Portal>
        );
    }

});