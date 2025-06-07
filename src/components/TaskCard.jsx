import { useContext } from "react";
import { useState, useEffect, memo } from "react";
import { KanbanContext } from "../context/KanbanContext";
import { Draggable } from "react-beautiful-dnd";

function TaskCard({ id, title, description, column, index }) {
    const { deleteTask, editTask } = useContext(KanbanContext);

    const [task, setTask] = useState({
        id,
        title,
        description,
        category: column
    });

    const [isEditing, setIsEditing] = useState(false);

    // Sync local state when props change (after edit)
    useEffect(() => {
        setTask({ id, title, description, column });
    }, [id, title, description, column]);

    const saveTask = () => {
        editTask(id, task);
        setIsEditing(false);
    };

    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-4 rounded-lg shadow-emerald-950 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                    <p className="text-xs text-gray-400 mb-1">#{id}</p>

                    {isEditing ? (
                        <div className="flex flex-col space-y-2">
                            <input
                                type="text"
                                value={task.title}
                                onChange={(e) => setTask({ ...task, title: e.target.value })}
                                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <input
                                type="text"
                                value={task.description}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <button
                                onClick={saveTask}
                                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-md font-semibold text-gray-800">{task.title}</h1>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-2 text-green-600 hover:underline text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTask(id)}
                                    className="mt-2 text-red-600 hover:underline text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default memo(TaskCard);
