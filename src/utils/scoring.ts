import { Question, Student, StudentAnswerValue, QuestionEvaluation, ExamResultData } from '../types';

/**
 * Checks if a question has been completed by the student
 */
export function isQuestionAnswered(question: Question, answer: StudentAnswerValue | undefined): boolean {
  if (answer === undefined || answer === null) return false;

  switch (question.type) {
    case 'pilihan_ganda':
      return typeof answer === 'number';

    case 'pg_kompleks':
      return Array.isArray(answer) && answer.length > 0;

    case 'kategori': {
      if (typeof answer !== 'object' || Array.isArray(answer)) return false;
      const dict = answer as Record<string, string>;
      const statementIds = (question.statements || []).map((s) => s.id);
      return statementIds.length > 0 && statementIds.every((id) => !!dict[id]);
    }

    case 'isian_singkat':
      return typeof answer === 'string' && answer.trim().length > 0;

    default:
      return false;
  }
}

/**
 * Detailed evaluation of student answer for a question
 */
export function evaluateQuestionDetail(
  question: Question,
  answer: StudentAnswerValue | undefined
): {
  isCorrect: boolean;
  isPartial: boolean;
  score: number;
  maxScore: number;
  details?: {
    correctStatementsCount?: number;
    totalStatementsCount?: number;
  };
} {
  const maxScore = question.scoreWeight || 1;

  if (answer === undefined || answer === null) {
    return { isCorrect: false, isPartial: false, score: 0, maxScore };
  }

  if (question.type === 'pilihan_ganda') {
    const isCorrect = typeof answer === 'number' && answer === question.correctAnswer;
    return {
      isCorrect,
      isPartial: false,
      score: isCorrect ? maxScore : 0,
      maxScore,
    };
  }

  if (question.type === 'kategori') {
    if (typeof answer !== 'object' || Array.isArray(answer) || !question.statements) {
      return { isCorrect: false, isPartial: false, score: 0, maxScore };
    }
    const dict = answer as Record<string, string>;
    const statements = question.statements;
    let correctStCount = 0;

    statements.forEach((s) => {
      const userChoice = dict[s.id];
      if (userChoice && userChoice.trim().toLowerCase() === s.correctAnswer.trim().toLowerCase()) {
        correctStCount++;
      }
    });

    const totalSt = statements.length;
    const isCorrect = correctStCount === totalSt;
    const isPartial = correctStCount > 0 && correctStCount < totalSt;
    // Fractional score proportional to statements answered correctly
    const score = Math.round((correctStCount / totalSt) * maxScore * 100) / 100;

    return {
      isCorrect,
      isPartial,
      score,
      maxScore,
      details: {
        correctStatementsCount: correctStCount,
        totalStatementsCount: totalSt,
      },
    };
  }

  // Fallback for any legacy types
  return { isCorrect: false, isPartial: false, score: 0, maxScore };
}

/**
 * Formats duration in seconds to "Xm Ys" or "X menit"
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '15m 00s';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s} dtk`;
  return `${m}m ${s < 10 ? '0' : ''}${s}s`;
}

/**
 * Calculates complete exam score, duration, and question evaluations
 */
export function calculateExamResult(
  student: Student,
  questions: Question[],
  userAnswers: Record<string, StudentAnswerValue>,
  kktp: number = 70,
  durationSeconds: number = 900 // default ~15 mins if not tracked
): ExamResultData {
  let fullCorrectCount = 0;
  let partialCount = 0;
  let totalEarnedScore = 0;
  const evaluations: QuestionEvaluation[] = [];

  const breakdown = {
    pg: { correct: 0, total: 0 },
    kategori: { correct: 0, partial: 0, total: 0 },
  };

  questions.forEach((q) => {
    const ans = userAnswers[q.id];
    const evaluation = evaluateQuestionDetail(q, ans);

    if (evaluation.isCorrect) {
      fullCorrectCount++;
    } else if (evaluation.isPartial) {
      partialCount++;
    }

    totalEarnedScore += evaluation.score;

    if (q.type === 'pilihan_ganda') {
      breakdown.pg.total++;
      if (evaluation.isCorrect) breakdown.pg.correct++;
    } else if (q.type === 'kategori') {
      breakdown.kategori.total++;
      if (evaluation.isCorrect) {
        breakdown.kategori.correct++;
      } else if (evaluation.isPartial) {
        breakdown.kategori.partial++;
      }
    }

    evaluations.push({
      questionId: q.id,
      originalNumber: q.originalNumber,
      type: q.type,
      isCorrect: evaluation.isCorrect,
      isPartial: evaluation.isPartial,
      score: evaluation.score,
      maxScore: evaluation.maxScore,
      userAnswer: ans,
      details: evaluation.details,
    });
  });

  const totalQuestions = questions.length;
  const incorrectCount = totalQuestions - fullCorrectCount - partialCount;

  // Normalized to 0 - 100 scale
  const rawScore = totalQuestions > 0 ? (totalEarnedScore / totalQuestions) * 100 : 0;
  const score = Math.round(rawScore * 10) / 10;
  const passed = score >= kktp;

  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(now);

  return {
    id: `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    student,
    timestamp: now.toISOString(),
    formattedDate,
    durationSeconds,
    durationFormatted: formatDuration(durationSeconds),
    totalQuestions,
    correctCount: fullCorrectCount,
    partialCount,
    incorrectCount,
    score,
    passed,
    kktp,
    breakdown,
    evaluations,
    sentToSpreadsheet: false,
  };
}
