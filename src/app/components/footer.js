import React from 'react';

import ShareThis from 'components/shareThis';

export default React.createClass( {

    shouldComponentUpdate() {
        return false;
    },

    render() {
        return (
            <footer className="footer hidden-print">
                <div className="container">
                    <div className="row">

                        <div className="content col-md-7 col-sm-12">
                            <div>Soapee is a Saponification calculator, soap recipe and oils database</div>
                            <div>
                                Find us on <a href="https://www.reddit.com/r/soapee" target="_blank">Reddit</a> or <a href="https://www.facebook.com/soapeepage" target="_blank">Facebook</a>.
                                All source code is published on <a href="https://github.com/nazar/soapee-ui" target="_blank">GitHub</a>
                            </div>
                        </div>

                        <div className="col-md-5 col-sm-12 hidden-sm hidden-xs">
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