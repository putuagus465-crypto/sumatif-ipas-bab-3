import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  User,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';
import { ExamResultData, Question } from '../types';

interface StudentDetailAnalysisModalProps {
  result: ExamResultData;
  questions: Question[];
  onClose: () => void;
  onPrintReport?: () => void;
}

export const StudentDetailAnalysisModal: React.FC<StudentDetailAnalysisModalProps> = ({
  result,
  questions,
  onClose,
  onPrintReport,
}) => {
  // Map evaluations to questions
  const itemAnalysis = questions.map((q) => {
    const ev = result.evaluations.find(
      (e) => e.originalNumber === q.originalNumber || e.questionId === q.id
    );
    const isCorrect = ev?.isCorrect ?? false;
    const isPartial = ev?.isPartial ?? false;
    return {
      question: q,
      evaluation: ev,
      status: isCorrect ? 'correct' : isPartial ? 'partial' : 'incorrect',
    };
  });

  const correctItems = itemAnalysis.filter((i) => i.status === 'correct');
  const partialItems = itemAnalysis.filter((i) => i.status === 'partial');
  const incorrectItems = itemAnalysis.filter((i) => i.status === 'incorrect');

  // Group by Category to analyze weaknesses
  const categoryStats: Record<
    string,
    { total: number; correct: number; partial: number; weakIndicators: string[] }
  > = {};

  itemAnalysis.forEach(({ question, status }) => {
    const cat = question.category || 'Materi Umum';
    if (!categoryStats[cat]) {
      categoryStats[cat] = { total: 0, correct: 0, partial: 0, weakIndicators: [] };
    }
    categoryStats[cat].total += 1;
    if (status === 'correct') {
      categoryStats[cat].correct += 1;
    } else if (status === 'partial') {
      categoryStats[cat].partial += 1;
      categoryStats[cat].weakIndicators.push(`Soal ${question.originalNumber}: ${question.indikator}`);
    } else {
      categoryStats[cat].weakIndicators.push(`Soal ${question.originalNumber}: ${question.indikator}`);
    }
  });

  // Identify weak categories (< 70% mastery)
  const weakCategories = Object.entries(categoryStats)
    .map(([cat, stats]) => {
      const score = ((stats.correct + stats.partial * 0.5) / stats.total) * 100;
      return {
        category: cat,
        percentage: Math.round(score),
        stats,
      };
    })
    .filter((c) => c.percentage < 70)
    .sort((a, b) => a.percentage - b.percentage);

  // Recommendations based on score and weak areas
  const getRemedialRecommendations = () => {
    const recs: string[] = [];

    if (result.score >= 90) {
      recs.push(
        'Siswa telah menguasai seluruh materi Siklus Hidup dan Tumbuh Kembang Manusia dengan sangat istimewa (Kategori Mahir). Berikan materi pengayaan mandiri tentang perbandingan daur hidup manusia dengan hewan mamalia lain.'
      );
      recs.push('Dapat diberdayakan sebagai tutor sebaya (peer tutor) untuk membantu teman sekelas yang belum tuntas.');
    } else if (result.score >= result.kktp) {
      recs.push(
        'Siswa telah mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP). Perlu pemantapan pada soal-soal penalaran (HOTS) tingkat L3 dan verifikasi pernyataan kategori yang masih ragu-ragu.'
      );
    } else {
      recs.push(
        `STATUS REMEDIAL: Siswa memperoleh nilai ${result.score} (di bawah KKTP ${result.kktp}). Wajib mengikuti bimbingan belajar remedial tatap muka.`
      );
      if (weakCategories.length > 0) {
        recs.push(
          `Fokus materi remedial utama: ${weakCategories.map((w) => `"${w.category}" (Capaian: ${w.percentage}%)`).join(', ')}.`
        );
      }
      recs.push(
        'Metode tindak lanjut: Gunakan media visual bagan siklus hidup berwarna dan demonstrasi alat ukur pertumbuhan (timbangan dan stadiometer) di kelas untuk memperkuat pemahaman konkret anak kelas 3.'
      );
      recs.push('Berikan lembar kerja latihan terstruktur sebelum mengikuti tes remedial ulang.');
    }

    return recs;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <User className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  No. Absen #{result.student.absenceNumber}
                </span>
                <span className="text-xs text-blue-200">{result.student.className}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {result.student.fullName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onPrintReport && (
              <button
                type="button"
                onClick={onPrintReport}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-300" />
                <span>Cetak Rapor Siswa</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Nilai Akhir</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <strong className="text-2xl font-black text-slate-900">{result.score}</strong>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Status KKTP ({result.kktp})</span>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    result.passed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  {result.passed ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {result.passed ? 'TUNTAS' : 'REMEDIAL'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Capaian Jawaban</span>
              <div className="text-xs font-bold text-slate-800 mt-1 space-x-1.5">
                <span className="text-emerald-700">{correctItems.length} Benar</span>
                <span className="text-amber-600">• {partialItems.length} Sebagian</span>
                <span className="text-rose-600">• {incorrectItems.length} Salah</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Durasi Pengerjaan</span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mt-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{result.durationFormatted || '15m 00s'}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Item Response Grid (30 Soal) */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
              <span>Matriks Respons Butir Soal (Nomor 1 s.d. 30)</span>
              <div className="flex items-center gap-3 text-[11px] font-normal lowercase">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Benar (Skor 1)
                </span>
                <span className="flex items-center gap-1 text-amber-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Sebagian
                </span>
                <span className="flex items-center gap-1 text-rose-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Salah (Skor 0)
                </span>
              </div>
            </h4>

            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
              {itemAnalysis.map(({ question, status, evaluation }) => {
                const isCorrect = status === 'correct';
                const isPartial = status === 'partial';

                return (
                  <div
                    key={question.id}
                    className={`p-2 rounded-xl text-center border font-bold text-xs transition-all ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : isPartial
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-rose-100 text-rose-900 border-rose-300'
                    }`}
                    title={`Soal #${question.originalNumber} (${question.type === 'kategori' ? 'PGK Kategori' : 'Pilihan Ganda'})\nTopik: ${question.category}\nStatus: ${isCorrect ? 'Benar Penuh' : isPartial ? 'Benar Sebagian' : 'Salah'}`}
                  >
                    <div>#{question.originalNumber}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">
                      {isCorrect ? '1.0' : isPartial ? '0.7' : '0.0'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Analisis Kelemahan Indikator & Topik Materi */}
          <div className="rounded-2xl p-5 border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Analisis Penguasaan Indikator &amp; Topik Materi</span>
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Identifikasi topik dan butir indikator soal yang belum berhasil dijawab dengan benar oleh siswa bersangkutan.
            </p>

            <div className="space-y-3">
              {Object.entries(categoryStats).map(([category, stat]) => {
                const percentage = Math.round(
                  ((stat.correct + stat.partial * 0.5) / stat.total) * 100
                );
                const isMastered = percentage >= 70;

                return (
                  <div
                    key={category}
                    className={`p-3.5 rounded-xl border ${
                      isMastered
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-rose-50/60 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 mb-1.5">
                      <div className="flex items-center gap-2">
                        {isMastered ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>{category}</span>
                      </div>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-md text-xs ${
                          isMastered ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {percentage}% ({stat.correct}/{stat.total} Benar)
                      </span>
                    </div>

                    {/* Weak indicators list */}
                    {stat.weakIndicators.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-700 space-y-1">
                        <span className="font-semibold text-slate-600 block text-[11px]">
                          Indikator yang perlu perbaikan:
                        </span>
                        {stat.weakIndicators.map((ind, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-slate-600 text-[11px]">
                            <span className="text-rose-500">•</span>
                            <span>{ind}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Rekomendasi Tindak Lanjut / Remedial Spesifik */}
          <div className="rounded-2xl p-5 border border-amber-200 bg-amber-50/50">
            <h4 className="text-sm font-bold text-amber-950 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span>Rekomendasi Tindak Lanjut &amp; Rencana Remedial Guru</span>
            </h4>
            <div className="space-y-2 mt-3">
              {getRemedialRecommendations().map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-900">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
};
