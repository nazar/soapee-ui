import React from 'react';

export default React.createClass( {

    render() {
        return (
            <div className="user-avatar">
                <div className="avatar-border">
                    { this.renderLocal() }
                    { this.renderImageUrl() }
                </div>
            </div>
        );
    },

    renderLocal() {
        let user = this.props.user;

        if ( !( user.image_url ) ) {
            return (
                <i className="fa fa-user"></i>
            );
        }
    },

    renderImageUrl() {
        let user = this.props.user;

        if ( user.image_url ) {
            return (
                <img src={ user.image_url } />
            );
        }
    }

} );