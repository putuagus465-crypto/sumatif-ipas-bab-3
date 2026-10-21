import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Grid,
  CheckCircle,
  AlertTriangle,
  FileText,
  HelpCircle,
  Clock,
  User,
  Hash,
  X,
  Sparkles,
} from 'lucide-react';
import { Question, Student, StudentAnswerValue } from '../types';
import { isQuestionAnswered } from '../utils/scoring';

interface ExamScreenProps {
  student: Student;
  questions: Question[];
  userAnswers: Record<string, StudentAnswerValue>;
  onAnswerChange: (questionId: string, answer: StudentAnswerValue) => void;
  onSubmitExam: (durationSeconds: number) => void;
  onDownloadQuestionPDF: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  student,
  questions,
  userAnswers,
  onAnswerChange,
  onSubmitExam,
  onDownloadQuestionPDF,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPalette, setShowPalette] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [startTime] = useState<number>(Date.now());

  const currentQuestion = questions[currentIndex];
  const currentAnswer = userAnswers[currentQuestion.id];

  // Calculate progress
  const answeredCount = questions.filter((q) => isQuestionAnswered(q, userAnswers[q.id])).length;
  const totalQuestions = questions.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Unanswered questions list
  const unansweredIndices = questions
    .map((q, idx) => ({ idx, isAnswered: isQuestionAnswered(q, userAnswers[q.id]) }))
    .filter((item) => !item.isAnswered)
    .map((item) => item.idx);

  const isAllAnswered = answeredCount === totalQuestions;

  // Handlers for option selections
  const handleSelectPilihanGanda = (optionIndex: number) => {
    onAnswerChange(currentQuestion.id, optionIndex);
  };

  const handleTogglePgKompleks = (optionIndex: number) => {
    const prev = Array.isArray(currentAnswer) ? (currentAnswer as number[]) : [];
    let updated: number[];
    if (prev.includes(optionIndex)) {
      updated = prev.filter((i) => i !== optionIndex);
    } else {
      updated = [...prev, optionIndex].sort((a, b) => a - b);
    }
    onAnswerChange(currentQuestion.id, updated);
  };

  const handleKategoriStatementChoice = (statementId: string, choice: string) => {
    const prev = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer)
      ? currentAnswer
      : {}) as Record<string, string>;
    const updated = { ...prev, [statementId]: choice };
    onAnswerChange(currentQuestion.id, updated);
  };

  const handleIsianSingkat = (value: string) => {
    onAnswerChange(currentQuestion.id, value);
  };

  const handleAttemptSubmit = () => {
    if (!isAllAnswered) {
      setShowIncompleteModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    const durationSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    onSubmitExam(durationSec);
  };

  // Helper for question type badge styling
  const getTypeBadge = (type: Question['type']) => {
    switch (type) {
      case 'pilihan_ganda':
        return {
          label: 'Pilihan Ganda',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'pg_kompleks':
        return {
          label: 'Pilihan Ganda Kompleks (>1 Jawaban)',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
        };
      case 'kategori':
        return {
          label: 'Pernyataan Kategori',
          color: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      case 'isian_singkat':
        return {
          label: 'Isian Singkat',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
    }
  };

  const typeBadge = getTypeBadge(currentQuestion.type);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      {/* Top Bar: Student info & Quick Progress */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          {/* Student Identicon */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              {student.absenceNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {student.fullName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  Absen #{student.absenceNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                SD Negeri 3 Loloan Timur • {student.className}
              </p>
            </div>
          </div>

          {/* Quick Actions & Palette Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-toggle-palette"
              onClick={() => setShowPalette(!showPalette)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <Grid className="w-4 h-4 text-blue-600" />
              <span>Daftar Soal ({answeredCount}/{totalQuestions})</span>
            </button>

            <button
              type="button"
              id="btn-download-pdf-exam"
              onClick={onDownloadQuestionPDF}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="Unduh Naskah Soal PDF"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Cetak Soal</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
            <span>Progres Pengerjaan</span>
            <span className="text-blue-700 font-bold">
              {answeredCount} dari {totalQuestions} Soal Terjawab ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card and Palette Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Question Panel (Takes 12 or 8 cols depending on layout) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm relative">
            {/* Header of Question */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-900 text-white font-extrabold text-sm sm:text-base rounded-xl">
                  Soal {currentIndex + 1}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  dari {totalQuestions}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${typeBadge.color}`}>
                  {typeBadge.label}
                </span>
                <span className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">
                  {currentQuestion.category}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Question Educational Illustration */}
            {currentQuestion.imageUrl && (
              <div className="my-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center shadow-xs">
                <img
                  src={currentQuestion.imageUrl}
                  alt={currentQuestion.imageCaption || `Ilustrasi Soal #${currentQuestion.originalNumber}`}
                  className="max-h-56 max-w-full object-contain rounded-lg"
                />
                {currentQuestion.imageCaption && (
                  <span className="text-xs text-slate-500 italic mt-2 text-center font-medium">
                    {currentQuestion.imageCaption}
                  </span>
                )}
              </div>
            )}

            {/* ======================================================= */}
            {/* INTERACTIVE QUESTION INPUTS BASED ON TYPE              */}
            {/* ======================================================= */}

            {/* 1. PILIHAN GANDA (Single Choice) */}
            {currentQuestion.type === 'pilihan_ganda' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, optIdx) => {
                  const isSelected = currentAnswer === optIdx;
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      id={`option-${currentQuestion.id}-${optIdx}`}
                      onClick={() => handleSelectPilihanGanda(optIdx)}
                      className={`w-full text-left p-4 rounded-xl sm:rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-slate-800 flex-1">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. PILIHAN GANDA KOMPLEKS (Multiple Choice Checkbox) */}
            {currentQuestion.type === 'pg_kompleks' && currentQuestion.options && (
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Petunjuk: Pilihan Ganda Kompleks dapat memiliki LEBIH DARI SATU jawaban benar. Centang semua yang benar!</span>
                </div>

                {currentQuestion.options.map((option, optIdx) => {
                  const selectedArray = Array.isArray(currentAnswer) ? (currentAnswer as number[]) : [];
                  const isSelected = selectedArray.includes(optIdx);

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      id={`pgk-option-${currentQuestion.id}-${optIdx}`}
                      onClick={() => handleTogglePgKompleks(optIdx)}
                      className={`w-full text-left p-4 rounded-xl sm:rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/80 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center border-2 shrink-0 transition-all ${
                          isSelected
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <span className="text-sm sm:text-base font-medium text-slate-800 flex-1">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. KATEGORI (Benar/Salah, Setuju/Tidak Setuju, Sesuai/Tidak Sesuai) */}
            {currentQuestion.type === 'kategori' && currentQuestion.statements && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-semibold mb-3">
                  Petunjuk: Tentukan respon untuk SETIAP baris pernyataan di bawah ini dengan memilih salah satu opsi.
                </div>

                <div className="space-y-3">
                  {currentQuestion.statements.map((statement, sIdx) => {
                    const ansDict = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer)
                      ? currentAnswer
                      : {}) as Record<string, string>;
                    const currentChoice = ansDict[statement.id];

                    // Options depending on categoryType
                    let optionLabels = ['Benar', 'Salah'];
                    if (currentQuestion.categoryType === 'setuju_tidak') {
                      optionLabels = ['Setuju', 'Tidak Setuju'];
                    } else if (currentQuestion.categoryType === 'sesuai_tidak') {
                      optionLabels = ['Sesuai', 'Tidak Sesuai'];
                    }

                    return (
                      <div
                        key={statement.id}
                        className="p-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all"
                      >
                        <div className="flex items-start gap-2 mb-3">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <p className="text-sm sm:text-base text-slate-800 font-medium">
                            {statement.text}
                          </p>
                        </div>

                        {/* Statement Choices */}
                        <div className="grid grid-cols-2 gap-2.5 sm:w-80 ml-7">
                          {optionLabels.map((lbl) => {
                            const isChosen = currentChoice === lbl;
                            return (
                              <button
                                key={lbl}
                                type="button"
                                id={`kat-${statement.id}-${lbl}`}
                                onClick={() => handleKategoriStatementChoice(statement.id, lbl)}
                                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                                  isChosen
                                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                                }`}
                              >
                                {lbl}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. ISIAN SINGKAT */}
            {currentQuestion.type === 'isian_singkat' && (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold mb-3">
                  Petunjuk: Tuliskan jawaban akhir Anda pada kolom isian di bawah ini secara jelas dan ringkas.
                </div>

                <div>
                  <label htmlFor={`input-${currentQuestion.id}`} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Jawaban Anda:
                  </label>
                  <input
                    id={`input-${currentQuestion.id}`}
                    type="text"
                    value={typeof currentAnswer === 'string' ? currentAnswer : ''}
                    onChange={(e) => handleIsianSingkat(e.target.value)}
                    placeholder="Ketik jawaban di sini..."
                    className="w-full sm:max-w-md p-4 bg-slate-50 border-2 border-slate-300 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    Gunakan tanda koma (,) atau titik (.) untuk bilangan desimal jika diperlukan.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                id="btn-prev-question"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    id="btn-next-question"
                    onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    id="btn-submit-exam-last"
                    onClick={handleAttemptSubmit}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Selesai / Kirim Jawaban</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar (lg:col-span-4) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Grid className="w-4 h-4 text-blue-600" />
                Daftar Nomor Soal
              </h4>
              <span className="text-xs font-bold text-slate-500">
                {answeredCount}/{totalQuestions} Terisi
              </span>
            </div>

            {/* Palette grid 1 - 35 */}
            <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-5 gap-2 max-h-72 sm:max-h-96 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isAnswered = isQuestionAnswered(q, userAnswers[q.id]);
                const isActive = idx === currentIndex;

                let btnStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';
                if (isAnswered) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                }
                if (isActive) {
                  btnStyle = 'ring-2 ring-blue-600 ring-offset-2 ' + (isAnswered ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white');
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    id={`palette-btn-${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>Sudah Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300"></span>
                <span>Belum Dijawab</span>
              </div>
            </div>

            {/* Prominent Finish Button inside Sidebar for quick completion */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                type="button"
                id="btn-sidebar-submit"
                onClick={handleAttemptSubmit}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Selesai & Kirim Jawaban</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL 1: PERINGATAN SOAL BELUM LENGKAP                   */}
      {/* ======================================================= */}
      <AnimatePresence>
        {showIncompleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Soal Belum Lengkap Terjawab!
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Sesuai ketentuan ujian, Anda <strong>tidak dapat mengirim tes</strong> sebelum seluruh 35 soal dijawab.
                Masih ada <span className="font-bold text-amber-700">{unansweredIndices.length} soal</span> yang belum Anda isi:
              </p>

              {/* List of unanswered question pills */}
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200 mb-5">
                {unansweredIndices.map((uIdx) => (
                  <button
                    key={uIdx}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(uIdx);
                      setShowIncompleteModal(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Nomor {uIdx + 1}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  id="btn-close-incomplete-modal"
                  onClick={() => setShowIncompleteModal(false)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors"
                >
                  Kembali Melengkapi Soal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* MODAL 2: KONFIRMASI KIRIM JAWABAN                       */}
      {/* ======================================================= */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Send className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Konfirmasi Kirim Jawaban
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Apakah Anda yakin ingin mengirim jawaban? Seluruh <strong>35 soal</strong> telah Anda jawab.
                Setelah dikirim, jawaban akan dinilai secara otomatis dan tidak dapat diubah lagi.
              </p>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 mb-6">
                <strong>Peserta:</strong> {student.fullName} (No. Absen {student.absenceNumber})
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  id="btn-cancel-submit"
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Periksa Lagi
                </button>

                <button
                  type="button"
                  id="btn-confirm-final-submit"
                  onClick={handleConfirmSubmit}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Ya, Kirim Sekarang</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
