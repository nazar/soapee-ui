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

    linkStore( store, key ) {
        return {
            value: store.getStoreValue( key ),
            requestChange: v => {
                store.setStoreValue( key, v );
            }
        };
    }


};