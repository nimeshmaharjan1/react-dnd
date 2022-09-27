import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useFieldArray } from "react-hook-form";
interface Props {
  control: any;
  register: any;
  setValue: any;
  getValues: any;
  errors: any;
  multipleChoiceIndex: number;
  multipleChoiceInstance: any;
  defaultValues: any;
}
const MultipleChoice: React.FC<Props> = ({
  control,
  register,
  setValue,
  getValues,
  errors,
  multipleChoiceIndex,
  multipleChoiceInstance,
  defaultValues,
}) => {
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `collectorCards[${multipleChoiceIndex}].multipleChoiceAnswers`,
  });
  return (
    <Draggable draggableId={multipleChoiceInstance.id} index={multipleChoiceIndex}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="px-8 py-4 pb-6 bg-base-100 shadow-lg rounded"
        >
          <h2 className="font-bold text-2xl">Multiple Choices</h2>

          <div className="py-4">
            <label>Question</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              {...register(`collectorCards.${multipleChoiceIndex}.multipleChoiceQuestion` as const, { required: true })}
            />

            {errors.collectorCards?.[multipleChoiceIndex]?.multipleChoiceQuestion && (
              <p className="mt-2 text-red-500">This cannot be empty!</p>
            )}
          </div>

          <h2 className="font-bold text-lg pb-2">Answers</h2>
          <div className="flex flex-col gap-4">
            {answerFields.map((answerField: any, answerIndex: number) => {
              return (
                <div key={answerField.id} className="form-group mb-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    {...register(
                      `collectorCards[${multipleChoiceIndex}].multipleChoiceAnswers.${answerIndex}.multipleChoiceAnswer` as const,
                      {
                        required: true,
                      }
                    )}
                    placeholder="Enter answer here"
                  />
                  {errors.collectorCards?.[multipleChoiceIndex].multipleChoiceAnswers?.[answerIndex]?.multipleChoiceAnswer && (
                    <p className="mt-2 text-red-500">This cannot be empty!</p>
                  )}
                </div>
              );
            })}
            <button
              className="btn btn-primary"
              onClick={() => {
                appendAnswer({
                  multipleChoiceAnswer: "",
                });
              }}
            >
              Add Answer
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default MultipleChoice;
