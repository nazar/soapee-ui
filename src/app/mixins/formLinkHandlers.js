export default {

    radioState( key, checkedValue ) {
        return {
            value: this.state[key] === checkedValue,
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

    linkModel( model, key ) {
        return {
            value: model.getModelValue( key ),
            requestChange: v => {
                model.setModelValue( key, v );
            }
        };
    }


};