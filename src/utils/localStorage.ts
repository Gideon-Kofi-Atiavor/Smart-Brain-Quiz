export type QuizHistoryData = {
  date: string;
  score: number;
  total: number;
}

const KEY = "quizHistory";

export const saveQuizResult = (score: number, total: number) => {
  const history: QuizHistoryData[] =
    JSON.parse(localStorage.getItem(KEY) || "[]");

  history.push({
    date: new Date().toLocaleString(),
    score,
    total,
  });

  localStorage.setItem(KEY, JSON.stringify(history));
};

export const getQuizHistory = (): QuizHistoryData[] => {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const clearQuizHistory = () => {
  localStorage.removeItem(KEY);
};