import Checkit from 'checkit';

export default class {

    constructor( payload ) {
        this.payload = payload;
    }

    execute() {
        let rules = new Checkit( {
            name: [ 'required', 'minLength:3', 'maxLength:50' ]
        } );

        return rules.run( this.payload );
    }
}