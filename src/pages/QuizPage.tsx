import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
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
      { id: 4, question: "Red Planet?", options: ["Earth","Mars","Jupiter","Venus"], answer: "Mars" },
      { id: 5, question: "H2O is?", options: ["Salt","Water","Oxygen","Hydrogen"], answer: "Water" },
      { id: 6, question: "9²?", options: ["18","72","81","99"], answer: "81" },
      { id: 7, question: "Gas humans breathe?", options: ["CO2","Nitrogen","Oxygen","Hydrogen"], answer: "Oxygen" },
      { id: 8, question: "100 ÷ 4?", options: ["20","25","30","40"], answer: "25" },
      { id: 9, question: "Bones in adult human body?", options: ["106","206","306","406"], answer: "206" },
      { id: 10, question: "Force pulling objects down?", options: ["Magnetism","Friction","Gravity","Electricity"], answer: "Gravity" }
    ]
  }
];

const QuizPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const quizId = Number(searchParams.get("id"));
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => { setQuiz(quizzes.find(q => q.id === quizId) || null); }, [quizId]);

  const handleAnswer = useCallback((ans: string) => {
    if (!quiz || selected) return;
    setSelected(ans);
    const correct = quiz.questions[index].answer;
    const newScore = ans === correct ? score + 1 : score;
    if (ans !== correct) setWrong(prev => [...prev, `Q${index+1}: ${quiz.questions[index].question}`]);
    if (ans === correct) setScore(newScore);
    setTimeout(() => {
      if (index + 1 < quiz.questions.length) { setIndex(prev => prev + 1); setSelected(null); }
      else { setShowResult(true); saveQuizResult(newScore, quiz.questions.length); }
    }, 600);
  }, [quiz, index, score, selected]);

  if (!quiz) return <p className="p-6">Quiz not found</p>;

  if (!started)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-purple-100 text-center p-6">
        <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="text-3xl font-bold mb-4">
          {quiz.title}
        </motion.h1>
        <p className="mb-6 text-gray-600 max-w-md">
          You have 15 seconds per question. Choose wisely and aim for a high score!
        </p>
        <button
          onClick={() => setStarted(true)}
          className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
        >
          Start Quiz 🚀
        </button>
      </div>
    );

  const progress = ((index + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-linear-to-br from-blue-50 to-purple-50">
      {showResult && score > quiz.questions.length / 2 && <Confetti />}

      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        
        {/* Progress */}
        <div className="mb-4 w-full">
          <div className="h-3 w-full bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              className="h-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <p className="text-sm mt-1 text-gray-600">
            Question {index + 1} of {quiz.questions.length}
          </p>
        </div>

        <Timer
          duration={15}
          onTimeUp={() => handleAnswer("")}
          keyProp={index}
          running={!showResult}
          currentQuestion={index}
          totalQuestions={quiz.questions.length}
        />

        <motion.div key={index} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}>
          <QuestionComponent
            question={quiz.questions[index]}
            onAnswer={handleAnswer}
            selectedAnswer={selected}
            index={index}
            total={quiz.questions.length}
          />
        </motion.div>
      </div>

      <ResultModal
        visible={showResult}
        score={score}
        total={quiz.questions.length}
        wrongAnswers={wrong}
        onRetry={() => window.location.reload()}
        onClose={() => setShowResult(false)}
        onViewAnswers={() => {}}
      />
    </div>
  );
};

export default QuizPage;