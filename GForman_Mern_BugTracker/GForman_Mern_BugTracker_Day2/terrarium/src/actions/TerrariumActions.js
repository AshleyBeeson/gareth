import dispatcher from '../store/dispatcher';

export function basicAction(searchParameters) {
    
    dispatcher.dispatch({
        type: "ACTION_TYPE",
        searchParameters,
    });
}

export function searchBugs(bugsValues, sortValues) {
    
    dispatcher.dispatch({
        type: "BUGS_SEARCH",
        bugsValues, sortValues,
    });
}
	
export function sortBugs(sortValues) {
    
    dispatcher.dispatch({
        type: "BUGS_SORT",
        sortValues,
    });
}

export function pullFromDB() {
    
    dispatcher.dispatch({
        type: "DB_PULL",
    });
}