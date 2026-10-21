import React from 'react';
import { Printer, X, FileText, CheckCircle2 } from 'lucide-react';
import { Question, ExamSettings } from '../types';

interface PrintKisiKisiProps {
  settings: ExamSettings;
  questions: Question[];
  onClose: () => void;
}

export const PrintKisiKisi: React.FC<PrintKisiKisiProps> = ({
  settings,
  questions,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const totalQuestions = questions.length;

  // Level Kognitif Distribution
  const l1Count = questions.filter((q) => q.cognitiveLevel === 'L1').length;
  const l2Count = questions.filter((q) => q.cognitiveLevel === 'L2').length;
  const l3Count = questions.filter((q) => q.cognitiveLevel === 'L3').length;

  // Kesukaran Distribution
  const mudahCount = questions.filter((q) => q.difficulty === 'Mudah').length;
  const sedangCount = questions.filter((q) => q.difficulty === 'Sedang').length;
  const sukarCount = questions.filter((q) => q.difficulty === 'Sukar').length;

  // Bentuk Soal Distribution
  const pgCount = questions.filter((q) => q.type === 'pilihan_ganda').length;
  const kategoriCount = questions.filter((q) => q.type === 'kategori').length;

  // Elemen / Materi Distribution
  const categoryMap: Record<string, number> = {};
  questions.forEach((q) => {
    categoryMap[q.category] = (categoryMap[q.category] || 0) + 1;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs overflow-y-auto p-2 sm:p-6 print:p-0 print:bg-white print:static">
      {/* Top Floating Control Bar */}
      <div className="max-w-5xl mx-auto mb-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-700" />
          <span className="font-bold text-sm text-slate-900">
            Pratinjau Dokumen Kisi-Kisi Penulisan Soal Tes Sumatif IPAS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-print-kisi-kisi"
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Unduh / Cetak PDF (A4)</span>
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

      {/* A4 Paper Document Container */}
      <div className="max-w-5xl mx-auto bg-white p-8 sm:p-12 shadow-2xl rounded-2xl print:shadow-none print:p-0 print:m-0 text-slate-900 font-sans">
        {/* Kop Surat Kedinasan */}
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
          <div className="mt-3 pt-2 border-t border-slate-400">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide">
              KISI-KISI PENULISAN SOAL TES SUMATIF
            </h3>
            <p className="text-xs text-slate-700 font-semibold">
              Mata Pelajaran: {settings.subject} • Tingkat: {settings.className} (Sekolah Dasar)
            </p>
            <p className="text-xs text-slate-600">
              Lingkup Materi: {settings.topic} • Kurikulum Merdeka
            </p>
          </div>
        </div>

        {/* Identitas Format Kedinasan */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-6 border border-black p-3 rounded-lg">
          <div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600">Satuan Pendidikan</span>
              <span className="col-span-2 font-bold">: {settings.schoolName}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600">Mata Pelajaran</span>
              <span className="col-span-2 font-bold">: {settings.subject}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600">Kelas / Fase</span>
              <span className="col-span-2 font-bold">: {settings.className} / Fase B</span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600">Jumlah Soal</span>
              <span className="col-span-2 font-bold">: {totalQuestions} Butir (20 PG + 10 PGK)</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600">Alokasi Waktu</span>
              <span className="col-span-2 font-bold">: 60 Menit</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600">Kriteria KKTP</span>
              <span className="col-span-2 font-bold">: {settings.kktp} Poin</span>
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS: DISTRIBUSI KISI-KISI SOAL */}
        <div className="mb-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Kartu Ringkasan Distribusi Kisi-Kisi Soal:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {/* Bentuk Soal */}
            <div className="border border-slate-300 p-2.5 rounded-lg bg-slate-50">
              <strong className="block text-slate-800 mb-1 border-b pb-1">1. Bentuk Soal</strong>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>Pilihan Ganda:</span>
                  <span className="font-bold">{pgCount} ({Math.round((pgCount / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>PGK Kategori:</span>
                  <span className="font-bold">{kategoriCount} ({Math.round((kategoriCount / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex justify-between font-bold pt-1 border-t text-slate-900">
                  <span>Total Butir:</span>
                  <span>{totalQuestions} Soal</span>
                </div>
              </div>
            </div>

            {/* Level Kognitif */}
            <div className="border border-slate-300 p-2.5 rounded-lg bg-slate-50">
              <strong className="block text-slate-800 mb-1 border-b pb-1">2. Level Kognitif</strong>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>L1 (Pemahaman):</span>
                  <span className="font-bold">{l1Count} ({Math.round((l1Count / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>L2 (Aplikasi):</span>
                  <span className="font-bold">{l2Count} ({Math.round((l2Count / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>L3 (Penalaran):</span>
                  <span className="font-bold">{l3Count} ({Math.round((l3Count / totalQuestions) * 100)}%)</span>
                </div>
              </div>
            </div>

            {/* Tingkat Kesukaran */}
            <div className="border border-slate-300 p-2.5 rounded-lg bg-slate-50">
              <strong className="block text-slate-800 mb-1 border-b pb-1">3. Tingkat Kesukaran</strong>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>Mudah:</span>
                  <span className="font-bold">{mudahCount} ({Math.round((mudahCount / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sedang:</span>
                  <span className="font-bold">{sedangCount} ({Math.round((sedangCount / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sukar:</span>
                  <span className="font-bold">{sukarCount} ({Math.round((sukarCount / totalQuestions) * 100)}%)</span>
                </div>
              </div>
            </div>

            {/* Distribusi Sub-Topik */}
            <div className="border border-slate-300 p-2.5 rounded-lg bg-slate-50">
              <strong className="block text-slate-800 mb-1 border-b pb-1">4. Distribusi Sub-Topik</strong>
              <div className="space-y-0.5">
                {Object.entries(categoryMap).slice(0, 3).map(([cat, count]) => (
                  <div key={cat} className="flex justify-between text-[11px] truncate">
                    <span className="truncate pr-1">{cat}:</span>
                    <span className="font-bold shrink-0">{count} Butir</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Matriks Kisi-Kisi Soal */}
        <div className="mb-8">
          <table className="w-full border-collapse border border-black text-[11px] leading-tight">
            <thead>
              <tr className="bg-slate-200 text-center font-bold">
                <th className="border border-black p-1.5 w-8">No</th>
                <th className="border border-black p-1.5 w-32">Elemen / Capaian Pembelajaran</th>
                <th className="border border-black p-1.5 w-28">Materi Pokok</th>
                <th className="border border-black p-1.5">Indikator Soal</th>
                <th className="border border-black p-1.5 w-12">Level</th>
                <th className="border border-black p-1.5 w-16">Bentuk</th>
                <th className="border border-black p-1.5 w-12">No. Soal</th>
                <th className="border border-black p-1.5 w-12">Bobot</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, idx) => (
                <tr key={q.id} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="border border-black p-1.5 text-center font-medium">{idx + 1}</td>
                  <td className="border border-black p-1.5 font-medium">{q.elemen}</td>
                  <td className="border border-black p-1.5">{q.category}</td>
                  <td className="border border-black p-1.5 text-justify">{q.indikator}</td>
                  <td className="border border-black p-1.5 text-center font-bold">{q.cognitiveLevel}</td>
                  <td className="border border-black p-1.5 text-center font-medium">
                    {q.type === 'pilihan_ganda' ? 'PG' : 'PGK Kategori'}
                  </td>
                  <td className="border border-black p-1.5 text-center font-bold">{q.originalNumber}</td>
                  <td className="border border-black p-1.5 text-center">{q.scoreWeight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature Box Resmi Kedinasan */}
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
