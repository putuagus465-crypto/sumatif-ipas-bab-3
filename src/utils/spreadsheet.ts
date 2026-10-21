import { ExamResultData, ExamSettings, Question } from '../types';
import { INITIAL_QUESTIONS } from '../data/questions';

const STORAGE_KEY_RESULTS = 'sdn3_loloan_ipas_results_v2';
const STORAGE_KEY_SETTINGS = 'sdn3_loloan_ipas_settings_v2';

export const DEFAULT_SETTINGS: ExamSettings = {
  schoolName: 'SD Negeri 3 Loloan Timur',
  headmasterName: 'Susilo Fitri Yatmoko, M.Pd',
  headmasterNip: '19880521 201101 1 010',
  teacherName: 'I Putu Agus Pramana Putra, S.Pd.',
  teacherNip: '199711062022211001',
  className: 'Kelas III',
  subject: 'IPAS',
  topic: 'Siklus Hidup Manusia, Ciri-Ciri Tumbuh dan Kembang Manusia',
  kktp: 70,
  allowShowSolutions: false,
  sheetWebhookUrl: '',
  teacherPassword: 'GURUADMIN',
};

/**
 * Loads exam settings from local storage
 */
export function getExamSettings(): ExamSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure required identity fields from prompt exist
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        schoolName: parsed.schoolName || DEFAULT_SETTINGS.schoolName,
        headmasterName: parsed.headmasterName || DEFAULT_SETTINGS.headmasterName,
        headmasterNip: parsed.headmasterNip || DEFAULT_SETTINGS.headmasterNip,
        teacherName: parsed.teacherName || DEFAULT_SETTINGS.teacherName,
        teacherNip: parsed.teacherNip || DEFAULT_SETTINGS.teacherNip,
        className: parsed.className || DEFAULT_SETTINGS.className,
        subject: parsed.subject || DEFAULT_SETTINGS.subject,
        topic: parsed.topic || DEFAULT_SETTINGS.topic,
        kktp: parsed.kktp ?? DEFAULT_SETTINGS.kktp,
      };
    }
  } catch (e) {
    console.error('Failed to parse settings:', e);
  }
  return DEFAULT_SETTINGS;
}

/**
 * Saves updated exam settings
 */
