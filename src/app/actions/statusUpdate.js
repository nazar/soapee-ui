import Reflux from 'reflux';

import {
    getStatusUpdate,

    getStatusUpdateComments,
    addComment
} from 'resources/statusUpdates';

let actions = Reflux.createActions( {
    getStatusUpdate: { asyncResult: true },

    getStatusUpdateComments: { asyncResult: true },
    addComment: { asyncResult: true }

} );

export default actions;

actions.getStatusUpdate.listenAndPromise( getStatusUpdate );

actions.getStatusUpdateComments.listenAndPromise( getStatusUpdateComments );
actions.addComment.listenAndPromise( addComment );