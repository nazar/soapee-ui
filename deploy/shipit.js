var config = {
    default: {
        workspace: './build',
        deployTo: '/var/www/soapee.com/ui/',
        rsync: [ '--del' ],
        keepReleases: 3,
        deleteOnRollback: false
    },

    production: {
        servers: [ {
            host: '176.58.125.89',
            user: 'nazar'
        } ],
        key: '/home/vagrant/files/deploy/keys/production'
    }
};

module.exports.config = config;

module.exports.init = function ( shipit ) {
    require( './deploy' )( shipit );

    shipit.initConfig( config );
};