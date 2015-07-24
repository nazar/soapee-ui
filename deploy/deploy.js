var utils = require( 'shipit-utils' );


module.exports = function ( gruntOrShipit ) {
    require( 'shipit-deploy' )( gruntOrShipit );

    utils.registerTask( gruntOrShipit, 'deploy-local', [
        'deploy:init',
        'deploy:update',
        'deploy:publish',
        'deploy:clean'
    ] );
};