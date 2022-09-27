import { ItemTypes } from "@lib/enums";
import { Item } from "@pages/sortable";
import React, { FC, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";

export interface CardProps {
  item: Item;
  index: number;
  moveCard: (id: number, index: number) => void;
}

interface DragItem {
  index: number;
  item: Item;
}

const Card: FC<CardProps> = ({ item, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { ...item, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD, //will only accept card types
    drop: (droppedItem: DragItem, monitor) => console.log("droppedItem: ", droppedItem),
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(), //is the dragged item over the drop location
      };
    },
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={`w-96 p-6 rounded bg-base-200 cursor-grab ${isDragging ? "opacity-50" : "opacity-100"}`}
      data-handler-id={handlerId}
    >
      {item.text}
    </div>
  );
};

export default Card;
