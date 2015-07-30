import Checkit from 'checkit';

export default class {

    constructor( payload ) {
        this.payload = payload;
    }

    execute() {
        let rules = new Checkit( {
            comment: [ 'required', 'maxLength:2000' ]
        } );

        return rules.run( this.payload );
    }
}