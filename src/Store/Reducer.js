import * as types from './ActionTypes'


const initialState = {
    user: {},
    employee: {},
    employees: [],
}


const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                user: action.payload
            };
            
        case types.LOGOUT:
            return {
                ...state,
                user: null
            };
        
        case types.GET_EMPLOYEES:
            console.log('--- payload', action.payload);
            return {
                ...state,
                employee:action.payload,
                employees: action.payload
            };
        default:
            return state;
    }
};

export default employeeReducer




// console.log('--- payload', action.payload);
// return {
//     ...state,
//     employee: action.employee,
//     employees: action.employees
// };