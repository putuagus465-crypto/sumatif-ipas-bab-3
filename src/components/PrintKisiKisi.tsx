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
      <div className="max-w-6xl mx-auto mb-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-700" />
          <span className="font-bold text-sm text-slate-900">
            Pratinjau Dokumen Kisi-Kisi Penulisan Soal Kurikulum Merdeka ({settings.subject} - {settings.className})
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
      <div className="max-w-6xl mx-auto bg-white p-8 sm:p-12 shadow-2xl rounded-2xl print:shadow-none print:p-0 print:m-0 text-slate-900 font-sans">
        {/* Kop Surat Kedinasan Resmi */}
        <div className="border-b-4 border-double border-black pb-4 mb-5 text-center">
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
              Mata Pelajaran: {settings.subject} • Tingkat: {settings.className} (Sekolah Dasar) • Kurikulum Merdeka
            </p>
            <p className="text-xs text-slate-600">
              Lingkup Materi: {settings.topic}
            </p>
          </div>
        </div>

        {/* Identitas Kedinasan */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-5 border border-black p-3 rounded-lg bg-slate-50">
          <div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600 font-medium">Satuan Pendidikan</span>
              <span className="col-span-2 font-bold">: {settings.schoolName}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600 font-medium">Mata Pelajaran</span>
              <span className="col-span-2 font-bold">: {settings.subject}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600 font-medium">Kelas / Fase</span>
              <span className="col-span-2 font-bold">: {settings.className} / Fase B</span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600 font-medium">Jumlah Butir Soal</span>
              <span className="col-span-2 font-bold">: {totalQuestions} Butir ({pgCount} PG + {kategoriCount} PGK Kategori)</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600 font-medium">Alokasi Waktu</span>
              <span className="col-span-2 font-bold">: 60 Menit</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="text-slate-600 font-medium">Kriteria KKTP</span>
              <span className="col-span-2 font-bold">: {settings.kktp} Poin</span>
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS: DISTRIBUSI KISI-KISI SOAL */}
        <div className="mb-6 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Kartu Ringkasan Distribusi Kisi-Kisi Soal (Otomatis):
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {/* Bentuk Soal */}
            <div className="border border-slate-300 p-2.5 rounded-lg bg-slate-50">
              <strong className="block text-slate-800 mb-1 border-b pb-1">1. Distribusi Bentuk Soal</strong>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>Pilihan Ganda (PG):</span>
                  <span className="font-bold">{pgCount} ({Math.round((pgCount / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>PGK Kategori (B/S):</span>
                  <span className="font-bold">{kategoriCount} ({Math.round((kategoriCount / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex justify-between font-bold pt-1 border-t text-slate-900">
                  <span>Total Soal:</span>
                  <span>{totalQuestions} Butir</span>
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

            {/* Distribusi Elemen / Materi Pokok */}
            <div className="border border-slate-300 p-2.5 rounded-lg bg-slate-50">
              <strong className="block text-slate-800 mb-1 border-b pb-1">4. Distribusi Materi Pokok</strong>
              <div className="space-y-0.5">
                {Object.entries(categoryMap).map(([cat, count]) => (
                  <div key={cat} className="flex justify-between text-[11px] truncate">
                    <span className="truncate pr-1">{cat}:</span>
                    <span className="font-bold shrink-0">{count} Butir</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Matriks Kisi-Kisi Soal Kurikulum Merdeka */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse border border-black text-[10.5px] leading-tight">
            <thead>
              <tr className="bg-slate-200 text-center font-bold">
                <th className="border border-black p-1.5 w-10">No. Soal</th>
                <th className="border border-black p-1.5 w-36 text-left">Elemen / Capaian Pembelajaran (CP)</th>
                <th className="border border-black p-1.5 w-40 text-left">Tujuan Pembelajaran (TP)</th>
                <th className="border border-black p-1.5 text-left">Materi Pokok &amp; Indikator Soal</th>
                <th className="border border-black p-1.5 w-16 text-center">Level Kognitif</th>
                <th className="border border-black p-1.5 w-20 text-center">Bentuk Soal</th>
                <th className="border border-black p-1.5 w-32 text-left">Kunci Jawaban &amp; Bobot</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, idx) => {
                // Formatting answer key string
                let keyText = '';
                if (q.type === 'pilihan_ganda' && q.options && q.correctAnswer !== undefined) {
                  const letter = String.fromCharCode(65 + q.correctAnswer);
                  keyText = `Opsi ${letter} (${q.options[q.correctAnswer]})`;
                } else if (q.type === 'kategori' && q.statements) {
                  keyText = q.statements
                    .map((s, sIdx) => `${sIdx + 1}:${s.correctAnswer === 'Benar' ? 'B' : 'S'}`)
                    .join(', ');
                }

                return (
                  <tr key={q.id} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="border border-black p-1.5 text-center font-bold text-slate-900">
                      {q.originalNumber}
                    </td>
                    <td className="border border-black p-1.5 align-top">
                      <strong className="block text-slate-800 mb-0.5">{q.elemen}</strong>
                      <span className="text-slate-600 text-[10px] leading-relaxed block">{q.capaianPembelajaran}</span>
                    </td>
                    <td className="border border-black p-1.5 align-top text-slate-700 text-[10px] leading-relaxed">
                      {q.tujuanPembelajaran || 'Peserta didik menguasai konsep esensial materi.'}
                    </td>
                    <td className="border border-black p-1.5 align-top">
                      <span className="font-bold text-blue-900 block mb-0.5">{q.category}</span>
                      <span className="text-slate-700 text-[10px] leading-relaxed">{q.indikator}</span>
                    </td>
                    <td className="border border-black p-1.5 text-center font-bold align-top">
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 inline-block text-[10px]">
                        {q.cognitiveLevel}
                      </span>
                      <span className="block text-[9px] text-slate-500 font-normal mt-0.5">
                        {q.cognitiveLevel === 'L1' ? 'Pemahaman' : q.cognitiveLevel === 'L2' ? 'Aplikasi' : 'Penalaran'}
                      </span>
                    </td>
                    <td className="border border-black p-1.5 text-center align-top font-medium">
                      <span className="block font-semibold">
                        {q.type === 'pilihan_ganda' ? 'Pilihan Ganda' : 'PGK Kategori'}
                      </span>
                      <span className="text-[9px] text-slate-500">
                        {q.type === 'pilihan_ganda' ? '(Tunggal)' : '(Benar/Salah)'}
                      </span>
                    </td>
                    <td className="border border-black p-1.5 align-top text-[10px]">
                      <div className="font-bold text-emerald-800 leading-snug">{keyText}</div>
                      <div className="text-slate-500 text-[9px] mt-0.5 font-semibold">Bobot: {q.scoreWeight} Poin</div>
                    </td>
                  </tr>
                );
              })}
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
