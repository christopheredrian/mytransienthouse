export default (state = [], action) => {

    switch (action.type) {
        case 'INITIALIZE_USER':
            console.log("Reducer: INITIALIZE_USER");
            return {
                ...state,
                ...action.user,
            };
        default:
            return state
    }
};
