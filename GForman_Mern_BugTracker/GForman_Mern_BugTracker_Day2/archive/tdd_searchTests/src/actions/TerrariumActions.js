import dispatcher from '../store/dispatcher';

export function basicAction(searchParameters) {
    
    dispatcher.dispatch({
        type: "ACTION_TYPE",
        searchParameters,
    });
}

export function searchBugs(bugsText) {
    
    dispatcher.dispatch({
        type: "BUGS_SEARCH",
        bugsText,
    });
}