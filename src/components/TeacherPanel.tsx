import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Lock,
  Download,
  Trash2,
  Settings,
  Table,
  CheckCircle,
  XCircle,
  Search,
  ExternalLink,
  Code,
  RefreshCw,
  Printer,
  FileText,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Sliders,
  Check,
  Copy,
  Users,
  Award,
  ChevronRight,
  FileSpreadsheet,
  Layers,
  BarChart3,
  Sparkles,
  Eye,
  Info,
} from 'lucide-react';
import { ExamResultData, ExamSettings, Question } from '../types';
import {
  deleteExamResult,
  clearAllExamResults,
  resetToSampleResults,
  saveExamSettings,
  GOOGLE_APPS_SCRIPT_SAMPLE,
  sendToGoogleSheetWebhook,
  downloadMatrixItemAnalysisCSV,
} from '../utils/spreadsheet';
import { StudentDetailAnalysisModal } from './StudentDetailAnalysisModal';

interface TeacherPanelProps {
  isOpen: boolean;
  onClose: () => void;
  results: ExamResultData[];
  onRefreshResults: () => void;
  settings: ExamSettings;
  onUpdateSettings: (newSettings: ExamSettings) => void;
  questions: Question[];
  onPrintStudentReport: (result: ExamResultData) => void;
  onPrintMasterQuestions: (withKeys: boolean) => void;
  onPrintKisiKisi: () => void;
  onPrintItemAnalysis: () => void;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  isOpen,
  onClose,
  results,
  onRefreshResults,
  settings,
  onUpdateSettings,
  questions,
  onPrintStudentReport,
  onPrintMasterQuestions,
  onPrintKisiKisi,
  onPrintItemAnalysis,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'matriks' | 'kisi_kisi' | 'rekap' | 'pengaturan' | 'script'>('matriks');

  // Search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'tuntas' | 'remedial'>('all');

  // Selected student for detailed modal
  const [selectedStudentResult, setSelectedStudentResult] = useState<ExamResultData | null>(null);

