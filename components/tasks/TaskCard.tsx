import { ItemTypes } from "@lib/enums";
import React from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";

interface Props {
  title: string;
  details: string;
  category: string;
  _id?: string;
}

const TaskCard: React.FC<Props> = ({ title, details, category, _id }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      _id,
    },
    collect: (monitor: any) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  return (
    <div ref={drag} className={`card bg-amber-400 text-black shadow-xl cursor-grab w-96 opacity-${isDragging ? "50" : "100"} rounded-xl`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{details}</p>
        <div className="card-actions justify-end">
          <button className={`btn ${category === "shopping" ? "btn-accent" : "btn-success"} text-white`}>{category}</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
