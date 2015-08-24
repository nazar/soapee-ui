import Reflux from 'reflux';

import {
    getStatusUpdate,
    addStatusUpdate,
    updateStatusUpdate,
    deleteStatusUpdate,

    getStatusUpdateComments,
    addComment
} from 'resources/statusUpdates';

let actions = Reflux.createActions( {
    getStatusUpdate: { asyncResult: true },
    addStatusUpdate: { asyncResult: true },
    updateStatusUpdate: { asyncResult: true },
    deleteStatusUpdate: { asyncResult: true },

    getStatusUpdateComments: { asyncResult: true },
    addComment: { asyncResult: true }

} );

export default actions;

actions.getStatusUpdate.listenAndPromise( getStatusUpdate );
actions.addStatusUpdate.listenAndPromise( addStatusUpdate );
actions.updateStatusUpdate.listenAndPromise( updateStatusUpdate );
actions.deleteStatusUpdate.listenAndPromise( deleteStatusUpdate );

actions.getStatusUpdateComments.listenAndPromise( getStatusUpdateComments );
actions.addComment.listenAndPromise( addComment );