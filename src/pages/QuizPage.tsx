import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Quiz } from "../Types/Quiz";
import QuestionComponent from "../components/Questions";
import Timer from "../components/Timer";
import ResultModal from "../components/ResultsModal";
import { saveQuizResult } from "../utils/localStorage";

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Math & Science Quiz",
    questions: [
      { id: 1, question: "12 × 8?", options: ["80","96","104","88"], answer: "96" },
      { id: 2, question: "√144?", options: ["10","11","12","14"], answer: "12" },
      { id: 3, question: "15 + 27?", options: ["40","42","43","45"], answer: "42" },
      { id: 4, question: "9²?", options: ["18","72","81","99"], answer: "81" },
      { id: 5, question: "Red Planet?", options: ["Earth","Mars","Jupiter","Venus"], answer: "Mars" },
      { id: 6, question: "Gas humans breathe?", options: ["CO2","Nitrogen","Oxygen","Hydrogen"], answer: "Oxygen" },
      { id: 7, question: "H2O is?", options: ["Salt","Water","Oxygen","Hydrogen"], answer: "Water" },
      { id: 8, question: "Bones in adult body?", options: ["106","206","306","406"], answer: "206" },
      { id: 9, question: "Force pulling objects down?", options: ["Magnetism","Friction","Gravity","Electricity"], answer: "Gravity" },
      { id: 10, question: "100 ÷ 4?", options: ["20","25","30","40"], answer: "25" },
    ]
  }
];

const AnswersReviewModal: React.FC<{ visible: boolean; quiz: Quiz; selectedAnswers: string[]; onClose: () => void; }> = ({ visible, quiz, selectedAnswers, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded shadow max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Review Answers</h2>
        <ul className="space-y-2">
          {quiz.questions.map((q, idx) => {
            const userAns = selectedAnswers[idx] || "Not answered";
            const correct = q.answer;
            const isCorrect = userAns === correct;
            return (
              <li key={q.id} className="p-2 border rounded">
                <p className="font-semibold">{idx+1}. {q.question}</p>
                <p>Your answer: <span className={isCorrect ? "text-green-600" : "text-red-600"}>{userAns}</span></p>
                {!isCorrect && <p>Correct: <span className="text-green-600">{correct}</span></p>}
              </li>
            );
          })}
        </ul>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const QuizPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const quizId = Number(searchParams.get("id"));
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => { setQuiz(quizzes.find(q => q.id === quizId) || null); }, [quizId]);

  const handleAnswer = useCallback((answer: string) => {
    if (!quiz || selectedAnswer) return;
    setSelectedAnswer(answer);
    setSelectedAnswers(prev => { const arr=[...prev]; arr[currentIndex]=answer; return arr; });
    const correct = quiz.questions[currentIndex].answer;
    const newScore = answer === correct ? score + 1 : score;
    if (answer !== correct) setWrongAnswers(prev => [...prev, `Q${currentIndex+1}: ${quiz.questions[currentIndex].question}`]);
    if (answer === correct) setScore(newScore);

    setTimeout(() => {
      if (currentIndex + 1 < quiz.questions.length) { setCurrentIndex(prev => prev + 1); setSelectedAnswer(null); }
      else { setShowResult(true); saveQuizResult(newScore, quiz.questions.length); }
    }, 500);
  }, [quiz, currentIndex, score, selectedAnswer]);

  const handleTimeUp = () => { if (!showResult) handleAnswer(""); };
  if (!quiz) return <p className="p-4">Quiz not found</p>;

 
  if (!quizStarted) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <div className="bg-blue-100 p-4 mb-6 rounded shadow max-w-md text-left">
        <h2 className="font-semibold mb-2">Instructions:</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Each question has a time limit of 15 seconds.</li>
          <li>Select the answer by clicking the button.</li>
          <li>You can see your score after completing all questions.</li>
          <li>Review your answers after finishing to see correct and wrong answers.</li>
        </ul>
      </div>
      <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600" onClick={() => setQuizStarted(true)}>Get Ready</button>
    </div>
  );


  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <Timer
        duration={15}
        onTimeUp={handleTimeUp}
        keyProp={currentIndex}
        running={!showResult}
        currentQuestion={currentIndex}
        totalQuestions={quiz.questions.length}
      />
      <QuestionComponent
        question={quiz.questions[currentIndex]}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        index={currentIndex}
        total={quiz.questions.length}
      />
      <ResultModal
        visible={showResult}
        score={score}
        total={quiz.questions.length}
        wrongAnswers={wrongAnswers}
        onRetry={() => window.location.reload()}
        onClose={() => setShowResult(false)}
        onViewAnswers={() => setShowReview(true)}
      />
      <AnswersReviewModal
        visible={showReview}
        quiz={quiz}
        selectedAnswers={selectedAnswers}
        onClose={() => setShowReview(false)}
      />
    </div>
  );
};

export default QuizPage;