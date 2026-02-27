export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export type Quiz = {
  id: number;
  title: string;
  questions: Question[];
}