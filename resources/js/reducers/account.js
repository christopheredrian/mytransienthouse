export default (state = [], action) => {

    switch (action.type) {
        case 'INITIALIZE_ACCOUNT':
            console.log("Reducer: INITIALIZE_ACCOUNT");
            console.log(action.account);

            return {
                ...state,
                ...action.account,
            };

        default:
            return state
    }
};
