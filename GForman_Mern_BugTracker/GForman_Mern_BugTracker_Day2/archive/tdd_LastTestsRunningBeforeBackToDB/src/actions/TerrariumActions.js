import dispatcher from '../store/dispatcher';

export function basicAction(searchParameters) {
    
    dispatcher.dispatch({
        type: "ACTION_TYPE",
        searchParameters,
    });
}

export function searchBugs(bugsValues) {
    
    dispatcher.dispatch({
        type: "BUGS_SEARCH",
        bugsValues,
    });
}
	
export function sortBugs(sortValues) {
    
    dispatcher.dispatch({
        type: "BUGS_SORT",
        sortValues,
    });
}