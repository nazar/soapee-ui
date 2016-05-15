import React from 'react';
import config from 'config';

import { TwitterButton, PinterestButton, RedditButton, TwitterCount, PinterestCount, RedditCount } from 'react-social';

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
                        <i className="fa fa-twitter"></i>
                    </TwitterButton>
                </div>
                <div className="t-cell">
                    <RedditButton
                        className="btn btn-primary btn-reddit btn-xs hidden-sm"
                        url={ url }>
                        <i className="fa fa-reddit"> &nbsp;&nbsp;<RedditCount url={url}/></i>
                    </RedditButton>
                </div>
                <div className="t-cell">
                    <PinterestButton
                        className="btn btn-primary btn-pinterest btn-xs hidden-sm"
                        url={ url }>
                        <i className="fa fa-pinterest"> &nbsp;&nbsp;<PinterestCount url={url}/></i>
                    </PinterestButton>
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