import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Hash, ArrowRight, BookOpen, AlertCircle, FileText, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { Student, ExamSettings } from '../types';

interface StudentIdentityProps {
  settings: ExamSettings;
  onStartExam: (student: Student) => void;
  onDownloadQuestionPDF: () => void;
  onDownloadKisiKisiPDF: () => void;
  onOpenTeacherPanel: () => void;
}

export const StudentIdentity: React.FC<StudentIdentityProps> = ({
  settings,
  onStartExam,
  onDownloadQuestionPDF,
  onDownloadKisiKisiPDF,
  onOpenTeacherPanel,
}) => {
  const [fullName, setFullName] = useState('');
  const [absenceNumber, setAbsenceNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Silakan masukkan Nama Lengkap siswa terlebih dahulu.');
      return;
    }
    if (!absenceNumber.trim()) {
      setErrorMessage('Silakan masukkan Nomor Absen siswa terlebih dahulu.');
      return;
    }

    setErrorMessage('');
    onStartExam({
      fullName: fullName.trim(),
      absenceNumber: absenceNumber.trim(),
      className: settings.className,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-500/40 text-blue-200 text-xs font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tes Sumatif Berbasis Komputer & HP</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              {settings.schoolName}
            </h1>
            <p className="text-blue-200 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              Penilaian Sumatif Mata Pelajaran <span className="text-white font-bold">{settings.subject}</span> • {settings.className}
            </p>
            <p className="text-blue-300/80 text-xs sm:text-sm mt-1">
              Materi: {settings.topic}
            </p>

            {/* Quick Stat Pill */}
            <div className="mt-6 pt-6 border-t border-blue-700/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-blue-900/50 p-2.5 rounded-xl border border-blue-700/40">
                <span className="text-blue-300 block">Total Soal</span>
                <strong className="text-white text-base">30 Butir</strong>
              </div>
              <div className="bg-blue-900/50 p-2.5 rounded-xl border border-blue-700/40">
                <span className="text-blue-300 block">Kriteria KKTP</span>
                <strong className="text-white text-base">{settings.kktp} Poin</strong>
              </div>
              <div className="bg-blue-900/50 p-2.5 rounded-xl border border-blue-700/40">
                <span className="text-blue-300 block">Sifat Ujian</span>
                <strong className="text-white text-base">Acak Soal & Opsi</strong>
              </div>
              <div className="bg-blue-900/50 p-2.5 rounded-xl border border-blue-700/40">
                <span className="text-blue-300 block">Rekapitulasi</span>
                <strong className="text-white text-base">Analisis Butir Guru</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Identity Form & Exam Guide Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs">1</span>
                Tahap 1 — Identitas Siswa
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Data Peserta Ujian
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Silakan isi nama lengkap dan nomor absen dengan teliti sebelum memulai pengerjaan soal.
              </p>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="student-full-name" className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Nama Lengkap Siswa <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="student-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Contoh: I Putu Gede Artha Wijaya"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base font-medium transition-all"
                    required
                  />
                </div>
              </div>

              {/* Nomor Absen & Kelas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="student-absence-no" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Nomor Absen <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Hash className="w-5 h-5" />
                    </div>
                    <input
                      id="student-absence-no"
                      type="number"
                      min="1"
                      max="60"
                      value={absenceNumber}
                      onChange={(e) => {
                        setAbsenceNumber(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Contoh: 14"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base font-medium transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Tingkat Kelas
                  </label>
                  <div className="py-3 px-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm sm:text-base">
                    {settings.className} (Sekolah Dasar)
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  id="btn-start-exam"
                  className="w-full py-3.5 px-6 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Mulai Tes Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Guidelines & PDF Download Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Exam Composition */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Rincian Soal Tes (30 Butir)
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-medium">1. Pilihan Ganda (PG)</span>
                  <span className="font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">20 Soal</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-medium">2. PG Kompleks Kategori (3 Pernyataan Benar/Salah)</span>
                  <span className="font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">10 Soal</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Semua soal wajib dijawab sebelum dapat mengirim jawaban.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Kriteria Ketercapaian Tujuan Pembelajaran (KKTP): <strong>{settings.kktp}</strong>.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Hasil langsung tampil dan otomatis tercatat ke Spreadsheet guru.</span>
                </div>
              </div>
            </div>

            {/* Teacher and PDF download card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center sm:text-left space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Naskah &amp; Dokumen Ujian</h4>
                    <p className="text-xs text-slate-500">Cetak atau simpan naskah soal dan matriks kisi-kisi kedinasan</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  id="btn-download-pdf-questions"
                  onClick={onDownloadQuestionPDF}
                  className="w-full px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Unduh Soal (PDF)</span>
                </button>
                <button
                  type="button"
                  id="btn-download-pdf-kisi-kisi-home"
                  onClick={onDownloadKisiKisiPDF}
                  className="w-full px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>Unduh Kisi-Kisi Soal (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
