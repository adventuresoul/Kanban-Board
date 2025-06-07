import { useContext } from "react";
import Column from "./Column";
import { DragDropContext }from "react-beautiful-dnd"; 
import { KanbanContext } from "../context/KanbanContext";


function KanbanBoard() {
    const columns = ["To-do", "In-progress", "Completed", "Emergency"];

    const { moveTask } = useContext(KanbanContext);

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        
        if (!destination || source.droppableId === destination.droppableId) return;
        
        moveTask(draggableId, destination.droppableId);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="p-6">
                <div className="bg-emerald-800 p-4 rounded-lg flex justify-center items-center">
                    <h1 className="text-2xl font-extrabold text-white text-center font-sans tracking-wide">
                        Kanban Board
                    </h1>
                </div>
                <div className="flex gap-6 justify-center items-start">
                    {
                        columns.map(col => (
                            <Column key={col} title={col} />
                        ))
                    }
                </div>
            </div>
        </DragDropContext>
        
    );
}

export default KanbanBoard;