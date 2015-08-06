import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

export default React.createClass( {

    render() {
        return (
            <div className="recipes-link-table">
                <table className="table table-striped table-condensed table-super-condensed table-bordered">
                    <thead>
                    <th>
                        Recipe Name
                    </th>
                    </thead>
                    <tbody>
                    { _.map( this.props.recipes, this.renderRow ) }
                    </tbody>
                </table>
            </div>
        );
    },

    renderRow( recipe ) {
        return (
            <tr key={ `recipe-table-${recipe.id}` }>
                <td><Link to="recipe" params={ { id: recipe.id } }>{ recipe.name }</Link></td>
            </tr>
        );
    }

} );