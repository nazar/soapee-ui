import React, { PureRenderMixin  } from 'react/addons';

import ShareThis from 'components/shareThis';

export default React.createClass( {

    mixins: [
        PureRenderMixin
    ],

    render() {
        return (
            <footer className="footer hidden-print">
                <div className="container">
                    <div className="row">

                        <div className="content col-md-6 col-sm-12">
                            <div>Soapee is a Saponification calculator, soap recipe and oils database</div>
                            <div>
                                Find us on <a href="https://www.reddit.com/r/soapee/" target="_blank">Reddit</a> or <a href="http://facebook.com/soapee" target="_blank">Facebook</a>.
                                All source code is published on <a href="http://github.com" target="_blank">GitHub</a>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <div className="pull-right">
                                <ShareThis />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

} );