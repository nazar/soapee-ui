import React from 'react';
import marked from 'marked';

export default React.createClass( {

    componentDidMount() {
        $( this.getDOMNode() ).find( 'textarea' ).markdown( {
            iconlibrary: 'fa',
            fullscreen: {
                enable: false
            },
            hiddenButtons: [ 'cmdCode' ],

            onPreview: this.preview
        } );
    },

    render() {
        return (
            <div className="markdown-editor">
                <textarea
                    {...this.props}
                    />
            </div>
        );
    },

    preview( e ) {
        return marked( e.getContent(), {
            sanitize: true,
            smartypants: true
        } );
    }

} );