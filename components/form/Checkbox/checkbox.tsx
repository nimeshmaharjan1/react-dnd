import React from "react";
import { Draggable } from "react-beautiful-dnd";

const checkbox: React.FC<any> = ({ checkboxInstanceIndex, checkboxInstance }) => {
  return (
    <Draggable draggableId={checkboxInstance.id} index={checkboxInstanceIndex}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 bg-indigo-500 shadow-lg rounded"
        >
          checkbox
        </div>
      )}
    </Draggable>
  );
};

export default checkbox;
