import React from "react";
import { Question as QuestionType } from "../Types/Quiz";

type Props = {
  question: QuestionType;
  onAnswer: (selected: string) => void;
  selectedAnswer: string | null;
  index: number;
  total: number;
}

const Question: React.FC<Props> = ({ question, onAnswer, selectedAnswer, index, total }) => {
  return (
    <div className="border p-6 rounded-lg mb-4 w-full max-w-md bg-white shadow">
      <h4 className="text-sm text-gray-500 mb-1">Question {index + 1} of {total}</h4>
      <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            disabled={!!selectedAnswer}
            className={`px-4 py-2 rounded border transition ${
              selectedAnswer === opt
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;