export function saveExamSettings(settings: ExamSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

/**
 * Generates realistic initial sample results for Kelas III students of SDN 3 Loloan Timur
 */
export function getMockInitialResults(questions: Question[] = INITIAL_QUESTIONS): ExamResultData[] {
  const sampleStudents = [
    { fullName: 'I Gede Aditya Pratama', absenceNumber: '01', ability: 0.90, durationSec: 880 },
    { fullName: 'Ni Kadek Ayu Maharani', absenceNumber: '02', ability: 0.85, durationSec: 940 },
    { fullName: 'I Komang Bagus Danendra', absenceNumber: '03', ability: 0.76, durationSec: 1020 },
    { fullName: 'Ni Made Citra Dewi', absenceNumber: '04', ability: 0.93, durationSec: 790 },
    { fullName: 'I Putu Dimas Raditya', absenceNumber: '05', ability: 0.65, durationSec: 1150 },
    { fullName: 'Ni Ketut Elsa Pratiwi', absenceNumber: '06', ability: 0.80, durationSec: 920 },
    { fullName: 'Fandi Ahmad Al-Farizi', absenceNumber: '07', ability: 0.70, durationSec: 980 },
    { fullName: 'Gita Saraswati', absenceNumber: '08', ability: 0.86, durationSec: 860 },
    { fullName: 'I Wayan Hendra Wibawa', absenceNumber: '09', ability: 0.58, durationSec: 1220 },
    { fullName: 'Nurul Hidayati', absenceNumber: '10', ability: 0.74, durationSec: 1010 },
  ];

  return sampleStudents.map((s, sIdx) => {
    let fullCorrect = 0;
    let partialCount = 0;
    let totalScoreEarned = 0;

    const evaluations = questions.map((q, qIdx) => {
      // Deterministic pseudo-randomness based on question difficulty and student ability
      const diffPenalty = q.difficulty === 'Sukar' ? 0.35 : q.difficulty === 'Sedang' ? 0.15 : 0.05;
      const passThreshold = s.ability - diffPenalty;
      const randSeed = ((sIdx + 1) * 17 + (qIdx + 1) * 31) % 100 / 100;

      if (q.type === 'pilihan_ganda') {
        const isCorrect = randSeed <= passThreshold;
        if (isCorrect) {
          fullCorrect++;
          totalScoreEarned += 1;
        }
        return {
          questionId: q.id,
          originalNumber: q.originalNumber,
          type: q.type,
          isCorrect,
          isPartial: false,
          score: isCorrect ? 1 : 0,
          maxScore: 1,
          userAnswer: isCorrect ? q.correctAnswer : ((q.correctAnswer ?? 0) + 1) % 4,
        };
      } else {
        // PGK Kategori with 3 statements
        if (randSeed <= passThreshold) {
          fullCorrect++;
          totalScoreEarned += 1;
          const ans: Record<string, string> = {};
          q.statements?.forEach((st) => { ans[st.id] = st.correctAnswer; });
          return {
            questionId: q.id,
            originalNumber: q.originalNumber,
            type: q.type,
            isCorrect: true,
            isPartial: false,
            score: 1,
            maxScore: 1,
            userAnswer: ans,
            details: { correctStatementsCount: 3, totalStatementsCount: 3 },
          };
        } else if (randSeed <= passThreshold + 0.25) {
          partialCount++;
          const score = 0.67;
          totalScoreEarned += score;
          const ans: Record<string, string> = {};
          q.statements?.forEach((st, idx) => {
            ans[st.id] = idx === 2 ? (st.correctAnswer === 'Benar' ? 'Salah' : 'Benar') : st.correctAnswer;
          });
          return {
            questionId: q.id,
            originalNumber: q.originalNumber,
            type: q.type,
            isCorrect: false,
            isPartial: true,
            score,
            maxScore: 1,
            userAnswer: ans,
            details: { correctStatementsCount: 2, totalStatementsCount: 3 },
          };
        } else {
          const ans: Record<string, string> = {};
          q.statements?.forEach((st) => {
            ans[st.id] = st.correctAnswer === 'Benar' ? 'Salah' : 'Benar';
          });
          return {
            questionId: q.id,
            originalNumber: q.originalNumber,
            type: q.type,
            isCorrect: false,
            isPartial: false,
            score: 0,
            maxScore: 1,
            userAnswer: ans,
            details: { correctStatementsCount: 0, totalStatementsCount: 3 },
          };
        }
      }
    });

    const totalQuestions = questions.length;
    const rawScore = (totalScoreEarned / totalQuestions) * 100;
    const score = Math.round(rawScore * 10) / 10;
    const passed = score >= 70;
    const incorrectCount = totalQuestions - fullCorrect - partialCount;

    const m = Math.floor(s.durationSec / 60);
    const sec = s.durationSec % 60;
    const durationFormatted = `${m}m ${sec < 10 ? '0' : ''}${sec}s`;

    return {
      id: `sample-res-${sIdx + 1}`,
      student: {
        fullName: s.fullName,
        absenceNumber: s.absenceNumber,
        className: 'Kelas III',
      },
      timestamp: new Date(Date.now() - (sIdx + 1) * 3600000).toISOString(),
      formattedDate: new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(Date.now() - (sIdx + 1) * 3600000)),
      durationSeconds: s.durationSec,
      durationFormatted,
      totalQuestions,
      correctCount: fullCorrect,
      partialCount,
      incorrectCount,
      score,
      passed,
      kktp: 70,
      breakdown: {
        pg: { correct: evaluations.filter((e) => e.type === 'pilihan_ganda' && e.isCorrect).length, total: 20 },
        kategori: {
          correct: evaluations.filter((e) => e.type === 'kategori' && e.isCorrect).length,
          partial: evaluations.filter((e) => e.type === 'kategori' && e.isPartial).length,
          total: 10,
        },
      },
      evaluations,
      sentToSpreadsheet: true,
    };
  });
}

/**
 * Loads all exam results from local storage (or populates mock if empty)
 */
