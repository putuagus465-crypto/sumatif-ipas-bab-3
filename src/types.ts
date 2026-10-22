export type QuestionType = 'pilihan_ganda' | 'pg_kompleks' | 'kategori' | 'isian_singkat';

export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Sukar';

export type CognitiveLevel = 'L1' | 'L2' | 'L3'; // L1: Pengetahuan & Pemahaman, L2: Aplikasi, L3: Penalaran / HOTS

export type CategoryChoiceType = 'benar_salah' | 'setuju_tidak' | 'sesuai_tidak';

export interface CategoryStatement {
  id: string;
  text: string;
  correctAnswer: 'Benar' | 'Salah';
}

export interface Question {
  id: string;
  originalNumber: number;
  type: QuestionType; // 'pilihan_ganda' or 'kategori'
  category: string; // Sub-topik materi IPAS
  elemen: string; // Elemen CP (e.g. 'Pemahaman IPAS')
  capaianPembelajaran: string;
  tujuanPembelajaran: string; // TP (Tujuan Pembelajaran Kurikulum Merdeka)
  indikator: string; // Indikator ketercapaian soal
  cognitiveLevel: CognitiveLevel; // L1, L2, L3
  difficulty: DifficultyLevel; // Mudah, Sedang, Sukar
  question: string;
  imageUrl?: string; // Optional image / SVG data URI
  imageCaption?: string;
  explanation: string;
  scoreWeight: number; // default 1

  // For 'pilihan_ganda'
  options?: string[];
  correctAnswer?: number; // 0, 1, 2, 3

  // For 'kategori' (setiap soal memiliki 3 deskripsi Benar/Salah)
  categoryType?: CategoryChoiceType;
  statements?: CategoryStatement[];

  // Optional legacy fields for backward compatibility
  correctAnswers?: number[];
  acceptedAnswers?: string[];
}

export interface Student {
  fullName: string;
  absenceNumber: string;
  className: string;
}

export type StudentAnswerValue =
  | number // for pilihan_ganda (selected option index)
  | number[] // for pg_kompleks
  | Record<string, 'Benar' | 'Salah' | string> // for kategori (statementId -> choice)
  | string; // for isian_singkat

export interface QuestionEvaluation {
  questionId: string;
  originalNumber: number;
  type: QuestionType;
  isCorrect: boolean; // true if full score
  isPartial?: boolean; // true if partial score (e.g. 1 or 2 correct out of 3 in kategori)
  score: number; // 0 to 1 (or proportional score)
  maxScore: number;
  userAnswer: StudentAnswerValue | undefined;
  details?: {
    correctStatementsCount?: number;
    totalStatementsCount?: number;
  };
}

export interface ExamResultData {
  id: string;
  student: Student;
  timestamp: string;
  formattedDate: string;
  durationSeconds?: number;
  durationFormatted?: string;
  totalQuestions: number;
  correctCount: number;
  partialCount?: number;
  incorrectCount: number;
  score: number; // 0 to 100
  passed: boolean;
  kktp: number;
  breakdown: {
    pg: { correct: number; total: number };
    kategori: { correct: number; partial: number; total: number };
    pgk?: { correct: number; total: number };
    isian?: { correct: number; total: number };
  };
  evaluations: QuestionEvaluation[];
  sentToSpreadsheet: boolean;
}

export interface ExamSettings {
  schoolName: string;
  headmasterName: string;
  headmasterNip: string;
  teacherName: string;
  teacherNip: string;
  className: string;
  subject: string;
  topic: string;
  kktp: number;
  allowShowSolutions: boolean;
  sheetWebhookUrl: string;
  teacherPassword: string;
}

// Student analysis item representation for interactive modal
export interface StudentTopicAnalysis {
  topic: string;
  mastered: boolean;
  correctCount: number;
  totalCount: number;
  weakIndicators: string[];
}
