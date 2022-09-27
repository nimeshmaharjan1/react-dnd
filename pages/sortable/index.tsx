import Card from "@components/sortable/Card";
import { data } from "@lib/data";
import React, { useCallback, useEffect, useState } from "react";
import update from "immutability-helper";
import { v4 as uuid } from "uuid";
export interface Item {
  id: any;
  text: string;
  itemIndex?: number;
}

export interface ContainerState {
  cards: Item[];
}
const SortableList: React.FC = () => {
  const [cardName, setCardName] = useState<string>("");
  const [cards, setCards] = useState<Item[]>([]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) => {
      const sortedCards = prevCards.map((item: Item) => {
        return { ...item, itemPosition: prevCards.indexOf(item) };
      });
      console.log({ sortedCards });
      return update(sortedCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, sortedCards[dragIndex] as Item],
        ],
      } as any);
    });
  }, []);

  const renderCard = useCallback((card: Item, index: number) => {
    return <Card key={card.id} index={index} item={card} moveCard={moveCard}></Card>;
  }, []);

  const addCard = () => {
    const item = {
      id: uuid(),
      text: cardName,
    };
    setCards((previousItems: Item[]) => {
      console.log(previousItems);
      const newItems = [...previousItems, item];
      return newItems;
    });
    setCardName("");
    console.log("after adding", cards);
  };

  useEffect(() => console.log("use effect: ", cards), [cards]);
  return (
    <div className="min-h-screen flex flex-col items-center gap-4 py-4">
      <div>
        <input
          type="text"
          className="bg-base-200 focus:outline-none p-2 shadow-lg"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
      </div>
      <div className="actions">
        <button className="btn btn-primary" onClick={addCard}>
          Add Card
        </button>
      </div>
      {cards && cards.map((card: Item, index: number) => renderCard(card, index))}
    </div>
  );
};

export default SortableList;
