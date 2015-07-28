import React from 'react';
import config from 'config';

import { TwitterButton, TwitterCount } from 'react-social';

import ButtonFBLike from 'components/buttonFBLike';
import ButtonGPlusLike from 'components/buttonGPlusLike';

export default React.createClass( {
    render() {
        return (
            <div className="share-this">
                <div className="t-cell">
                    <TwitterButton
                        className="btn btn-primary btn-xs hidden-sm"
                        url={ config.homeUrl }>
                        <i className="fa fa-twitter"> &nbsp;&nbsp;<TwitterCount /></i>
                    </TwitterButton>
                </div>
                <div className="t-cell">
                    <ButtonGPlusLike
                        url={ config.homeUrl }
                        layout="standard"
                        />
                </div>
                <div className="t-cell">
                    <ButtonFBLike
                        url={ config.homeUrl }
                        layout="button_count"
                        />
                </div>
            </div>
        );
    }

} );