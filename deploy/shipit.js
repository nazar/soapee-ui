var config = {
    default: {
        workspace: './build',
        deployTo: '/var/www/soapee.com/ui/',
        rsync: ['--del'],
        keepReleases: 3,
        deleteOnRollback: false
    },

    production: {
        servers: 'soapee.com'
    }
};

module.exports.config = config;

module.exports.init = function(shipit) {
    require('./deploy')(shipit);

    shipit.initConfig(config);
};