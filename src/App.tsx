/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StudentIdentity } from './components/StudentIdentity';
import { ExamScreen } from './components/ExamScreen';
import { ExamResult } from './components/ExamResult';
import { TeacherPanel } from './components/TeacherPanel';
import { PrintExamSheet } from './components/PrintExamSheet';
import { PrintResultReport } from './components/PrintResultReport';
import { PrintKisiKisi } from './components/PrintKisiKisi';
import { PrintItemAnalysis } from './components/PrintItemAnalysis';
import { INITIAL_QUESTIONS } from './data/questions';
import {
  Student,
  Question,
  StudentAnswerValue,
  ExamResultData,
  ExamSettings,
} from './types';
import { generateShuffledExam } from './utils/shuffle';
import { calculateExamResult } from './utils/scoring';
import {
  getExamSettings,
  getAllExamResults,
  saveExamResult,
} from './utils/spreadsheet';

export default function App() {
  // Application Stage: 'identity' (Tahap 1) | 'exam' (Tahap 2) | 'result' (Tahap 3)
  const [stage, setStage] = useState<'identity' | 'exam' | 'result'>('identity');

  // App Settings
  const [settings, setSettings] = useState<ExamSettings>(getExamSettings());

  // Current Active Student
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  // Active Questions for current exam session (shuffled with randomized options)
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(INITIAL_QUESTIONS);

  // Student Answers Map (questionId -> answer)
  const [userAnswers, setUserAnswers] = useState<Record<string, StudentAnswerValue>>({});

  // Active Exam Result
  const [activeResult, setActiveResult] = useState<ExamResultData | null>(null);

  // Teacher Panel State & Results List
  const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);
  const [allResults, setAllResults] = useState<ExamResultData[]>([]);

  // Print Modals
  const [printSheetModal, setPrintSheetModal] = useState<{ open: boolean; withAnswers: boolean }>({
    open: false,
    withAnswers: false,
  });
  const [printReportResult, setPrintReportResult] = useState<ExamResultData | null>(null);
  const [printKisiKisiOpen, setPrintKisiKisiOpen] = useState(false);
  const [printItemAnalysisOpen, setPrintItemAnalysisOpen] = useState(false);

  // Load initial settings and results from storage
  useEffect(() => {
    setSettings(getExamSettings());
    setAllResults(getAllExamResults());
  }, []);

  // TAHAP 1 -> TAHAP 2: Mulai Tes
  const handleStartExam = (student: Student) => {
    setCurrentStudent(student);
    // Shuffle questions and options for this session
    const randomizedQuestions = generateShuffledExam(INITIAL_QUESTIONS);
    setActiveQuestions(randomizedQuestions);
    setUserAnswers({});
    setStage('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Answer change handler
  const handleAnswerChange = (questionId: string, answer: StudentAnswerValue) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // TAHAP 2 -> TAHAP 3: Kirim Jawaban & Nilai
  const handleSubmitExam = async (durationSeconds: number = 900) => {
    if (!currentStudent) return;

    // Calculate score
    const resultData = calculateExamResult(
      currentStudent,
      activeQuestions,
      userAnswers,
      settings.kktp,
      durationSeconds
    );

    // Save locally and send to Spreadsheet Webhook if configured
    const savedResult = await saveExamResult(resultData);

    setActiveResult(savedResult);
    setAllResults(getAllExamResults());
    setStage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to new exam
  const handleResetExam = () => {
    setCurrentStudent(null);
    setUserAnswers({});
    setActiveResult(null);
    setStage('identity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <Header
        settings={settings}
        stage={stage}
        onOpenTeacherPanel={() => setIsTeacherPanelOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-16">
        {stage === 'identity' && (
          <StudentIdentity
            settings={settings}
            onStartExam={handleStartExam}
            onDownloadQuestionPDF={() => setPrintSheetModal({ open: true, withAnswers: false })}
            onDownloadKisiKisiPDF={() => setPrintKisiKisiOpen(true)}
            onOpenTeacherPanel={() => setIsTeacherPanelOpen(true)}
          />
        )}

        {stage === 'exam' && currentStudent && (
          <ExamScreen
            student={currentStudent}
            questions={activeQuestions}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            onSubmitExam={handleSubmitExam}
            onDownloadQuestionPDF={() => setPrintSheetModal({ open: true, withAnswers: false })}
          />
        )}

        {stage === 'result' && activeResult && (
          <ExamResult
            result={activeResult}
            settings={settings}
            questions={activeQuestions}
            onResetExam={handleResetExam}
            onPrintResultReport={() => setPrintReportResult(activeResult)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-5xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            {settings.schoolName} • {settings.className} • {settings.subject}
          </p>
          <p>
            Sistem Penilaian Tes Sumatif Kemampuan Akademik Online • Kurikulum Merdeka
          </p>
          <p className="text-[11px] text-slate-400">
            Kecamatan Negara, Kabupaten Jembrana, Provinsi Bali
          </p>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* MODAL / OVERLAY: PANEL GURU (TAHAP 4)                     */}
      {/* ========================================================= */}
      <TeacherPanel
        isOpen={isTeacherPanelOpen}
        onClose={() => setIsTeacherPanelOpen(false)}
        results={allResults}
        onRefreshResults={() => setAllResults(getAllExamResults())}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
        questions={INITIAL_QUESTIONS}
        onPrintStudentReport={(res) => setPrintReportResult(res)}
        onPrintMasterQuestions={(withKeys) => setPrintSheetModal({ open: true, withAnswers: withKeys })}
        onPrintKisiKisi={() => setPrintKisiKisiOpen(true)}
        onPrintItemAnalysis={() => setPrintItemAnalysisOpen(true)}
      />

      {/* ========================================================= */}
      {/* MODAL / OVERLAY: CETAK NASKAH SOAL (PDF)                  */}
      {/* ========================================================= */}
      {printSheetModal.open && (
        <PrintExamSheet
          settings={settings}
          questions={INITIAL_QUESTIONS}
          withAnswers={printSheetModal.withAnswers}
          onClose={() => setPrintSheetModal({ open: false, withAnswers: false })}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL / OVERLAY: CETAK HASIL / RAPORT SISWA (PDF)         */}
      {/* ========================================================= */}
      {printReportResult && (
        <PrintResultReport
          result={printReportResult}
          settings={settings}
          onClose={() => setPrintReportResult(null)}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL / OVERLAY: CETAK KISI-KISI SOAL (PDF)               */}
      {/* ========================================================= */}
      {printKisiKisiOpen && (
        <PrintKisiKisi
          settings={settings}
          questions={INITIAL_QUESTIONS}
          onClose={() => setPrintKisiKisiOpen(false)}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL / OVERLAY: CETAK ANALISIS BUTIR & MATRIKS (PDF)     */}
      {/* ========================================================= */}
      {printItemAnalysisOpen && (
        <PrintItemAnalysis
          results={allResults}
          questions={INITIAL_QUESTIONS}
          settings={settings}
          onClose={() => setPrintItemAnalysisOpen(false)}
        />
      )}
    </div>
  );
}
