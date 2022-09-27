import { Todo } from "@pages/beautiful";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Complete: React.FC<{ todo: Todo; index: number }> = ({ todo, index }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="card bg-base-100 shadow-xl">
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

export default Complete;
