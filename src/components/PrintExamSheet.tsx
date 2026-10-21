import React from 'react';
import { Printer, X, FileText } from 'lucide-react';
import { Question, ExamSettings } from '../types';

interface PrintExamSheetProps {
  settings: ExamSettings;
  questions: Question[];
  withAnswers: boolean;
  onClose: () => void;
}

export const PrintExamSheet: React.FC<PrintExamSheetProps> = ({
  settings,
  questions,
  withAnswers,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const pgQuestions = questions.filter((q) => q.type === 'pilihan_ganda');
  const kategoriQuestions = questions.filter((q) => q.type === 'kategori');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs overflow-y-auto p-2 sm:p-6 print:p-0 print:bg-white print:static">
      {/* Top Floating Control Bar (hidden in print) */}
      <div className="max-w-4xl mx-auto mb-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-700" />
          <span className="font-bold text-sm text-slate-900">
            Pratinjau Naskah Soal {withAnswers ? '(Dengan Kunci Guru)' : '(Format Siswa)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-trigger-sheet-print"
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

      {/* A4 Paper Container */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-2xl rounded-2xl print:shadow-none print:p-0 print:m-0 text-slate-900 font-sans">
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
              Naskah Soal Tes Sumatif {settings.subject} — {settings.className}
            </h3>
            <p className="text-xs text-slate-700 font-semibold">
              Materi: {settings.topic} • Kurikulum Merdeka
            </p>
          </div>
        </div>

        {/* Student Identity Box on paper */}
        <div className="border border-black p-3 rounded-lg mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-slate-500 block">Nama Siswa:</span>
            <div className="border-b border-dotted border-black h-5 mt-1"></div>
          </div>
          <div>
            <span className="text-slate-500 block">Nomor Absen:</span>
            <div className="border-b border-dotted border-black h-5 mt-1"></div>
          </div>
          <div>
            <span className="text-slate-500 block">Hari / Tanggal:</span>
            <div className="border-b border-dotted border-black h-5 mt-1"></div>
          </div>
          <div>
            <span className="text-slate-500 block">Nilai / Paraf:</span>
            <div className="border-b border-dotted border-black h-5 mt-1"></div>
          </div>
        </div>

        {/* Petunjuk Pengerjaan */}
        <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg mb-6 text-xs text-slate-700">
          <strong>Petunjuk Umum:</strong>
          <ol className="list-decimal pl-4 mt-1 space-y-0.5">
            <li>Tuliskan identitas nama dan nomor absen pada kolom yang tersedia.</li>
            <li>Bacalah setiap butir soal dengan teliti dan cermat sebelum menjawab.</li>
            <li>Untuk Bagian I (Pilihan Ganda), berilah tanda silang (X) pada huruf A, B, C, atau D pada lembar jawaban.</li>
            <li>Untuk Bagian II (Kategori Benar/Salah), berilah tanda centang (✓) pada kolom Benar atau Salah sesuai setiap deskripsi pernyataan.</li>
          </ol>
        </div>

        {/* ========================================================= */}
        {/* SOAL-SOAL UJIAN (30 BUTIR TOTAL)                          */}
        {/* ========================================================= */}
        <div className="space-y-6 text-xs sm:text-sm">
          {/* BAGIAN I: PILIHAN GANDA (20 SOAL) */}
          <div>
            <div className="bg-slate-200 px-3 py-1.5 font-bold uppercase tracking-wider text-xs mb-4 rounded-md">
              Bagian I. Pilihan Ganda (Nomor 1 s.d. 20)
            </div>
            <p className="text-xs italic text-slate-600 mb-3">
              Petunjuk: Pilihlah salah satu jawaban yang paling tepat dengan memberi tanda silang (X) pada opsi A, B, C, atau D!
            </p>

            <div className="space-y-5">
              {pgQuestions.map((q) => (
                <div key={q.id} className="break-inside-avoid">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">{q.originalNumber}.</span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                        {q.question}
                      </p>

                      {/* Gambar ilustrasi jika ada */}
                      {q.imageUrl && (
                        <div className="my-2.5 max-w-md border border-slate-200 rounded-lg p-2 bg-slate-50/50">
                          <img
                            src={q.imageUrl}
                            alt={q.imageCaption || `Ilustrasi Soal ${q.originalNumber}`}
                            className="max-h-44 mx-auto object-contain"
                          />
                          {q.imageCaption && (
                            <p className="text-[10px] text-center text-slate-500 italic mt-1">
                              {q.imageCaption}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-2 pl-2">
                        {q.options?.map((opt, optIdx) => {
                          const optionLetter = String.fromCharCode(65 + optIdx);
                          const isCorrect = withAnswers && optIdx === q.correctAnswer;
                          return (
                            <div
                              key={optIdx}
                              className={`flex items-start gap-1.5 ${
                                isCorrect ? 'font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded' : ''
                              }`}
                            >
                              <span className="font-semibold">{optionLetter}.</span>
                              <span>{opt}</span>
                              {isCorrect && <span className="text-emerald-700 text-xs font-black ml-1">(KUNCI)</span>}
                            </div>
                          );
                        })}
                      </div>

                      {withAnswers && (
                        <div className="mt-2 text-[11px] text-slate-600 italic bg-blue-50/60 p-2 rounded border border-blue-100">
                          <strong>Pembahasan:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BAGIAN II: PILIHAN GANDA KOMPLEKS KATEGORI (10 SOAL) */}
          <div className="pt-4">
            <div className="bg-slate-200 px-3 py-1.5 font-bold uppercase tracking-wider text-xs mb-4 rounded-md">
              Bagian II. Pilihan Ganda Kompleks Kategori (Nomor 21 s.d. 30)
            </div>
            <p className="text-xs italic text-slate-600 mb-3">
              Petunjuk: Bacalah setiap pernyataan di bawah ini dengan seksama. Berikan tanda centang (✓) pada kolom <strong>Benar</strong> jika pernyataan sesuai, atau kolom <strong>Salah</strong> jika pernyataan tidak sesuai!
            </p>

            <div className="space-y-6">
              {kategoriQuestions.map((q) => (
                <div key={q.id} className="break-inside-avoid">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="font-bold text-slate-900">{q.originalNumber}.</span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                        {q.question}
                      </p>

                      {q.imageUrl && (
                        <div className="my-2 max-w-md border border-slate-200 rounded-lg p-2 bg-slate-50/50">
                          <img
                            src={q.imageUrl}
                            alt={q.imageCaption || `Ilustrasi Soal ${q.originalNumber}`}
                            className="max-h-40 mx-auto object-contain"
                          />
                          {q.imageCaption && (
                            <p className="text-[10px] text-center text-slate-500 italic mt-1">
                              {q.imageCaption}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pl-6">
                    <table className="w-full border-collapse border border-black text-xs">
                      <thead>
                        <tr className="bg-slate-100 font-semibold text-center">
                          <th className="border border-black p-1.5 text-left">Pernyataan Deskripsi</th>
                          <th className="border border-black p-1.5 w-20">Benar</th>
                          <th className="border border-black p-1.5 w-20">Salah</th>
                        </tr>
                      </thead>
                      <tbody>
                        {q.statements?.map((st) => (
                          <tr key={st.id}>
                            <td className="border border-black p-2">{st.text}</td>
                            <td className="border border-black p-2 text-center font-bold">
                              {withAnswers ? (st.correctAnswer === 'Benar' ? '✓' : '') : ''}
                            </td>
                            <td className="border border-black p-2 text-center font-bold">
                              {withAnswers ? (st.correctAnswer === 'Salah' ? '✓' : '') : ''}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {withAnswers && (
                      <div className="mt-1.5 text-[11px] text-slate-600 italic bg-amber-50/60 p-2 rounded border border-amber-200">
                        <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Signature Box */}
        <div className="mt-10 pt-6 border-t border-black flex justify-between text-xs break-inside-avoid">
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
