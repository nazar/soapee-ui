import Checkit from 'checkit';
import { usernameExists, emailExists } from 'resources/auths';

export default class {

    constructor( payload ) {
        this.payload = payload;
    }

    execute() {
        let rules = new Checkit( {
            username: [ 'required', 'alphaDash', 'minLength:3', 'maxLength:12', this.checkIfUsernameExists ],
            password: [ 'required', 'alphaDash', 'minLength:6', 'maxLength:20' ],
            email: [ 'email', this.checkIfEmailExists ]
        } );

        return rules.run( this.payload );
    }

    checkIfUsernameExists( username ) {
        return usernameExists( username )
            .then( result => {
                if ( result.exists ) {
                    throw new Error( 'Username already exists. Please pick another or login instead.' );
                }
            } );
    }

    checkIfEmailExists( email ) {
        return emailExists( email )
            .then( result => {
                if ( result.exists ) {
                    throw new Error( 'Email already exists. Please pick another or login instead.' );
                }
            } );
    }
}