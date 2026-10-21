import { Question } from '../types';

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffles both the order of questions AND the options within each question,
 * while accurately remapping correct answer indices.
 * Display sequence number is cleanly 1..N.
 */
export function generateShuffledExam(questions: Question[]): Question[] {
  // 1. Shuffle question order
  const shuffledQuestions = shuffleArray(questions);

  // 2. Shuffle options for each question where applicable
  return shuffledQuestions.map((q) => {
    // If PG (pilihan ganda)
    if (q.type === 'pilihan_ganda' && q.options && q.correctAnswer !== undefined) {
      const originalOptions = q.options;
      const correctText = originalOptions[q.correctAnswer];
      
      const newOptions = shuffleArray(originalOptions);
      const newCorrectAnswerIndex = newOptions.indexOf(correctText);

      return {
        ...q,
        options: newOptions,
        correctAnswer: newCorrectAnswerIndex >= 0 ? newCorrectAnswerIndex : 0,
      };
    }

    // If PGK (pilihan ganda kompleks)
    if (q.type === 'pg_kompleks' && q.options && q.correctAnswers) {
      const originalOptions = q.options;
      const correctTexts = q.correctAnswers.map((idx) => originalOptions[idx]);

      const newOptions = shuffleArray(originalOptions);
      const newCorrectAnswers = correctTexts
        .map((text) => newOptions.indexOf(text))
        .filter((idx) => idx !== -1)
        .sort((a, b) => a - b);

      return {
        ...q,
        options: newOptions,
        correctAnswers: newCorrectAnswers,
      };
    }

    // Kategori & Isian remain as-is or statement order can remain standard for clarity
    return { ...q };
  });
}
