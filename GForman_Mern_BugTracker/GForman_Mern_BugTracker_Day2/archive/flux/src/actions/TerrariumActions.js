import dispatcher from '../store/dispatcher';

export function basicAction(searchParameters) {
    
    dispatcher.dispatch({
        type: "ACTION_TYPE",
        searchParameters,
    });
}