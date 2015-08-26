import React from 'react/addons';
import DocMeta from 'react-doc-meta';

import FacebookComments from 'components/facebookComments';

export default React.createClass( {

    render() {
        document.title = 'Soapee - Resources';

        return (
            <div id="resources">
                <DocMeta tags={ this.tags() } />
                <div className="jumbotron">
                    <h1>Soap Making Resources</h1>
                    <p>These are some resources from around the net that helped in my soap making journey. Please add any additional suggestions for this page in the comments box bellow.</p>
                </div>

                <h2>Websites</h2>
                <ul className="list-unstyled">
                    <li><a href="https://www.reddit.com/r/soapmaking/" target="_blank">Soap Making on Reddit</a></li>
                    <li><a href="https://www.facebook.com/groups/howtomakesoap/" target="_blank">Soap Making group on Facebook</a></li>
                    <li><a href="http://www.soapmakingforum.com/" target="_blank">Soap Making Forum</a></li>
                    <li><a href="http://www.modernsoapmaking.com/" target="_blank">Modern Soap Making Blog</a></li>
                </ul>

                <h2>Videos</h2>

                <div className="row">
                    <div className="col-md-6 text-center">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/3VUGV_H7bZU" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="col-md-6 text-center">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/CWkioBbHgYg" frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 text-center">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/o6brP--yQpU" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="col-md-6 text-center">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/scokYOkLcQo" frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>

                <h2>Books</h2>
                <div className="row">
                    <div className="col-md-2 col-sm-3 col-xs-4">
                        <iframe width="120" height="240" marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=mybo-21&marketplace=amazon&region=GB&placement=B00E8GWRKS&asins=B00E8GWRKS&linkId=5DROKJPPAEVCVQG6&show_border=true&link_opens_in_new_window=true"></iframe>
                    </div>
                    <div className="col-md-2 col-sm-3 col-xs-4">
                        <iframe width="120" height="240" marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=mybo-21&marketplace=amazon&region=GB&placement=B004C04PF0&asins=B004C04PF0&linkId=64MZJB5I2MS77OIL&show_border=false&link_opens_in_new_window=true"></iframe>
                    </div>
                </div>

                <h2>Products</h2>
                <div className="row">
                    <div className="col-md-2 col-sm-3 col-xs-4">
                        <iframe width="120" height="240" marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=mybo-21&marketplace=amazon&region=GB&placement=B007JT27BK&asins=B007JT27BK&linkId=DI4KJG4P3NJEGWMP&show_border=true&link_opens_in_new_window=true"></iframe>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#facebook" aria-controls="facebook" role="tab" data-toggle="tab">Facebook Comments</a></li>
                        </ul>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="facebook">
                                <FacebookComments
                                    url={ window.location }
                                    />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    },

    tags() {
        let description = `Soapee Soap Making Resources`;

        return [
            {name: 'description', content: description},
            {name: 'twitter:card', content: description},
            {name: 'twitter:title', content: description},
            {property: 'og:title', content: description}
        ];
    }


} );

