import React from 'react';
import DocMeta from 'react-doc-meta';

import { Link } from 'react-router';

import background from 'assets/img/landing-background.jpg';

export default React.createClass( {

    componentDidMount() {
        document.title = 'Soapee';
    },

    render() {
        let style = {
            background: `url(${background}) no-repeat center center scroll`
        };

        return (
            <div id="main-landing">
                <DocMeta tags={ this.tags() } />
                <div className="header-container">
                    <div className="header clearfix" style={style}>
                        <div className="text-vertical-center">
                            <h1>Soapee</h1>
                            <h2>Soap Making Community and Resources</h2>
                            <br />
                            <button className="btn btn-primary btn-lg" onClick={ this.scrollTo( '#about' ) }>Find Out More</button>
                        </div>
                    </div>
                </div>

                <section id="about">
                    <div className="col-ld-12 text-center">
                        <h3>Soapee is a Saponification Calculator and a Soap Recipe Database</h3>
                        <p className="lead"><Link to="signup">Register</Link> today to start creating, saving and sharing your soap recipes</p>
                    </div>
                </section>

                <section id="start">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="start-item">
                                <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-calculator fa-stack-1x text-primary"></i>
                                </span>
                                <h4>
                                    <strong>Soap Calculator</strong>
                                </h4>
                                <p>Make Solid or Liquid soaps.</p>
                                <Link to="calculator" className="btn btn-primary">Start</Link>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="start-item">
                                <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-database fa-stack-1x text-primary"></i>
                                </span>
                                <h4>
                                    <strong>Recipe Database</strong>
                                </h4>
                                <p>View user submitted recipes</p>
                                <Link to="recipes" className="btn btn-primary">Start</Link>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="start-item">
                                <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-table fa-stack-1x text-primary"></i>
                                </span>
                                <h4>
                                    <strong>Oils Database</strong>
                                </h4>
                                <p>View oil properties</p>
                                <Link to="oils" className="btn btn-primary">Start</Link>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="start-item">
                                <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-book fa-stack-1x text-primary"></i>
                                </span>
                                <h4>
                                    <strong>Resources</strong>
                                </h4>
                                <p>View soap making resources</p>
                                <Link to="resources" className="btn btn-primary">Start</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="info">
                    <div className="jumbotron">
                        <p className="lead">Soapee is a community driven resource. Find us on <strong><a href="https://www.reddit.com/r/soapee" target="_blank">Reddit</a></strong> and <strong><a href="https://www.facebook.com/soapeepage" target="_blank">Facebook</a></strong> to add your ideas, suggestions and feedback.</p>
                        <p className="lead">
                            All Soapee source code is released to the public domain. The UI and API source
                            code can be found <strong><a href="https://github.com/nazar/soapee-ui" target="_blank">here</a></strong> and&nbsp;
                            <strong><a href="https://github.com/nazar/soapee-api" target="_blank">here</a></strong>.
                        </p>
                    </div>
                </section>
            </div>
        );
    },

    scrollTo( ref ) {
        return () => {
            $( 'html,body' ).animate( {
                scrollTop: $( ref ).offset().top
            }, 1000 );
        };
    },

    tags() {
        let description = 'Soapee is a Saponification Calculator and a Soap Recipe Database';

        return [
            {name: 'description', content: description},
            {name: 'twitter:card', content: description},
            {name: 'twitter:title', content: description},
            {property: 'og:title', content: description}
        ];
    }


} );