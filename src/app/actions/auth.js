import Reflux from 'reflux';

import {
    signupOrLoginThirdParty,
    signupLocal,
    loginLocal,
    logout
} from 'resources/auths';

let actions = Reflux.createActions( {
    //async action
    signupOrLoginThirdParty: { asyncResult: true },
    signupLocal: { asyncResult: true },
    loginLocal: { asyncResult: true },
    logout: { asyncResult: true }
} );

export default actions;

actions.signupOrLoginThirdParty.listenAndPromise( signupOrLoginThirdParty );
actions.signupLocal.listenAndPromise( signupLocal );
actions.loginLocal.listenAndPromise( loginLocal );
actions.logout.listenAndPromise( logout );