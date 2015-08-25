import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router';

import authStore from 'stores/auth';

import ImageableThumbnails from 'components/imageableThumbnails';
import ImageableCarousel from 'components/imageableCarousel';
import MarkedDisplay from 'components/markedDisplay';
import UserAvatar from 'components/userAvatar';

export default React.createClass( {

    getDefaultProps() {
        return {
            imagesType: 'thumbnails',
            state: 'list'
        };
    },

    render() {
        let recipeJournal = this.props.recipeJournal;
        let recipe = this.props.recipe;

        let paramLink = {
            recipeId: recipe.id,
            journalId: recipeJournal.id
        };

        return (
            <div className={ `recipe-journal-item media ${this.props.state}` }>
                <div className="media-left">
                    <UserAvatar
                        user={ recipe.user }
                        />
                </div>
                <div className="media-body">
                    <div className="about">
                        <span className="user">
                            <Link to="userProfile" params={ { id: recipe.user_id } }>{ recipe.user.name }</Link>
                        </span>
                        <span className="time"
                              title={ moment( recipeJournal.created_at ).format( 'LLLL' ) }
                            >
                            { moment( recipeJournal.created_at ).fromNow() }
                        </span>
                    </div>

                    <MarkedDisplay
                        content={ recipeJournal.journal }
                        />

                    { this.props.imagesType === 'thumbnails' && _.get( recipeJournal, 'images.length' ) > 0 &&
                        <ImageableThumbnails
                            images={ recipeJournal.images }
                            />
                    }

                    { this.props.imagesType === 'carousel' && _.get( recipeJournal, 'images.length' ) > 0 &&
                        <div className="col-md-12">
                            <div className="row">
                                <legend>Journal Photos</legend>
                                <div className="col-md-10 col-md-offset-1">
                                    <ImageableCarousel
                                        images={ recipeJournal.images}
                                        />
                                </div>
                            </div>
                        </div>
                    }


                    <div className="btn-toolbar actions">
                        { this.props.state === 'list' && <Link className="btn btn-primary btn-xs" to="recipe-journal" params={ paramLink }><i className="fa fa-eye"> View</i></Link> }
                        { authStore.isMyId( recipe.user_id ) && <Link className="btn btn-primary btn-xs" to="recipe-journal-edit" params={ paramLink }><i className="fa fa-pencil-square-o"> Edit</i></Link> }
                    </div>
                </div>
            </div>
        );
    }

} );