export function getAllExamResults(): ExamResultData[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_RESULTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load exam results:', e);
  }
  // Initialize with initial sample class data for immediate rich display
  const initialData = getMockInitialResults();
  try {
    localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(initialData));
  } catch {
    // Ignore storage issues
  }
  return initialData;
}

/**
 * Saves a new exam result and attempts auto-sync to Spreadsheet
 */
export async function saveExamResult(result: ExamResultData): Promise<ExamResultData> {
  const currentList = getAllExamResults();

  let sentToSheet = false;
  const settings = getExamSettings();

  if (settings.sheetWebhookUrl && settings.sheetWebhookUrl.trim().startsWith('http')) {
    try {
      sentToSheet = await sendToGoogleSheetWebhook(settings.sheetWebhookUrl, result);
    } catch (err) {
      console.warn('Webhook auto-sync failed, saved locally:', err);
    }
  }

  const updatedResult = { ...result, sentToSpreadsheet: sentToSheet };
  const updatedList = [updatedResult, ...currentList.filter((r) => r.id !== result.id)];

  try {
    localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updatedList));
  } catch (e) {
    console.error('Failed to save result in localStorage:', e);
  }

  return updatedResult;
}

/**
 * Deletes a single result by ID
 */
export function deleteExamResult(id: string): void {
  const list = getAllExamResults().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(list));
}

/**
 * Clears all exam results and restores sample data or empty
 */
export function clearAllExamResults(): void {
  localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify([]));
}

/**
 * Reset to sample results for Kelas III
 */
export function resetToSampleResults(): ExamResultData[] {
  const mock = getMockInitialResults();
  localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(mock));
  return mock;
}

/**
 * Sends a result payload to Google Sheets Web App (Google Apps Script)
 */
export async function sendToGoogleSheetWebhook(webhookUrl: string, result: ExamResultData): Promise<boolean> {
  const payload = {
    timestamp: result.formattedDate || new Date().toLocaleString('id-ID'),
    isoTimestamp: result.timestamp,
    fullName: result.student.fullName,
    className: result.student.className,
    absenceNumber: result.student.absenceNumber,
    correctCount: result.correctCount,
    partialCount: result.partialCount || 0,
    incorrectCount: result.incorrectCount,
    totalQuestions: result.totalQuestions,
    score: result.score,
    duration: result.durationFormatted || '-',
    status: result.passed ? 'Tuntas' : 'Remedial',
    kktp: result.kktp,
    pgScore: `${result.breakdown.pg.correct}/${result.breakdown.pg.total}`,
    kategoriScore: `${result.breakdown.kategori.correct}/${result.breakdown.kategori.total} (Sebagian: ${result.breakdown.kategori.partial || 0})`,
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors',
    });
    return true;
  } catch (err) {
    console.error('Error posting to Google Sheets webhook:', err);
    return false;
  }
}

/**
 * Generates and downloads an Excel/CSV spreadsheet file of Item Analysis & Student Response Matrix
 */
