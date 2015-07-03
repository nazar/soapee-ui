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
    }



}