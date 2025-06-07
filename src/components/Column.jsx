import { useState, memo, useContext } from "react";
import TaskAdderForm from "./TaskAdderForm";
import TaskCard from "./TaskCard";
import { KanbanContext } from "../context/KanbanContext";
import { Droppable }from "react-beautiful-dnd"; 

function Column({ title }) {
    const { boardData } = useContext(KanbanContext);

    const [ formEnabled, setFormEnabled ] = useState(false);

    return (
        <div className="bg-gray-100 p-4 rounded-lg w-72 flex flex-col">
            <h1 className="text-lg font-bold mb-4">{title}</h1>

            <button
                onClick={() => setFormEnabled(prev => !prev)}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-cyan-500 transition"
            >
                {formEnabled ? "Cancel" : "Add Task"}
            </button>

            {formEnabled && <TaskAdderForm column={title} />}

            <Droppable droppableId={title}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="p-4 flex flex-col gap-3 overflow-y-auto max-h-[60vh] mt-4"
                    >
                        {boardData.filter(task => task.column === title).length === 0 ? (
                            <p>No tasks here</p>
                        ) : (
                            boardData
                                .filter(task => task.column === title)
                                .map((task, index) => (
                                    <TaskCard
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        column={task.column}
                                        index={index}
                                    />
                                ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
    
}

export default memo(Column);