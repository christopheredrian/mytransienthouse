export default (state = [], action) => {

    switch (action.type) {
        case 'INITIALIZE_USER':
            console.log("Reducer: INITIALIZE_USER");
            return {
                ...state,
                ...action.user,
            };


        case 'LOGOUT_USER':
            console.log("Reducer: LOGOUT_USER");

            const newState = {};

            console.log(newState);
            console.log("end");
            return newState;
        default:
            return state
    }
};
