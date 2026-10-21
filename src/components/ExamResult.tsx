import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle,
  XCircle,
  FileText,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  Lock,
  Sparkles,
  School,
  Database,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { ExamResultData, ExamSettings, Question } from '../types';

interface ExamResultProps {
  result: ExamResultData;
  settings: ExamSettings;
  questions: Question[];
  onResetExam: () => void;
  onPrintResultReport: () => void;
}

export const ExamResult: React.FC<ExamResultProps> = ({
  result,
  settings,
  questions,
  onResetExam,
  onPrintResultReport,
}) => {
  const [showReviewAccordion, setShowReviewAccordion] = useState(false);

  // Trigger celebratory confetti if student passes KKTP
  useEffect(() => {
    if (result.passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'],
        });
      } catch (e) {
        // Safe fallback if confetti canvas fails in environment
      }
    }
  }, [result.passed]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top Banner & Grade Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className={`rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden ${
          result.passed
            ? 'bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-950'
            : 'bg-gradient-to-br from-amber-700 via-rose-800 to-slate-950'
        }`}
      >
        <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>Tahap 3 — Hasil Akhir Tes Sumatif</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {result.student.fullName}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs sm:text-sm text-white/90">
              <span className="bg-white/15 px-3 py-1 rounded-lg font-medium">
                No. Absen: <strong>{result.student.absenceNumber}</strong>
              </span>
              <span className="bg-white/15 px-3 py-1 rounded-lg font-medium">
                {result.student.className} • SD Negeri 3 Loloan Timur
              </span>
              <span className="bg-white/15 px-3 py-1 rounded-lg font-medium">
                {result.formattedDate}
              </span>
            </div>
          </div>

          {/* Score Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center min-w-[200px] shadow-lg">
            <span className="text-xs uppercase font-bold tracking-widest text-white/80 block mb-1">
              Nilai Akhir
            </span>
            <div className="text-5xl sm:text-6xl font-black text-white leading-none my-2">
              {result.score}
            </div>
            <div
              className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide mt-2 shadow-xs ${
                result.passed
                  ? 'bg-emerald-400 text-emerald-950'
                  : 'bg-rose-300 text-rose-950'
              }`}
            >
              {result.passed ? 'TUNTAS (TERCAPAI)' : 'REMEDIAL'}
            </div>
            <p className="text-[11px] text-white/70 mt-2 font-medium">
              KKTP: {result.kktp}
            </p>
          </div>
        </div>

        {/* Sync Status bar */}
        <div className="mt-8 pt-5 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span className="text-white/90 font-medium">
              Data hasil tes siswa otomatis terekam pada pangkalan data guru.
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full font-semibold">
            <Database className="w-3.5 h-3.5" />
            <span>Tersinkronisasi ke Panel Guru</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Jawaban Benar</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">
              {result.correctCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {result.totalQuestions} Soal</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {Math.round((result.correctCount / result.totalQuestions) * 100)}% ketepatan penuh
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Benar Sebagian</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">
              {result.partialCount || 0}
            </span>
            <span className="text-xs text-slate-400 font-medium">Soal Kategori</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Mendapat nilai parsial
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Pilihan Ganda (PG)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600">
              {result.breakdown.pg.correct}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {result.breakdown.pg.total}</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">Soal Objektif Tunggal</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">PGK Kategori</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-purple-600">
              {result.breakdown.kategori.correct}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {result.breakdown.kategori.total}</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">3 Pernyataan Benar/Salah</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <button
          type="button"
          id="btn-print-result-pdf"
          onClick={onPrintResultReport}
          className="w-full sm:w-auto px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Unduh Hasil Ujian (PDF)</span>
        </button>

        <button
          type="button"
          id="btn-retake-exam"
          onClick={onResetExam}
          className="w-full sm:w-auto px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>Mulai Ujian Siswa Baru</span>
        </button>
      </div>

      {/* ======================================================= */}
      {/* CONDITIONAL REVIEW ACCORDION                           */}
      {/* "Jangan tampilkan kunci jawaban kepada siswa kecuali   */}
      {/* saya mengaktifkan fitur tersebut."                     */}
      {/* ======================================================= */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        {!settings.allowShowSolutions ? (
          <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Kunci Jawaban & Pembahasan Dirahasiakan
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Sesuai instruksi guru pengampu SD Negeri 3 Loloan Timur, kunci jawaban serta pembahasan soal tidak ditampilkan kepada siswa pada sesi ini. Fitur ini dapat diaktifkan oleh guru melalui Panel Guru.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Pembahasan & Kunci Jawaban (Fitur Diaktifkan Guru)
                </h3>
                <p className="text-xs text-slate-500">
                  Berikut adalah evaluasi lengkap setiap butir soal beserta pembahasan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewAccordion(!showReviewAccordion)}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-blue-100 transition-colors"
              >
                <span>{showReviewAccordion ? 'Tutup Rincian' : 'Buka Rincian (35 Soal)'}</span>
                {showReviewAccordion ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {showReviewAccordion && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 pt-4 border-t border-slate-100 overflow-hidden"
                >
                  {questions.map((q, idx) => {
                    const evalItem = result.evaluations.find((e) => e.questionId === q.id);
                    const isCorrect = evalItem ? evalItem.isCorrect : false;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border ${
                          isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className="font-bold text-xs px-2 py-0.5 rounded-md bg-slate-800 text-white">
                            Soal {idx + 1}
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                              isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            <span>{isCorrect ? 'Benar (+1)' : 'Salah (0)'}</span>
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-slate-800 mb-2">{q.question}</p>

                        {/* Explanation box */}
                        <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                          <span className="font-bold text-blue-700 block">Pembahasan:</span>
                          <p>{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