  // Local settings draft
  const [localSettings, setLocalSettings] = useState<ExamSettings>({ ...settings });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookTestMessage, setWebhookTestMessage] = useState('');

  // Sync local settings whenever settings change or panel opens
  useEffect(() => {
    if (isOpen) {
      setLocalSettings({ ...settings });
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === settings.teacherPassword) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Password salah. Silakan masukkan password guru yang valid.');
    }
  };

  // Filtered results
  const filteredResults = results.filter((r) => {
    const matchesSearch =
      r.student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.student.absenceNumber.includes(searchQuery);
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'tuntas'
        ? r.passed
        : !r.passed;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalSubmissions = results.length;
  const passedCount = results.filter((r) => r.passed).length;
  const remedialCount = totalSubmissions - passedCount;
  const passRate = totalSubmissions > 0 ? Math.round((passedCount / totalSubmissions) * 100) : 0;
  const avgScore = totalSubmissions > 0
    ? Math.round((results.reduce((acc, curr) => acc + curr.score, 0) / totalSubmissions) * 10) / 10
    : 0;
  const maxScore = totalSubmissions > 0 ? Math.max(...results.map((r) => r.score)) : 0;
  const minScore = totalSubmissions > 0 ? Math.min(...results.map((r) => r.score)) : 0;

  // Distributions for summary cards
  const totalQuestions = questions.length;
  const l1Count = questions.filter((q) => q.cognitiveLevel === 'L1').length;
  const l2Count = questions.filter((q) => q.cognitiveLevel === 'L2').length;
  const l3Count = questions.filter((q) => q.cognitiveLevel === 'L3').length;

  const mudahCount = questions.filter((q) => q.difficulty === 'Mudah').length;
  const sedangCount = questions.filter((q) => q.difficulty === 'Sedang').length;
  const sukarCount = questions.filter((q) => q.difficulty === 'Sukar').length;

  const pgCount = questions.filter((q) => q.type === 'pilihan_ganda').length;
  const kategoriCount = questions.filter((q) => q.type === 'kategori').length;

  const categoryCounts: Record<string, number> = {};
  questions.forEach((q) => {
    categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
  });

  // Item analysis stats for each question
  const itemStatistics = questions.map((q) => {
    let fullCorrect = 0;
    let partial = 0;
    let wrong = 0;

    results.forEach((r) => {
      const ev = r.evaluations?.find(
        (e) => e.originalNumber === q.originalNumber || e.questionId === q.id
      );
      if (ev?.isCorrect) fullCorrect++;
      else if (ev?.isPartial) partial++;
      else wrong++;
    });

    const weightedScore = fullCorrect + partial * 0.5;
    const percentage = totalSubmissions > 0 ? Math.round((weightedScore / totalSubmissions) * 100) : 0;

    // Klasifikasi empiris kesukaran: Mudah (>70%), Sedang (30-70%), Sukar (<30%)
    let empirical = 'Sedang';
    if (percentage > 70) empirical = 'Mudah';
    else if (percentage < 30) empirical = 'Sukar';

    return {
      q,
      fullCorrect,
      partial,
      wrong,
      weightedScore,
      percentage,
      empirical,
    };
  });

  // Save settings
  const handleSaveSettings = () => {
    saveExamSettings(localSettings);
    onUpdateSettings(localSettings);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  // Copy Script
  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_SAMPLE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Test Webhook
  const handleTestWebhook = async () => {
    if (!localSettings.sheetWebhookUrl || !localSettings.sheetWebhookUrl.startsWith('http')) {
      setWebhookTestMessage('Masukkan URL Webhook Google Apps Script yang valid terlebih dahulu.');
      return;
    }

    setTestingWebhook(true);
    setWebhookTestMessage('');
    try {
      const dummyResult: ExamResultData = {
        id: 'test-sample',
        student: { fullName: 'Uji Coba Koneksi Siswa', absenceNumber: '99', className: settings.className },
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString('id-ID'),
        durationSeconds: 900,
        durationFormatted: '15m 00s',
        totalQuestions: 30,
        correctCount: 25,
        partialCount: 3,
        incorrectCount: 2,
        score: 85,
        passed: true,
        kktp: settings.kktp,
        breakdown: {
          pg: { correct: 18, total: 20 },
          kategori: { correct: 7, partial: 2, total: 10 },
        },
        evaluations: [],
        sentToSpreadsheet: true,
      };

      const success = await sendToGoogleSheetWebhook(localSettings.sheetWebhookUrl, dummyResult);
      if (success) {
        setWebhookTestMessage('Uji pengiriman berhasil dikirim ke Google Sheets.');
      } else {
        setWebhookTestMessage('Gagal mengirim data. Periksa pengaturan akses web app.');
      }
    } catch {
      setWebhookTestMessage('Terjadi kesalahan koneksi.');
    } finally {
      setTestingWebhook(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-7xl max-h-[94vh] flex flex-col overflow-hidden text-slate-900"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-400/30">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                  Panel Guru &amp; Analisis Soal
                </span>
                <span className="text-xs text-slate-400">• {settings.className}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {settings.schoolName}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Autentikasi Guru</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
              Masukkan password pengampu ujian untuk mengakses matriks respon siswa, kisi-kisi, dan pengaturan.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Password Guru (Default: GURUADMIN)"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-center text-sm font-semibold tracking-wider text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  autoFocus
                />
              </div>

              {authError && (
                <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                id="btn-login-teacher"
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Buka Panel Guru
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation Tabs & Quick Action Bar */}
            <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <button
                  type="button"
                  id="tab-matriks-soal"
                  onClick={() => setActiveTab('matriks')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'matriks'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Matriks Respon &amp; Analisis Butir</span>
                </button>

                <button
                  type="button"
                  id="tab-kisi-kisi"
                  onClick={() => setActiveTab('kisi_kisi')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'kisi_kisi'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Kisi-Kisi Soal (30 Butir)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('rekap')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'rekap'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Table className="w-4 h-4" />
                  <span>Daftar Nilai ({results.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('pengaturan')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'pengaturan'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Pengaturan &amp; Pejabat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('script')}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'script'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Integrasi Spreadsheet</span>
                </button>
              </div>

              {/* Quick Actions (Print Kisi-Kisi, Print Matrix, Export CSV) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-export-matrix-csv"
                  onClick={() => downloadMatrixItemAnalysisCSV(results, questions, settings)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  title="Ekspor Matriks Analisis Butir ke CSV / Excel"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ekspor CSV</span>
                </button>

                <button
                  type="button"
                  id="btn-print-matrix-pdf"
                  onClick={onPrintItemAnalysis}
                  className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  title="Cetak PDF Laporan Analisis Butir Soal"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cetak PDF Analisis</span>
                </button>

                <button
                  type="button"
                  id="btn-print-kisi-kisi-pdf"
                  onClick={onPrintKisiKisi}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  title="Unduh PDF Kisi-Kisi Soal Format Kedinasan"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PDF Kisi-Kisi</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENTS */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* ========================================================================= */}
              {/* TAB 1: MATRIKS RESPON SISWA & ANALISIS BUTIR SOAL                         */}
              {/* ========================================================================= */}
              {activeTab === 'matriks' && (
                <div className="space-y-6">
                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold block">Total Peserta Ujian</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <strong className="text-2xl font-black text-slate-900">{totalSubmissions}</strong>
                        <span className="text-xs text-slate-500">Siswa Terdaftar</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold block">Tingkat Ketuntasan (KKTP {settings.kktp})</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <strong className="text-2xl font-black text-emerald-700">{passRate}%</strong>
                        <span className="text-xs font-bold text-slate-600">({passedCount} Tuntas)</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold block">Perlu Remedial (&lt; {settings.kktp})</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <strong className="text-2xl font-black text-rose-600">{remedialCount}</strong>
                        <span className="text-xs text-slate-500">Siswa</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold block">Rata-rata Kelas</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <strong className="text-2xl font-black text-blue-700">{avgScore}</strong>
                        <span className="text-xs text-slate-500">Max: {maxScore} / Min: {minScore}</span>
                      </div>
                    </div>
                  </div>

                  {/* Filter and Table Tools */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <div className="relative w-full">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Cari nama siswa atau no. absen..."
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none"
                      >
                        <option value="all">Semua Status ({results.length})</option>
                        <option value="tuntas">Tuntas ({passedCount})</option>
                        <option value="remedial">Remedial ({remedialCount})</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          const res = resetToSampleResults();
                          onRefreshResults();
                        }}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        title="Muat data simulasi siswa kelas III"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reset Data Kelas III</span>
                      </button>
                    </div>
                  </div>

                  {/* MATRIKS RESPON SISWA TABLE */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-blue-700" />
                          <span>Tabel Matriks Interaktif Respon Siswa ({questions.length} Butir Soal)</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Klik pada baris nama siswa untuk melihat <strong>Detail Analisis Siswa</strong>, analisis kelemahan indikator, dan rekomendasi remedial.
                        </p>
                      </div>

                      {/* Legend */}
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                          Benar (1)
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-amber-800">
                          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                          Sebagian
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-rose-800">
                          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                          Salah (0)
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs text-center">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                            <th className="p-2 border-r border-slate-200 w-10">No</th>
                            <th className="p-2 border-r border-slate-200 w-14">Absen</th>
                            <th className="p-2 border-r border-slate-200 text-left min-w-[170px] sticky left-0 bg-slate-100 z-10 shadow-xs">
                              Nama Siswa (Klik Detail)
                            </th>
                            {questions.map((q) => (
                              <th
                                key={q.id}
                                className="p-1 border-r border-slate-200 w-7 hover:bg-blue-100 cursor-help transition-colors"
                                title={`Soal #${q.originalNumber}\nTipe: ${q.type === 'kategori' ? 'PGK Kategori (3 Pernyataan)' : 'Pilihan Ganda'}\nKesukaran: ${q.difficulty}\nKognitif: ${q.cognitiveLevel}\nIndikator: ${q.indikator}`}
                              >
                                <span>{q.originalNumber}</span>
                                <span className="block text-[8px] font-normal text-slate-400">
                                  {q.type === 'kategori' ? 'K' : 'PG'}
                                </span>
                              </th>
                            ))}
                            <th className="p-2 border-r border-slate-200 w-14 bg-slate-50">Skor</th>
                            <th className="p-2 border-r border-slate-200 w-14 bg-blue-50 text-blue-900">Nilai</th>
                            <th className="p-2 border-r border-slate-200 w-20">Status</th>
                            <th className="p-2 w-16">Durasi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredResults.length === 0 ? (
                            <tr>
                              <td colSpan={questions.length + 7} className="p-8 text-slate-400 text-center font-medium">
                                Belum ada data respon siswa yang sesuai filter.
                              </td>
                            </tr>
                          ) : (
                            filteredResults.map((r, idx) => (
                              <tr
                                key={r.id}
                                onClick={() => setSelectedStudentResult(r)}
                                className="border-b border-slate-100 hover:bg-blue-50/70 transition-colors cursor-pointer group"
                              >
                                <td className="p-2 border-r border-slate-100 text-slate-500 font-medium">
                                  {idx + 1}
                                </td>
                                <td className="p-2 border-r border-slate-100 font-mono text-slate-700 font-bold">
                                  #{r.student.absenceNumber}
                                </td>
                                <td className="p-2 border-r border-slate-100 text-left font-semibold text-slate-900 sticky left-0 bg-white group-hover:bg-blue-50 transition-colors z-10 flex items-center justify-between gap-1 shadow-xs">
                                  <span className="truncate">{r.student.fullName}</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                                </td>

                                {/* Item response cells */}
                                {questions.map((q) => {
                                  const ev = r.evaluations?.find(
                                    (e) => e.originalNumber === q.originalNumber || e.questionId === q.id
                                  );
                                  const isCorrect = ev?.isCorrect;
                                  const isPartial = ev?.isPartial;

                                  let badgeClass = 'bg-rose-100 text-rose-700';
                                  let label = '0';
                                  if (isCorrect) {
                                    badgeClass = 'bg-emerald-100 text-emerald-800 font-bold';
                                    label = '1';
                                  } else if (isPartial) {
                                    badgeClass = 'bg-amber-100 text-amber-800 font-bold';
                                    label = '½';
                                  }

                                  return (
                                    <td
                                      key={q.id}
                                      className={`p-1 border-r border-slate-100 ${badgeClass}`}
                                      title={`Soal ${q.originalNumber}: ${isCorrect ? 'Benar (Skor 1)' : isPartial ? 'Benar Sebagian' : 'Salah (Skor 0)'}`}
                                    >
                                      {label}
                                    </td>
                                  );
                                })}

                                <td className="p-2 border-r border-slate-100 font-bold text-slate-700 bg-slate-50/50">
                                  {Math.round((r.score / 100) * questions.length * 10) / 10}
                                </td>
                                <td className="p-2 border-r border-slate-100 font-black text-slate-900 bg-blue-50/50">
                                  {r.score}
                                </td>
                                <td className="p-2 border-r border-slate-100 font-bold">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] inline-block ${
                                      r.passed
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                                    }`}
                                  >
                                    {r.passed ? 'Tuntas' : 'Remedial'}
                                  </span>
                                </td>
                                <td className="p-2 text-slate-500 text-[11px]">
                                  {r.durationFormatted || '15m'}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>

                        {/* FOOTER STATISTIK BUTIR SOAL */}
                        <tfoot>
                          {/* Row 1: Jumlah Siswa Benar */}
                          <tr className="bg-slate-200/90 font-bold text-slate-900 border-t-2 border-slate-400">
                            <td colSpan={3} className="p-2 text-left sticky left-0 bg-slate-200 z-10">
                              Jumlah Siswa Menjawab Benar
                            </td>
                            {itemStatistics.map((item) => (
                              <td key={item.q.id} className="p-1 border-r border-slate-300">
                                {item.weightedScore}
                              </td>
                            ))}
                            <td colSpan={4} className="p-2 text-left text-[11px] text-slate-600 bg-slate-200">
                              (Poin Akumulasi)
                            </td>
                          </tr>

                          {/* Row 2: Persentase Ketercapaian */}
                          <tr className="bg-slate-100 font-bold text-slate-900 border-t border-slate-300">
                            <td colSpan={3} className="p-2 text-left sticky left-0 bg-slate-100 z-10">
                              Persentase Ketercapaian (%)
                            </td>
                            {itemStatistics.map((item) => (
                              <td key={item.q.id} className="p-1 border-r border-slate-200 text-[10px]">
                                {item.percentage}%
                              </td>
                            ))}
                            <td colSpan={4} className="p-2 text-left text-[11px] text-slate-600">
                              Target KKTP: 70%
                            </td>
                          </tr>

                          {/* Row 3: Klasifikasi Empiris Tingkat Kesukaran */}
                          <tr className="bg-blue-50 font-bold text-blue-950 border-t border-slate-300">
                            <td colSpan={3} className="p-2 text-left sticky left-0 bg-blue-50 z-10">
                              Klasifikasi Empiris Kesukaran
                            </td>
                            {itemStatistics.map((item) => {
                              const badge =
                                item.empirical === 'Mudah'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : item.empirical === 'Sedang'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-rose-100 text-rose-800';
                              return (
                                <td key={item.q.id} className="p-1 border-r border-blue-200 text-[10px]">
                                  <span className={`px-1 py-0.5 rounded text-[9px] ${badge}`}>
                                    {item.empirical.charAt(0)}
                                  </span>
                                </td>
                              );
                            })}
                            <td colSpan={4} className="p-2 text-left text-[10px] text-slate-600">
                              M (&gt;70%), S (30-70%), K (&lt;30%)
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 2: KISI-KISI SOAL & RINGKASAN DISTRIBUSI                              */}
              {/* ========================================================================= */}
              {activeTab === 'kisi_kisi' && (
                <div className="space-y-6">
                  {/* SUMMARY CARDS KISI-KISI */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-700" />
                        <span>Ringkasan Distribusi Kisi-Kisi Soal Tes Sumatif</span>
                      </h3>
                      <button
                        type="button"
                        onClick={onPrintKisiKisi}
                        className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Unduh PDF Kisi-Kisi Soal</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Distribusi Elemen / Materi */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                          1. Distribusi Elemen / Topik
                        </span>
                        <div className="space-y-1.5 text-xs">
                          {Object.entries(categoryCounts).map(([cat, cnt]) => (
                            <div key={cat} className="flex justify-between items-center py-0.5 border-b border-slate-100 last:border-none">
                              <span className="truncate pr-2 font-medium text-slate-700">{cat}</span>
                              <strong className="text-blue-700 font-bold shrink-0">{cnt} Soal</strong>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Distribusi Level Kognitif */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                          2. Level Kognitif
                        </span>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">L1 (Pengetahuan/Pemahaman)</span>
                            <span className="font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              {l1Count} Soal ({Math.round((l1Count / totalQuestions) * 100)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">L2 (Aplikasi/Penerapan)</span>
                            <span className="font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                              {l2Count} Soal ({Math.round((l2Count / totalQuestions) * 100)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">L3 (Penalaran/HOTS)</span>
                            <span className="font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                              {l3Count} Soal ({Math.round((l3Count / totalQuestions) * 100)}%)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Distribusi Tingkat Kesukaran */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                          3. Tingkat Kesukaran
                        </span>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">Mudah</span>
                            <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {mudahCount} Soal ({Math.round((mudahCount / totalQuestions) * 100)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">Sedang</span>
                            <span className="font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              {sedangCount} Soal ({Math.round((sedangCount / totalQuestions) * 100)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">Sukar</span>
                            <span className="font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                              {sukarCount} Soal ({Math.round((sukarCount / totalQuestions) * 100)}%)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Distribusi Bentuk Soal */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                          4. Bentuk Soal
                        </span>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">Pilihan Ganda (PG)</span>
                            <span className="font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              {pgCount} Soal
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">PGK Kategori (Benar/Salah)</span>
                            <span className="font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                              {kategoriCount} Soal
                            </span>
                          </div>
                          <div className="pt-1 border-t border-slate-100 flex justify-between font-bold text-slate-900">
                            <span>Total Butir Soal</span>
                            <span>{totalQuestions} Butir</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Master Questions Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">
                        Daftar Butir Soal &amp; Indikator Kompetensi (1 s.d. {questions.length})
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onPrintMasterQuestions(false)}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          Cetak Naskah Siswa
                        </button>
                        <button
                          type="button"
                          onClick={() => onPrintMasterQuestions(true)}
                          className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          Cetak Kunci Guru
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto max-h-[520px]">
                      <table className="w-full border-collapse text-xs text-left">
                        <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 z-10 shadow-xs border-b border-slate-200">
                          <tr>
                            <th className="p-2.5 w-12 text-center border-r border-slate-200">No. Soal</th>
                            <th className="p-2.5 w-48 border-r border-slate-200">Elemen / Capaian Pembelajaran (CP)</th>
                            <th className="p-2.5 w-48 border-r border-slate-200">Tujuan Pembelajaran (TP)</th>
                            <th className="p-2.5 min-w-[220px] border-r border-slate-200">Materi Pokok &amp; Indikator Soal</th>
                            <th className="p-2.5 w-20 text-center border-r border-slate-200">Level Kognitif</th>
                            <th className="p-2.5 w-24 text-center border-r border-slate-200">Bentuk Soal</th>
                            <th className="p-2.5 w-44">Kunci Jawaban &amp; Bobot</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {questions.map((q) => {
                            let keyText = '';
                            if (q.type === 'pilihan_ganda' && q.options && q.correctAnswer !== undefined) {
                              const letter = String.fromCharCode(65 + q.correctAnswer);
                              keyText = `Opsi ${letter}: ${q.options[q.correctAnswer]}`;
                            } else if (q.type === 'kategori' && q.statements) {
                              keyText = q.statements
                                .map((s, sIdx) => `${sIdx + 1}: ${s.correctAnswer === 'Benar' ? 'B' : 'S'}`)
                                .join(' | ');
                            }

                            return (
                              <tr key={q.id} className="hover:bg-blue-50/40 transition-colors">
                                <td className="p-2.5 text-center font-bold text-slate-800 border-r border-slate-100 align-top">
                                  #{q.originalNumber}
                                </td>
                                <td className="p-2.5 border-r border-slate-100 align-top">
                                  <span className="font-bold text-slate-900 block mb-0.5">{q.elemen}</span>
                                  <span className="text-[11px] text-slate-500 leading-relaxed block">{q.capaianPembelajaran}</span>
                                </td>
                                <td className="p-2.5 border-r border-slate-100 align-top text-slate-700 text-[11px] leading-relaxed">
                                  {q.tujuanPembelajaran || 'Menguasai konsep esensial materi secara komprehensif.'}
                                </td>
                                <td className="p-2.5 border-r border-slate-100 align-top space-y-1">
                                  <div className="font-bold text-blue-900">{q.category}</div>
                                  <div className="text-[11px] text-slate-600 leading-snug">
                                    <strong className="text-slate-800">Indikator:</strong> {q.indikator}
                                  </div>
                                  <div className="text-[11px] text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-200/80 mt-1">
                                    <strong className="text-slate-700 block mb-0.5">Pertanyaan:</strong>
                                    <span className="line-clamp-2">{q.question}</span>
                                  </div>
                                </td>
                                <td className="p-2.5 text-center border-r border-slate-100 align-top">
                                  <span className="font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] inline-block">
                                    {q.cognitiveLevel}
                                  </span>
                                  <span className="block text-[10px] text-slate-500 font-medium mt-1">
                                    {q.cognitiveLevel === 'L1' ? 'Pemahaman' : q.cognitiveLevel === 'L2' ? 'Aplikasi' : 'Penalaran'}
                                  </span>
                                  <span className={`mt-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold block ${
                                    q.difficulty === 'Mudah'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : q.difficulty === 'Sedang'
                                      ? 'bg-sky-100 text-sky-800'
                                      : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {q.difficulty}
                                  </span>
                                </td>
                                <td className="p-2.5 text-center border-r border-slate-100 align-top">
                                  <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] inline-block ${
                                    q.type === 'pilihan_ganda'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}>
                                    {q.type === 'pilihan_ganda' ? 'Pilihan Ganda' : 'PGK Kategori'}
                                  </span>
                                  <span className="block text-[10px] text-slate-500 mt-1">
                                    {q.type === 'pilihan_ganda' ? '(Tunggal)' : '(3 Respon B/S)'}
                                  </span>
                                </td>
                                <td className="p-2.5 align-top space-y-1">
                                  <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50/80 p-1.5 rounded-lg border border-emerald-200">
                                    {keyText}
                                  </div>
                                  <div className="text-[10px] text-slate-500 font-semibold">
                                    Bobot Skor: <span className="text-slate-800 font-bold">{q.scoreWeight} Poin</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 3: DAFTAR NILAI & RAPORT SISWA                                        */}
              {/* ========================================================================= */}
              {activeTab === 'rekap' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-900">
                      Rekapitulasi Nilai Peserta Didik
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => downloadMatrixItemAnalysisCSV(results, questions, settings)}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh CSV Nilai</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs text-left">
                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3 w-12 text-center">No</th>
                            <th className="p-3 w-16">Absen</th>
                            <th className="p-3">Nama Lengkap</th>
                            <th className="p-3 w-28">Waktu Tes</th>
                            <th className="p-3 w-20 text-center">Durasi</th>
                            <th className="p-3 w-20 text-center">Benar</th>
                            <th className="p-3 w-20 text-center">Nilai</th>
                            <th className="p-3 w-24 text-center">Status</th>
                            <th className="p-3 w-36 text-center">Aksi Dokumen</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {results.map((r, idx) => (
                            <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3 text-center text-slate-500 font-medium">{idx + 1}</td>
                              <td className="p-3 font-mono font-bold text-slate-800">#{r.student.absenceNumber}</td>
                              <td className="p-3 font-semibold text-slate-900">{r.student.fullName}</td>
                              <td className="p-3 text-slate-500">{r.formattedDate}</td>
                              <td className="p-3 text-center text-slate-600">{r.durationFormatted || '15m'}</td>
                              <td className="p-3 text-center font-bold text-slate-700">
                                {r.correctCount} / {r.totalQuestions}
                              </td>
                              <td className="p-3 text-center font-black text-sm text-slate-900">{r.score}</td>
                              <td className="p-3 text-center">
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                  r.passed
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                                }`}>
                                  {r.passed ? 'Tuntas' : 'Remedial'}
                                </span>
                              </td>
                              <td className="p-3 text-center space-x-1">
                                <button
                                  type="button"
                                  onClick={() => setSelectedStudentResult(r)}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                                  title="Analisis Butir & Rekomendasi"
                                >
                                  Analisis
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onPrintStudentReport(r)}
                                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold cursor-pointer"
                                  title="Cetak Rapor Hasil Siswa"
                                >
                                  Rapor
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 4: PENGATURAN IDENTITAS SEKOLAH & PEJABAT                             */}
              {/* ========================================================================= */}
              {activeTab === 'pengaturan' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Identitas Satuan Pendidikan &amp; Tanda Tangan Resmi
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Data ini dicetak otomatis pada naskah soal, kisi-kisi, dokumen analisis butir, dan rapor hasil tes.
                    </p>
                  </div>

                  {settingsSavedToast && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Pengaturan identitas sekolah berhasil disimpan!</span>
                    </motion.div>
                  )}

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nama Sekolah
                        </label>
                        <input
                          type="text"
                          value={localSettings.schoolName}
                          onChange={(e) => setLocalSettings({ ...localSettings, schoolName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nama Kepala Sekolah
                        </label>
                        <input
                          type="text"
                          value={localSettings.headmasterName}
                          onChange={(e) => setLocalSettings({ ...localSettings, headmasterName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          NIP Kepala Sekolah
                        </label>
                        <input
                          type="text"
                          value={localSettings.headmasterNip}
                          onChange={(e) => setLocalSettings({ ...localSettings, headmasterNip: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nama Guru Pengampu
                        </label>
                        <input
                          type="text"
                          value={localSettings.teacherName}
                          onChange={(e) => setLocalSettings({ ...localSettings, teacherName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          NIPPPK Guru Pengampu
                        </label>
                        <input
                          type="text"
                          value={localSettings.teacherNip}
                          onChange={(e) => setLocalSettings({ ...localSettings, teacherNip: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mata Pelajaran
                        </label>
                        <input
                          type="text"
                          value={localSettings.subject}
                          onChange={(e) => setLocalSettings({ ...localSettings, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tingkat Kelas
                        </label>
                        <input
                          type="text"
                          value={localSettings.className}
                          onChange={(e) => setLocalSettings({ ...localSettings, className: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nilai KKTP (Kriteria Ketuntasan)
                        </label>
                        <input
                          type="number"
                          value={localSettings.kktp}
                          onChange={(e) => setLocalSettings({ ...localSettings, kktp: Number(e.target.value) || 70 })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Password Panel Guru
                        </label>
                        <input
                          type="text"
                          value={localSettings.teacherPassword}
                          onChange={(e) => setLocalSettings({ ...localSettings, teacherPassword: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={handleSaveSettings}
                        className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-colors"
                      >
                        Simpan Perubahan Pengaturan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 5: INTEGRASI SPREADSHEET                                              */}
              {/* ========================================================================= */}
              {activeTab === 'script' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Mendukung Banyak Aplikasi / Mapel Berbeda dalam 1 Google Spreadsheet</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">
                      Otomatisasi Sinkronisasi Google Sheets Multi-Mapel
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Anda dapat menggunakan <strong>1 Google Spreadsheet yang sama</strong> untuk semua aplikasi tes (IPAS, Matematika, Bahasa Indonesia, dll). Script ini otomatis membuat dan memisahkan tab per mata pelajaran serta mencatat rekap seluruh nilai ke tab master.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        URL Web App Google Apps Script
                      </label>
                      <input
                        type="url"
                        value={localSettings.sheetWebhookUrl}
                        onChange={(e) => setLocalSettings({ ...localSettings, sheetWebhookUrl: e.target.value })}
                        placeholder="https://script.google.com/macros/s/.../exec"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSaveSettings}
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-xs cursor-pointer"
                      >
                        Simpan URL Webhook
                      </button>
                      <button
                        type="button"
                        onClick={handleTestWebhook}
                        disabled={testingWebhook}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs cursor-pointer disabled:opacity-50"
                      >
                        {testingWebhook ? 'Menguji...' : 'Uji Koneksi'}
                      </button>
                    </div>

                    {webhookTestMessage && (
                      <p className="text-xs p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-medium">
                        {webhookTestMessage}
                      </p>
                    )}
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        Kode Google Apps Script (Salin ke Extensions &gt; Apps Script di Google Sheets):
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyScript}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedScript ? 'Tersalin' : 'Salin Kode'}</span>
                      </button>
                    </div>
                    <pre className="text-[11px] font-mono text-emerald-300 bg-black/40 p-3 rounded-xl overflow-x-auto max-h-48">
                      {GOOGLE_APPS_SCRIPT_SAMPLE}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL: DETAIL ANALISIS SISWA (KETIKA BARIS SISWA DIKLIK) */}
        {selectedStudentResult && (
          <StudentDetailAnalysisModal
            result={selectedStudentResult}
            questions={questions}
            onClose={() => setSelectedStudentResult(null)}
            onPrintReport={() => {
              onPrintStudentReport(selectedStudentResult);
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
