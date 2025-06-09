const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const EDIT_TASK = "EDIT_TASK";
const MOVE_TASK = "MOVE_TASK";

export const KanbanReducer = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return [...state, action.payload];

        case DELETE_TASK:
            console.log(action.payload.id);
            return state.filter(
                task => task.id !== action.payload.id 
            );
        
        case EDIT_TASK:
            return state.map(
                task => task.id === action.payload.id ? 
                { ...task, ...action.payload.updatedTask } : task
            );
        
        case MOVE_TASK:
            return state.map(
                task => task.id === action.payload.id ?
                    { ...task, column: action.payload.toColumn } :
                    task
            );

        default: 
            return state
    }
}