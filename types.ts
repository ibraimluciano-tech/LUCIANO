export enum Tab {
  CHECKLIST = 'CHECKLIST',
  QUIZ = 'QUIZ',
  TRUE_FALSE = 'TRUE_FALSE',
  CASE_STUDY = 'CASE_STUDY',
  ASSOCIATION = 'ASSOCIATION',
  ADMIN = 'ADMIN'
}

export interface ChecklistItem {
  id: string;
  aula: number;
  topic: string;
}

export interface QuizQuestion {
  id: string;
  aula: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface TrueFalseQuestion {
  id: string;
  aula: number;
  statement: string;
  isTrue: boolean;
  justification: string;
}

export interface CaseStudy {
  id: string;
  aula: number;
  scenario: string;
  idealAnswer: string;
}

export interface AssociationPair {
  id: string;
  term: string;
  definition: string;
}

export interface StudentResult {
  name: string;
  score: number;
  time: string;
  completedTasks: number;
  date: string;
}