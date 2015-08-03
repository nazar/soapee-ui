import _ from 'lodash';

export default {

    radioState( key, checkedValue ) {
        return {
            value: this.state[ key ] === checkedValue,
            requestChange: checked => {
                let newState = {
                    [key]: checkedValue
                };

                if ( checked ) {
                    this.setState( newState );
                }
            }
        };
    },

    radioStore( store, key, checkedValue ) {
        return {
            value: store.getStoreValue( key ) === checkedValue,
            requestChange: checked => {
                if ( checked ) {
                    store.setStoreValue( key, checkedValue );
                }
            }
        };
    },

    radioModel( model, key, checkedValue ) {
        return {
            value: model.getModelValue( key ) === checkedValue,
            requestChange: checked => {
                if ( checked ) {
                    model.setModelValue( key, checkedValue );
                }
            }
        };
    },

    checkboxModel( model, key, checkedValue ) {
        return {
            value: model.getModelValue( key ) === checkedValue,
            requestChange: checked => {
                model.setModelValue( key, checked );
            }
        };
    },

    linkStore( store, key ) {
        return {
            value: store.getStoreValue( key ),
            requestChange: v => {
                store.setStoreValue( key, v );
            }
        };
    },

    linkModel( model, key, options = {} ) {
        let value;

        if ( options.round ) {
            value = _.round( model.getModelValue( key ), options.round );
        } else {
            value = model.getModelValue( key );
        }

        return {
            value,
            requestChange: v => {
                model.setModelValue( key, v );
            }
        };
    }


};