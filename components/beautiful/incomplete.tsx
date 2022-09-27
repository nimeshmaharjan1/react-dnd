import { Todo } from "@pages/beautiful";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Incomplete: React.FC<{ todo: Todo; index: number }> = ({ todo, index }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div className="card w-96 bg-base-100 shadow-xl" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className="card-body">
            <h2 className="card-title">{todo.text}</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-info">CHORES</button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Incomplete;
