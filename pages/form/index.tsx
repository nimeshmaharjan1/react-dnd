import MultipleChoice from "@components/form/Multiple/multiple-choice";
import Checkbox from "@components/form/Checkbox/checkbox";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
interface CollectorCard {
  id?: string;
  type: string;
  multipleChoiceQuestion?: string;
  multipleChoiceAnswers?: [
    {
      multipleChoiceAnswer: string;
    }
  ];
  checkboxQuestion?: string;
  checkboxAnswer?: string;
}
interface DefaultValues {
  collectorCards: CollectorCard[];
}

enum CollectorCardType {
  MULTIPLE = "multiple choice",
  CHECKBOX = "checkboxes",
}

const reorder = (list: [], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Form = () => {
  const defaultValues: DefaultValues = {
    collectorCards: [],
  };
  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: "collectorCards" });
  const addCollectorCard = (type: CollectorCardType) => {
    if (type === CollectorCardType.MULTIPLE) {
      append({
        type: CollectorCardType.MULTIPLE,
        multipleChoiceQuestion: "First Multiple Question",
        multipleChoiceAnswers: [{ multipleChoiceAnswer: "" }],
      });
    } else if (type === CollectorCardType.CHECKBOX) {
      append({
        type: CollectorCardType.CHECKBOX,
        checkboxQuestion: "First Checkbox Question",
      });
    }
  };
  const onSubmit = (values: any) => {
    console.log("After submitted", values);
  };
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const items = reorder(getValues("collectorCards") as [], source.index, destination.index);

    setValue(
      "collectorCards",
      items.map((todo) => ({ ...(todo as any), itemPosition: items.indexOf(todo) }))
    );
    console.log(getValues("collectorCards"));
  };
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <div className="min-h-screen flex flex-col justify-between gap-4">
      {/* <header className="py-4 text-center  border-b-2">Header</header> */}
      <main className="flex flex-col items-center justify-center gap-4 py-4">
        <div className="actions flex gap-4">
          <button className="btn btn-primary" onClick={() => addCollectorCard(CollectorCardType.MULTIPLE)}>
            Multiple
          </button>
          <button className="btn btn-primary" onClick={() => addCollectorCard(CollectorCardType.CHECKBOX)}>
            Checkboxes
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="collectorcard">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="card min-h-[800px] w-[600px] bg-base-200 rounded shadow-lg flex-col p-4 py-8 items-center gap-4"
              >
                {fields.map((item: CollectorCard, index: number) => {
                  return (
                    <div key={item.id}>
                      {item.type === CollectorCardType.MULTIPLE ? (
                        <MultipleChoice
                          multipleChoiceIndex={index}
                          multipleChoiceInstance={item}
                          {...{ control, register, setValue, getValues, errors, defaultValues }}
                        ></MultipleChoice>
                      ) : item.type === CollectorCardType.CHECKBOX ? (
                        <Checkbox checkboxInstanceIndex={index} checkboxInstance={item}></Checkbox>
                      ) : null}
                    </div>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button className="btn btn-secondary" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </main>
      <footer className="py-4 text-center">Footer</footer>
    </div>
  );
};

export default Form;
