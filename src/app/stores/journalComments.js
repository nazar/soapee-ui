import Reflux from 'reflux';

import recipeActions from 'actions/recipe';
import recipeJournalStore from 'stores/recipeJournal';

export default Reflux.createStore( {

    recipeJournal: null,
    comments: [],

    init() {
        this.listenTo( recipeJournalStore, gotRecipeJournal.bind( this ) );
        this.listenTo( recipeActions.getRecipeJournalComments.completed, gotComments.bind( this ) );
    },

    getInitialState() {
        return this.store;
    },

    count() {
        return this.comments.length;
    },

    addComment( comment ) {
        return recipeActions.addCommentToRecipeJournal( comment, {id: this.recipeJournal.recipe_id}, this.recipeJournal )
            .then( addToComments.bind( this ) );
    }

} );

//////////////////////////
//// Private

function gotRecipeJournal( recipeJournal ) {
    this.recipeJournal = recipeJournal;
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