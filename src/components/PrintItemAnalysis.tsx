import React from 'react';
import { Printer, X, FileSpreadsheet } from 'lucide-react';
import { ExamResultData, ExamSettings, Question } from '../types';

interface PrintItemAnalysisProps {
  results: ExamResultData[];
  questions: Question[];
  settings: ExamSettings;
  onClose: () => void;
}

export const PrintItemAnalysis: React.FC<PrintItemAnalysisProps> = ({
  results,
  questions,
  settings,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const totalStudents = results.length;
  const passedStudents = results.filter((r) => r.passed).length;
  const passPercentage = totalStudents > 0 ? Math.round((passedStudents / totalStudents) * 100) : 0;
  const avgScore = totalStudents > 0
    ? Math.round((results.reduce((acc, curr) => acc + curr.score, 0) / totalStudents) * 10) / 10
    : 0;

  // Item statistics per question
  const itemStats = questions.map((q) => {
    let fullCorrect = 0;
    let partial = 0;
    let wrong = 0;

    results.forEach((r) => {
      const ev = r.evaluations.find(
        (e) => e.originalNumber === q.originalNumber || e.questionId === q.id
      );
      if (ev?.isCorrect) fullCorrect++;
      else if (ev?.isPartial) partial++;
      else wrong++;
    });

    const weightedScore = fullCorrect + partial * 0.5;
    const percentage = totalStudents > 0 ? Math.round((weightedScore / totalStudents) * 100) : 0;

    // Klasifikasi empiris kesukaran: Mudah (>70%), Sedang (25-70%), Sukar (<25%)
    let empirical = 'Sedang';
    if (percentage > 70) empirical = 'Mudah';
    else if (percentage < 25) empirical = 'Sukar';

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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs overflow-y-auto p-2 sm:p-6 print:p-0 print:bg-white print:static">
      {/* Top Floating Control Bar */}
      <div className="max-w-6xl mx-auto mb-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-blue-700" />
          <span className="font-bold text-sm text-slate-900">
            Pratinjau Dokumen Laporan Analisis Butir Soal &amp; Matriks Respon
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-print-item-analysis"
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Unduh / Cetak PDF (A4 Lanskap)</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* A4 Landscape Document Container */}
      <div className="max-w-6xl mx-auto bg-white p-8 sm:p-10 shadow-2xl rounded-2xl print:shadow-none print:p-0 print:m-0 text-slate-900 font-sans">
        {/* Kop Surat Kedinasan */}
        <div className="border-b-4 border-double border-black pb-3 mb-4 text-center">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-slate-800">
            Pemerintah Kabupaten Jembrana • Dinas Pendidikan Kepemudaan dan Olahraga
          </h4>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase mt-0.5">
            {settings.schoolName}
          </h2>
          <p className="text-xs text-slate-600">
            Alamat: Kelurahan Loloan Timur, Kec. Negara, Kab. Jembrana - Bali 82218
          </p>
          <div className="mt-2 pt-2 border-t border-slate-300">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide">
              LAPORAN ANALISIS BUTIR SOAL &amp; MATRIKS RESPON SISWA
            </h3>
            <p className="text-xs text-slate-700 font-semibold">
              Mata Pelajaran: {settings.subject} • {settings.className} • Materi: {settings.topic}
            </p>
          </div>
        </div>

        {/* Ringkasan Kelas & KKTP */}
        <div className="grid grid-cols-4 gap-2 text-xs mb-4 border border-black p-2.5 rounded-lg bg-slate-50">
          <div>
            <span className="text-slate-600 block">Kriteria KKTP:</span>
            <strong className="text-slate-900">{settings.kktp} Poin</strong>
          </div>
          <div>
            <span className="text-slate-600 block">Jumlah Siswa:</span>
            <strong className="text-slate-900">{totalStudents} Siswa</strong>
          </div>
          <div>
            <span className="text-slate-600 block">Tuntas / Belum:</span>
            <strong className="text-slate-900">
              {passedStudents} Tuntas ({passPercentage}%)
            </strong>
          </div>
          <div>
            <span className="text-slate-600 block">Rata-rata Nilai:</span>
            <strong className="text-slate-900">{avgScore} / 100</strong>
          </div>
        </div>

        {/* Interactive Response Matrix Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-black text-[10px] leading-tight text-center">
            <thead>
              <tr className="bg-slate-200 font-bold">
                <th className="border border-black p-1 w-6">No</th>
                <th className="border border-black p-1 w-10">Absen</th>
                <th className="border border-black p-1 text-left w-36">Nama Siswa</th>
                {questions.map((q) => (
                  <th key={q.id} className="border border-black p-0.5 w-5" title={`Soal ${q.originalNumber} (${q.type === 'kategori' ? 'PGK' : 'PG'})`}>
                    {q.originalNumber}
                  </th>
                ))}
                <th className="border border-black p-1 w-10">Skor</th>
                <th className="border border-black p-1 w-10">Nilai</th>
                <th className="border border-black p-1 w-14">Status</th>
                <th className="border border-black p-1 w-12">Durasi</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, rIdx) => (
                <tr key={r.id} className={rIdx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="border border-black p-1">{rIdx + 1}</td>
                  <td className="border border-black p-1 font-mono">{r.student.absenceNumber}</td>
                  <td className="border border-black p-1 text-left font-medium truncate max-w-[140px]">
                    {r.student.fullName}
                  </td>
                  {questions.map((q) => {
                    const ev = r.evaluations.find(
                      (e) => e.originalNumber === q.originalNumber || e.questionId === q.id
                    );
                    const isCorrect = ev?.isCorrect;
                    const isPartial = ev?.isPartial;

                    let bgClass = 'bg-rose-100 text-rose-800';
                    let displayChar = '0';
                    if (isCorrect) {
                      bgClass = 'bg-emerald-100 text-emerald-800 font-bold';
                      displayChar = '1';
                    } else if (isPartial) {
                      bgClass = 'bg-amber-100 text-amber-800 font-bold';
                      displayChar = '½';
                    }

                    return (
                      <td key={q.id} className={`border border-black p-0.5 ${bgClass}`}>
                        {displayChar}
                      </td>
                    );
                  })}
                  <td className="border border-black p-1 font-bold">
                    {Math.round((r.score / 100) * questions.length * 10) / 10}
                  </td>
                  <td className="border border-black p-1 font-bold text-slate-900">
                    {r.score}
                  </td>
                  <td className="border border-black p-1 font-semibold">
                    <span className={r.passed ? 'text-emerald-700' : 'text-rose-700'}>
                      {r.passed ? 'Tuntas' : 'Remedial'}
                    </span>
                  </td>
                  <td className="border border-black p-1 text-slate-600">
                    {r.durationFormatted || '15m'}
                  </td>
                </tr>
              ))}

              {/* STATISTIK BUTIR SOAL DI BAGIAN BAWAH */}
              <tr className="bg-slate-200 font-bold text-slate-900 border-t-2 border-black">
                <td colSpan={3} className="border border-black p-1 text-left">
                  Jumlah Siswa Menjawab Benar
                </td>
                {itemStats.map((item) => (
                  <td key={item.q.id} className="border border-black p-0.5">
                    {item.weightedScore}
                  </td>
                ))}
                <td colSpan={4} className="border border-black p-1 text-left text-[9px] text-slate-600">
                  Total Benar + Partial
                </td>
              </tr>
              <tr className="bg-slate-100 font-bold text-slate-900">
                <td colSpan={3} className="border border-black p-1 text-left">
                  Persentase Ketercapaian (%)
                </td>
                {itemStats.map((item) => (
                  <td key={item.q.id} className="border border-black p-0.5 text-[9px]">
                    {item.percentage}%
                  </td>
                ))}
                <td colSpan={4} className="border border-black p-1 text-left text-[9px] text-slate-600">
                  Rata-rata Ketercapaian
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-slate-800">
                <td colSpan={3} className="border border-black p-1 text-left">
                  Klasifikasi Empiris Kesukaran
                </td>
                {itemStats.map((item) => {
                  let badge = item.empirical === 'Mudah' ? 'M' : item.empirical === 'Sedang' ? 'S' : 'K';
                  return (
                    <td key={item.q.id} className="border border-black p-0.5 text-[9px]">
                      {badge}
                    </td>
                  );
                })}
                <td colSpan={4} className="border border-black p-1 text-left text-[9px]">
                  M: Mudah, S: Sedang, K: Sukar
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] text-slate-600 mb-6">
          <span className="font-bold">Keterangan Matriks:</span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-emerald-200 border border-emerald-500 inline-block"></span>
            1 = Benar Penuh (Skor 1)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-amber-200 border border-amber-500 inline-block"></span>
            ½ = Benar Sebagian (PGK Kategori)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-rose-200 border border-rose-500 inline-block"></span>
            0 = Salah (Skor 0)
          </span>
          <span className="ml-auto italic">
            Kriteria Empiris: Mudah &gt;70%, Sedang 25-70%, Sukar &lt;25%
          </span>
        </div>

        {/* Signature Box */}
        <div className="mt-8 pt-6 border-t border-black flex justify-between text-xs break-inside-avoid">
          <div className="text-center w-56">
            <p>Mengetahui,</p>
            <p className="font-semibold">Kepala {settings.schoolName}</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{settings.headmasterName}</p>
            <p>NIP. {settings.headmasterNip}</p>
          </div>

          <div className="text-center w-56">
            <p>Loloan Timur, {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="font-semibold">Guru Pengampu Mata Pelajaran</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{settings.teacherName}</p>
            <p>NIPPPK. {settings.teacherNip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
