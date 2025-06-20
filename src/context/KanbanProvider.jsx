import { KanbanContext } from "./KanbanContext";
import { useEffect, useReducer } from "react";
import { KanbanReducer } from "./KanbanReducer";

// initial tasks
const initialTasks = [];

// get saved tasks if present
const getInitialDataFromLocalStorage = () => {
    const saved = localStorage.getItem("KanbanBoard");
    return saved ? JSON.parse(saved) : initialTasks;
}

export const KanbanProvider = ({ children }) => {
    

    const [ boardData, dispatch ] = useReducer(KanbanReducer, initialTasks, getInitialDataFromLocalStorage);

    const addTask = (task) => dispatch({ type: "ADD_TASK", payload: task });
    const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: {id} });
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

    // on any state change sync the localSavedData
    useEffect(() => {
        localStorage.setItem("KanbanBoard", JSON.stringify(boardData))
    }, [boardData]);

    return (
        <KanbanContext.Provider value={value}>
            {children}
        </KanbanContext.Provider>
    );
};