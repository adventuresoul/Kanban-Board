export const KanbanReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];

        case "DELETE_TASK":
            return state.filter(
                task => task.id !== action.payload.id 
            );
        
        case "EDIT_TASK":
            return state.map(
                task => task.id === action.payload.id ? 
                { ...task, ...action.payload.updatedTask } : task
            );
        
        case "MOVE_TASK":
            return state.map(
                task => task.id === action.payload.id ?
                    { ...task, column: action.payload.toColumn } :
                    task
            );

        default: 
            return state
    }
}