export function downloadMatrixItemAnalysisCSV(
  results: ExamResultData[],
  questions: Question[],
  settings: ExamSettings
): void {
  if (results.length === 0) {
    alert('Belum ada data respons siswa untuk diekspor.');
    return;
  }

  const qNumbers = questions.map((q) => `Q${q.originalNumber}`);

  // Header row 1: metadata
  const rows: string[][] = [
    [`"LAPORAN ANALISIS BUTIR SOAL & MATRIKS RESPON SISWA"`],
    [`"Sekolah: ${settings.schoolName}"`, `"Mata Pelajaran: ${settings.subject}"`, `"Kelas: ${settings.className}"`],
    [`"Materi: ${settings.topic}"`, `"KKTP: ${settings.kktp}"`, `"Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}"`],
    [],
    // Table Headers
    [
      'No',
      'No. Absen',
      'Nama Siswa',
      'Kelas',
      ...qNumbers,
      'Total Skor',
      'Nilai Akhir',
      'Status Ketercapaian',
      'Durasi Pengerjaan',
      'Benar PG (20)',
      'Benar Penuh PGK (10)',
      'Benar Sebagian PGK',
    ],
  ];

  // Student rows
  results.forEach((r, idx) => {
    const studentItemResponses = questions.map((q) => {
      const ev = r.evaluations.find((e) => e.originalNumber === q.originalNumber || e.questionId === q.id);
      if (!ev) return '0';
      if (ev.isCorrect) return '1';
      if (ev.isPartial) return '0.5';
      return '0';
    });

    rows.push([
      String(idx + 1),
      `"${r.student.absenceNumber}"`,
      `"${r.student.fullName.replace(/"/g, '""')}"`,
      `"${r.student.className}"`,
      ...studentItemResponses,
      String(r.score ? Math.round((r.score / 100) * questions.length * 10) / 10 : 0),
      String(r.score),
      r.passed ? 'Tuntas' : 'Remedial',
      r.durationFormatted || '15m 00s',
      String(r.breakdown.pg.correct),
      String(r.breakdown.kategori.correct),
      String(r.breakdown.kategori.partial || 0),
    ]);
  });

  // Footer statistics per item
  const correctCounts: string[] = [];
  const percentPasses: string[] = [];
  const difficultyEmpirical: string[] = [];

  questions.forEach((q) => {
    let correctCount = 0;
    results.forEach((r) => {
      const ev = r.evaluations.find((e) => e.originalNumber === q.originalNumber || e.questionId === q.id);
      if (ev?.isCorrect) correctCount += 1;
      else if (ev?.isPartial) correctCount += 0.5;
    });

    const percent = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;
    correctCounts.push(String(correctCount));
    percentPasses.push(`${percent}%`);

    // Klasifikasi empiris sesuai kriteria prompt:
    // Mudah: > 70%, Sedang: 10 - 25% (atau 25 - 70%), Sukar: < 10%
    let diff = 'Sedang';
    if (percent > 70) diff = 'Mudah';
    else if (percent < 25) diff = 'Sukar';
    difficultyEmpirical.push(diff);
  });

  rows.push([]);
  rows.push(['REKAPITULASI BUTIR SOAL', '', '', '', ...correctCounts, '', '', '', '', '', '', '']);
  rows.push(['Jumlah Siswa Menjawab Benar', '', '', '', ...correctCounts, '', '', '', '', '', '', '']);
  rows.push(['Persentase Ketercapaian (%)', '', '', '', ...percentPasses, '', '', '', '', '', '', '']);
  rows.push(['Klasifikasi Empiris Kesukaran', '', '', '', ...difficultyEmpirical, '', '', '', '', '', '', '']);

  rows.push([]);
  rows.push([
    `"Mengetahui, Kepala ${settings.schoolName}"`,
    '',
    '',
    '',
    '',
    `"Loloan Timur, ${new Date().toLocaleDateString('id-ID')}"`,
  ]);
  rows.push([`"${settings.headmasterName}"`, '', '', '', '', `"Guru Pengampu: ${settings.teacherName}"`]);
  rows.push([`"NIP. ${settings.headmasterNip}"`, '', '', '', '', `"NIPPPK. ${settings.teacherNip}"`]);

  const csvContent = rows.map((r) => r.join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    `Matriks_Analisis_Butir_Soal_IPAS_Kelas_III_SDN3_Loloan_Timur_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Sample Google Apps Script code for teacher setup in Google Sheets
 */
export const GOOGLE_APPS_SCRIPT_SAMPLE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Buat header jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Nama Siswa",
        "Kelas",
        "Nomor Absen",
        "Jumlah Benar",
        "Sebagian Benar",
        "Jumlah Salah",
        "Total Soal",
        "Nilai Akhir",
        "Durasi Pengerjaan",
        "Status Ketercapaian (KKTP 70)",
        "Rincian PG (20)",
        "Rincian PGK Kategori (10)"
      ]);
      sheet.getRange(1, 1, 1, 13).setFontWeight("bold").setBackground("#e2e8f0");
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date(),
      data.fullName,
      data.className,
      data.absenceNumber,
      data.correctCount,
      data.partialCount || 0,
      data.incorrectCount,
      data.totalQuestions,
      data.score,
      data.duration || "-",
      data.status,
      data.pgScore,
      data.kategoriScore
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
