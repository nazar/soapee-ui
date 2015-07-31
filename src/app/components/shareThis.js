import React from 'react';
import config from 'config';

import { TwitterButton, TwitterCount } from 'react-social';

import ButtonFBLike from 'components/buttonFBLike';
import ButtonGPlusLike from 'components/buttonGPlusLike';

export default React.createClass( {
    render() {
        let url = config.homeUrl;

        return (
            <div className="share-this">
                <div className="t-cell">
                    <TwitterButton
                        className="btn btn-primary btn-xs hidden-sm"
                        url={ url }>
                        <i className="fa fa-twitter"> &nbsp;&nbsp;<TwitterCount url={ url } /></i>
                    </TwitterButton>
                </div>
                <div className="t-cell">
                    <ButtonGPlusLike
                        url={ url }
                        layout="standard"
                        />
                </div>
                <div className="t-cell">
                    <ButtonFBLike
                        url={ url }
                        layout="button_count"
                        />
                </div>
            </div>
        );
    }

} );