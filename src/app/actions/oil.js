import Reflux from 'reflux';

import {
    getOilById
} from 'resources/oils';

let actions = Reflux.createActions( {
    getOilById: { asyncResult: true }
} );

export default actions;

actions.getOilById.listenAndPromise( getOilById );