import Reflux from 'reflux';

import {
    getOilById,

    getOilComments,
    addCommentToOil
} from 'resources/oils';

let actions = Reflux.createActions( {
    getOilById: { asyncResult: true },

    getOilComments: { asyncResult: true },
    addCommentToOil: { asyncResult: true }
} );

export default actions;

actions.getOilById.listenAndPromise( getOilById );

actions.getOilComments.listenAndPromise( getOilComments );
actions.addCommentToOil.listenAndPromise( addCommentToOil );