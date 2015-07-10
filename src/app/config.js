import _ from 'lodash';

let env = process.env;

let config = {

    general: {},

    development: {
        baseUrl: 'http://192.168.30.21:3000/api/',
        auth: {
            facebookClientId: '696173290526521',
            googleClientId: '161187113696-q5edt0566uiu0pbjvc87653utl678tdm.apps.googleusercontent.com'
        }
    },

    production: {
        baseUrl: 'http://soapee.com/api/',
        auth: {
            facebookClientId: '696173107193206',
            googleClientId: '454314644896-jj8kjlbq9edd1k0e5hbrvfo3jq73succ.apps.googleusercontent.com'
        }
    }
};

export default _.extend( {}, config.general, config[ env.NODE_ENV ] );