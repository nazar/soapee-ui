import React from 'react';

import ShareThis from 'components/shareThis';

export default React.createClass( {


    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">

                        <div className="content col-md-6 col-sm-12">
                            Footer Content
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