import _ from 'lodash';
import React from 'react';

export default React.createClass( {

    getDefaultProps() {
        return {
            tipPlacement: 'top'
        };
    },

    componentDidMount() {
        this.initToolTip();
    },

    componentDidUpdate() {
        this.initToolTip();
    },

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

        if ( !( _.get( user, 'image_url' ) ) ) {
            return (
                <i className="fa fa-user"
                   data-toggle="tooltip"
                   data-placement={ this.props.tipPlacement }
                   title={ _.get( user, 'name' ) }
                    ></i>
            );
        }
    },

    renderImageUrl() {
        let user = this.props.user;

        if ( _.get( user, 'image_url' ) ) {
            return (
                <img src={ user.image_url }
                     data-toggle="tooltip"
                     data-placement={ this.props.tipPlacement }
                     title={ _.get( user, 'name' ) }
                    />
            );
        }
    },

    initToolTip() {
        $( this.getDOMNode() ).find('[data-toggle="tooltip"]').tooltip();
    }

} );