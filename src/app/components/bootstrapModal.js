import React, {findDOMNode} from 'react';
import cx from 'classnames';

/**
 * WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING
 *
 * Bootstrap modal must be supplied a registerCloseFunction prop, which registers the close action for the modal child
 * This cannot be reliably passed down as an indeterminate number of children could be defined under this component
 *
 * WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING
 */

export default React.createClass( {

    getInitialState() {
        return {
            entering: true
        };
    },

    componentDidMount() {
        this.$modal = $( this.getDOMNode() )
            .find( '.modal' )
            .modal( {
                backdrop: false,
                keyboard: false
            } );

        $( 'body' )
            .bind( 'mousedown', this.handleMouseClickOutside )
            .bind( 'keyup', this.handleEscapeKey );

        this.props.registerCloseFunction && this.props.registerCloseFunction( this.animatedClose );
    },

    componentWillUnmount() {
        $( 'body' )
            .unbind( 'mousedown', this.handleMouseClickOutside )
            .unbind( 'keyup', this.handleEscapeKey );
    },

    render() {
        let modalClasses = cx( 'modal animated', {
            bounceInDown: this.state.entering,
            bounceOutUp: !this.state.entering
        } );

        let dialogClasses = cx( 'modal-dialog', {
            'modal-lg': this.props.largeModal,
            'modal-sm': this.props.smallModal
        } );
        console.log('bootstrapModal props', this.props );

        return (
            <div className="bootstrap-modal">
                <div className="modal-backdrop in"/>
                <div className={modalClasses}>
                    <div className={dialogClasses} ref="content">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.animatedClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                { this.props.title && <h4 className="modal-title">{this.props.title}</h4> }
                            </div>
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    animatedClose() {
        $('body')
            .removeClass( 'modal-open' );

        setTimeout( () => {
            this.$modal.modal( 'hide' );
            this.props.closePortal();
        }, 700 );

        this.setState( {
            entering: false
        } );
    },

    handleMouseClickOutside( e ) {
        if ( isNodeInRoot( e.target, findDOMNode( this.refs.content ) ) ) {
            return;
        }
        //account for clicking on scrollbar if modal exceeds window height
        if ( ($( 'body' ).width() - e.pageX) <= getScrollBarWidth() ) {
            return;
        }

        e.preventDefault();
        this.animatedClose();
    },

    handleEscapeKey( e ) {
        if ( e.which === 27 ) { // escape key maps to keycode `27`
            e.preventDefault();
            this.animatedClose();
        }
    }

} );

/////////

function isNodeInRoot( node, root ) {
    while ( node ) {
        if ( node === root ) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function getScrollBarWidth () {
    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
}