import Reflux from 'reflux';

import {
    getFeed
} from 'resources/feed';

let actions = Reflux.createActions( {
    getFeed: { asyncResult: true }
} );

export default actions;

actions.getFeed.listenAndPromise( getFeed );