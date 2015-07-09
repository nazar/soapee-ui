import React from 'react';
import Scribe from 'scribe-editor';
import scribePluginToolbar from 'scribe-plugin-toolbar';
import scribePluginSanitizer from 'scribe-plugin-sanitizer';

export default React.createClass( {

    componentDidMount() {
        let scribeElement = this.refs.scribe.getDOMNode();
        let scribe = new Scribe( scribeElement );
        let toolbarElement = this.refs.toolbar.getDOMNode();

        scribe.use( scribePluginToolbar( toolbarElement ) );
        scribe.use( scribePluginSanitizer( {
            tags: {
                p: {},
                b: {},
                i: {},
                ul: {},
                li: {},
                br: {}
            } } ) );

        scribe.setContent( this.props.content );

        scribe.on( 'content-changed', updateData.bind( this ) );

        function updateData() {
            this.props.onHtml( scribe.getHTML() );
        }
    },

    render() {
        return (
            <div className="text-editor">
                <div ref="toolbar">
                    <div className="btn-toolbar">
                        <div className="btn-group">
                            <button data-command-name="bold" className="btn btn-primary btn-sm"><i className="fa fa-bold"></i></button>
                            <button data-command-name="italic" className="btn btn-primary btn-sm"><i className="fa fa-italic"></i></button>
                        </div>

                        <div className="btn-group">
                            <button data-command-name="insertOrderedList" className="btn btn-primary btn-sm"><i className="fa fa-list-ol"></i></button>
                            <button data-command-name="insertUnorderedList" className="btn btn-primary btn-sm"><i className="fa fa-list-ul"></i></button>
                        </div>
                    </div>
                </div>
                <div className="editor" contentEditable="true" ref="scribe"/>
            </div>
        );
    }

} );