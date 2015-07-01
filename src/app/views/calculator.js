import React from 'react';

export default React.createClass( {

    render() {
        return (
            <div id="calculator">
                <form>
                    <div className="page-header">
                        <h1>Soap Lye Calculator
                            <small>Design your own soap</small>
                        </h1>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Making <strong>liquid</strong> or <strong>solid</strong> soap?</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="soap-type" id="optionsRadios1" value="option1"/>
                                        <strong>Solid</strong> Soap - Using <strong>NaOH</strong> (Sodium Hydroxide)
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="soap-type" id="optionsRadios2" value="option2"/>
                                        <strong>Liquid</strong> Soap - Using <strong>KOH</strong> (Potassium Hydroxide)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Select Units of Measure</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="radio-inline">
                                    <input type="radio" name="uom" value="option10" /> Percentages
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="uom"  value="option11" /> Grams
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="uom"  value="option12" /> Kilograms
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="uom"  value="option13" /> Pounds
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="uom"  value="option14" /> Ounces
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Total Soap Weight</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-inline">
                                <div className="form-group">
                                    <input type="text" className="form-control"/>
                                    <label className="radio-inline">
                                        <input type="radio" name="total-uom" value="option10" /> Percentages
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="total-uom"  value="option11" /> Grams
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="total-uom"  value="option12" /> Kilograms
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="total-uom"  value="option13" /> Pounds
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="total-uom"  value="option14" /> Ounces
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Water Content</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-inline">
                                <div className="form-group">
                                    <input type="text" id="inputHelpBlock" className="form-control" aria-describedby="helpBlock" /> %
                                    <span id="helpBlock" className="help-block">Type water as a percent of oils - recommended values 33% - 38% .</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Oil super fat</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-inline">
                                <div className="form-group">
                                    <input type="text" id="inputHelpBlock" className="form-control" aria-describedby="helpBlock" /> %
                                    <span id="helpBlock" className="help-block">.Percentage of super fat oils - recommended 5%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Select Oils</h3>
                        </div>
                        <div className="panel-body">
                        </div>
                    </div>


                </form>
            </div>
        );
    }

} );