import Reflux from 'reflux';

import oilStore from 'stores/oil';
import oilActions from 'actions/oil';

export default Reflux.createStore( {

    oil: null,
    comments: [],

    init() {
        this.listenTo( oilStore, gotOil.bind( this ) );
        this.listenTo( oilActions.getOilComments.completed, gotComments.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    count() {
        return this.comments.length;
    },

    addComment( comment ) {
        return oilActions.addCommentToOil( comment, this.oil )
            .then( addToComments.bind( this ) );
    }

} );

//////////////////////////
//// Private

function gotOil( oil ) {
    this.oil = oil;
    oilActions.getOilComments( this.oil );
}

function gotComments( comments ) {
    this.comments = comments;
    doTrigger.call( this );
}

function addToComments( comment ) {
    this.comments.unshift( comment );
    doTrigger.call( this );
}

function doTrigger() {
    this.trigger( this.comments );
}