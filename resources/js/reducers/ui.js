export default (state = [], action) => {

    switch (action.type) {
        case 'INITIALIZE_ACCOUNT':
            console.log("Reducer (UI): INITIALIZE_ACCOUNT");
            console.log(action.ui);

            return {
                ...state,
                ...action.ui,
            };

        default:
            return state
    }
};
