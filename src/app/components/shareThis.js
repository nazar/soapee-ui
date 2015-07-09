import React from 'react';

export default React.createClass( {


    render() {
        return (
            <div className="share-this">
                <div className="t-cell">
                    <span className='st_facebook_large' displayText='Facebook'></span>
                    <span className='st_twitter_large' displayText='Tweet'></span>
                    <span className='st_googleplus_large' displayText='Google +'></span>
                    <span className='st_pinterest_large' displayText='Pinterest'></span>
                    <span className='st_google_bmarks_large' displayText='Bookmarks'></span>
                    <span className='st_reddit_large' displayText='Reddit'></span>
                    <span className='st_email_large' displayText='Email'></span>
                    <span className='st_fblike_large' displayText='Facebook Like'></span>
                    <span className='st_plusone_large' displayText='Google +1'></span>
                </div>
            </div>
        );
    }

} );