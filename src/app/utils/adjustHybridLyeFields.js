export default function( key, value ) {

    if ( key === 'ratioNaoh' ) {
        this.store.recipe.ratioKoh = 100 - value;
    } else if ( key === 'ratioKoh' ) {
        this.store.recipe.ratioNaoh = 100 - value;
    }

}