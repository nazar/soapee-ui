import React from 'react/addons';
import DropzoneComponent from 'react-dropzone-component';

import config from 'config';

export default React.createClass( {

    mixins: [
        React.addons.PureRenderMixin
    ],

    componentDidMount() {
        this.props.startImageUpload( this.startImageUpload );
    },

    render() {
        let dropZoneComponentConfig = {
            allowedFiletypes: [ '.jpg', '.png', '.gif' ],
            showFiletypeIcon: true
        };

        let dropZoneJsConfig = {
            addRemoveLinks: true,
            autoProcessQueue: false,
            parallelUploads: 1,
            dictDefaultMessage: 'Click or Drop files here to upload'
        };

        let eventHandlers = {
            sending: this.sending,
            drop: () => {},
            complete: this.removeFile,
            queuecomplete: this.queuecomplete
        };

        return (
            <DropzoneComponent
                className="imageable"
                action={ `${config.baseUrl}imageable` }
                ref="images"
                config={ dropZoneComponentConfig }
                eventHandlers={ eventHandlers }
                djsConfig={ dropZoneJsConfig }
                />
        );
    },

    startImageUpload( imageableId ) {
        this.imageableId = imageableId;

        if ( this.refs.images.state.files.length ) {
            this.refs.images.dropzone.options.autoProcessQueue = true;
            this.refs.images.dropzone.processQueue();
        } else {
            this.props.OnUploadedCompleted();
        }

    },

    sending( file, xhr, params ) {
        params.append( 'imageable_id', this.imageableId );
        params.append( 'imageable_type', this.props.imageableType );
    },

    removeFile( file ) {
        this.refs.images.dropzone.removeFile( file );
    },

    queuecomplete() {
        this.refs.images.dropzone.options.autoProcessQueue = false;
        this.props.OnUploadedCompleted();
    }

} );