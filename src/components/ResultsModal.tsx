import React from "react";

type Props = {
onViewAnswers: () => void;
  visible: boolean;
  score: number;
  total: number;
  wrongAnswers: string[];
  onRetry: () => void;
  onClose: () => void;
}

const ResultsModal: React.FC<Props> = ({
  visible,
  score,
  total,
  wrongAnswers,
  onRetry,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Your Result</h2>
        <p className="mb-2 text-lg">
          Score: {score} / {total}
        </p>

        {wrongAnswers.length > 0 && (
          <div className="mb-2 text-left">
            <p className="font-semibold">Wrong Questions:</p>
            <ul className="list-disc list-inside text-sm">
              {wrongAnswers.map((wa, idx) => (
                <li key={idx}>{wa}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2 justify-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={onRetry}
          >
            Try Again
          </button>

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;