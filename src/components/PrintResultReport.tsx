import React from 'react';
import { Printer, X, Award, CheckCircle2 } from 'lucide-react';
import { ExamResultData, ExamSettings } from '../types';

interface PrintResultReportProps {
  result: ExamResultData;
  settings: ExamSettings;
  onClose: () => void;
}

export const PrintResultReport: React.FC<PrintResultReportProps> = ({
  result,
  settings,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs overflow-y-auto p-2 sm:p-6 print:p-0 print:bg-white print:static">
      {/* Top Floating Control Bar (hidden in print) */}
      <div className="max-w-3xl mx-auto mb-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-700" />
          <span className="font-bold text-sm text-slate-900">
            Pratinjau Lembar Hasil Tes ({result.student.fullName})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-trigger-report-print"
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF (A4)</span>
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

      {/* A4 Paper Certificate / Transcript Layout */}
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 shadow-2xl rounded-2xl print:shadow-none print:p-0 print:m-0 text-slate-900 font-sans border-8 border-double border-slate-200 print:border-none">
        {/* Kop Surat Resmi */}
        <div className="border-b-4 border-double border-black pb-4 mb-6 text-center">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-slate-800">
            Pemerintah Kabupaten Jembrana • Dinas Pendidikan Kepemudaan dan Olahraga
          </h4>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase mt-1">
            {settings.schoolName}
          </h2>
          <p className="text-xs text-slate-600">
            Alamat: Kelurahan Loloan Timur, Kec. Negara, Kab. Jembrana - Bali 82218
          </p>
          <div className="mt-3 pt-2 border-t border-slate-300">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide">
              Laporan Hasil Tes Sumatif Peserta Didik
            </h3>
            <p className="text-xs text-slate-700 font-semibold">
              Mata Pelajaran: {settings.subject} • {settings.className} • Kurikulum Merdeka
            </p>
            <p className="text-xs text-slate-600">
              Materi: {settings.topic}
            </p>
          </div>
        </div>

        {/* Student Profile Info */}
        <div className="bg-slate-50 border border-slate-300 p-4 rounded-xl mb-6 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-y-2">
            <div>
              <span className="text-slate-500 block">Nama Lengkap:</span>
              <strong className="text-slate-900 text-sm sm:text-base">{result.student.fullName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Nomor Absen:</span>
              <strong className="text-slate-900 text-sm sm:text-base">#{result.student.absenceNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Kelas:</span>
              <strong className="text-slate-900">{result.student.className} (Sekolah Dasar)</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Waktu &amp; Durasi Pengerjaan:</span>
              <strong className="text-slate-900">
                {result.formattedDate} ({result.durationFormatted || '15m 00s'})
              </strong>
            </div>
          </div>
        </div>

        {/* Score Hero Banner */}
        <div className="border-2 border-black p-6 rounded-2xl text-center mb-6 bg-slate-50/50">
          <span className="text-xs uppercase tracking-widest font-bold text-slate-600 block">
            Capaian Nilai Akhir
          </span>
          <div className="text-6xl font-black text-slate-950 my-2">
            {result.score}
          </div>
          <div className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-black bg-white">
            Status: {result.passed ? 'TUNTAS (TERCAPAI)' : 'REMEDIAL'}
          </div>
          <p className="text-xs text-slate-600 mt-2 font-medium">
            Kriteria Ketercapaian Tujuan Pembelajaran (KKTP): <strong>{result.kktp}</strong>
          </p>
        </div>

        {/* Breakdown Table */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Rincian Capaian Butir Soal (Total {result.totalQuestions} Butir):
          </h4>
          <table className="w-full border-collapse border border-black text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-black p-2 text-left">Komponen Bentuk Soal</th>
                <th className="border border-black p-2 text-center">Jumlah Soal</th>
                <th className="border border-black p-2 text-center">Jawaban Benar</th>
                <th className="border border-black p-2 text-center">Benar Sebagian</th>
                <th className="border border-black p-2 text-center">Jawaban Salah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 font-medium">1. Pilihan Ganda (PG)</td>
                <td className="border border-black p-2 text-center">{result.breakdown.pg.total}</td>
                <td className="border border-black p-2 text-center font-bold">{result.breakdown.pg.correct}</td>
                <td className="border border-black p-2 text-center">-</td>
                <td className="border border-black p-2 text-center">
                  {result.breakdown.pg.total - result.breakdown.pg.correct}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">2. PGK Kategori (3 Pernyataan Benar/Salah)</td>
                <td className="border border-black p-2 text-center">{result.breakdown.kategori.total}</td>
                <td className="border border-black p-2 text-center font-bold">
                  {result.breakdown.kategori.correct}
                </td>
                <td className="border border-black p-2 text-center font-bold text-amber-700">
                  {result.breakdown.kategori.partial || 0}
                </td>
                <td className="border border-black p-2 text-center">
                  {result.breakdown.kategori.total -
                    result.breakdown.kategori.correct -
                    (result.breakdown.kategori.partial || 0)}
                </td>
              </tr>
              <tr className="bg-slate-100 font-bold">
                <td className="border border-black p-2">TOTAL KESELURUHAN</td>
                <td className="border border-black p-2 text-center">{result.totalQuestions}</td>
                <td className="border border-black p-2 text-center">{result.correctCount}</td>
                <td className="border border-black p-2 text-center">{result.partialCount || 0}</td>
                <td className="border border-black p-2 text-center">{result.incorrectCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verification Note */}
        <p className="text-[11px] text-slate-500 italic mb-8">
          Catatan: Nilai ini dihasilkan dari sistem penilaian Tes Sumatif Kemampuan Akademik IPAS Berbasis Web SD Negeri 3 Loloan Timur dan telah tersinkronisasi dalam pangkalan data guru.
        </p>

        {/* Signature Box */}
        <div className="flex justify-between text-xs break-inside-avoid">
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
