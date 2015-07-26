var utils = require( 'shipit-utils' );


module.exports = function ( gruntOrShipit ) {
    require( 'shipit-deploy' )( gruntOrShipit );

    require( './update' )( gruntOrShipit );

    utils.registerTask( gruntOrShipit, 'deploy-local', [
        'deploy:init',
        'deploy:update-local',
        'deploy:publish',
        'deploy:clean'
    ] );
};