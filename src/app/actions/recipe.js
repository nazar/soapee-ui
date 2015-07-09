import Reflux from 'reflux';

import {createRecipe} from 'resources/recipes';

let actions = Reflux.createActions( {
    //ui actions
    setNotes: {},

    //async action
    createRecipe: { asyncResult: true }
} );

export default actions;

actions.createRecipe.listenAndPromise( createRecipe );