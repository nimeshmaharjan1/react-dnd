import { Item, ItemTypes } from "@lib/enums";
import { CardContext } from "@pages/index";
import React, { ReactNode, useContext } from "react";
import { useDrop } from "react-dnd";

export interface Props {
  children: ReactNode;
}

const BoxTarget: React.FC<Props> = ({ children }) => {
  const { markTaskAsDone } = useContext(CardContext);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD, //will only accept card types
    drop: (item: Item, monitor) => markTaskAsDone(item._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), //is the dragged item over the drop location
    }),
  });
  return (
    <div
      ref={drop}
      className={`min-h-[500px] ${
        isOver ? "bg-blue-200" : "bg-transparent"
      }  text-black rounded p-4  flex flex-col gap-2 justify-center items-center`}
    >
      {children}
    </div>
  );
};

export default BoxTarget;
