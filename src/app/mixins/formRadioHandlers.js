export default {

    radioState( key, checkedValue ) {
        return {
            value: this.state[key] === checkedValue,
            requestChange: checked => {
                let newState = {};

                if ( checked ) {
                    newState[key] = checkedValue;
                    this.setState( newState );
                }
            }
        };
    }



}