import { useContext } from "react";
import { useRef, memo, useState } from "react";
import { KanbanContext } from "../context/KanbanContext";

function TaskAdderForm({ column }) { 
    const ref = useRef(null);

    const { addTask } = useContext(KanbanContext);

    const [ task, setTask ] = useState({
        id: new Date().getTime().toString(),
        title: "",
        description: "",
        column: column
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (task.title === "") {
            alert("Task title cannot be empty!");
            return;
        }

        if (task.description === "") {
            alert("Task description cannot be empty!");
            return;
        }

        addTask(task);

        ref.current.focus();

        setTask({
            id: new Date().getTime().toString(),
            title: "",
            description: "",
            column: column
        })
    };



    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow">
                    <div className="mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                        <input
                        type="text"
                        value={task.title}
                        placeholder="Task name"
                        ref={ref}
                        onChange={(e) => setTask(task => ({...task, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <input
                        type="text"
                        value={task.description}
                        placeholder="Task description"
                        onChange={(e) => setTask(task => ({ ...task, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Task
                    </button>
                </form>
        </div>
    );
}

export default memo(TaskAdderForm);