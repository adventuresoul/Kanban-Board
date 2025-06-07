import { KanbanContext } from "./KanbanContext";
import { useReducer } from "react";
import { KanbanReducer } from "./KanbanReducer";


export const KanbanProvider = ({ children }) => {
    const initialTasks = [];

    const [ boardData, dispatch ] = useReducer(KanbanReducer, initialTasks);

    const addTask = (task) => dispatch({ type: "ADD_TASK", payload: task });
    const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: id });
    const editTask = (id, updatedTask) => dispatch({ type: "EDIT_TASK", payload: {id, updatedTask} });
    const moveTask = (id, toColumn) => dispatch({ type: "MOVE_TASK", payload: {id, toColumn} });
    

    const value = {
        boardData,
        dispatch,
        addTask,
        deleteTask,
        editTask,
        moveTask
    };

    return (
        <KanbanContext.Provider value={value}>
            {children}
        </KanbanContext.Provider>
    );
};