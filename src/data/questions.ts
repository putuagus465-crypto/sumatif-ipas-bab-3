import { Question } from '../types';

// High quality educational SVG Visual Assets for Questions
const SVG_ICONS = {
  // Bagan Siklus Hidup Manusia (6 Tahap Lengkap)
  siklusHidup: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180" width="100%" height="100%">
      <rect width="640" height="180" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <g transform="translate(10, 20)">
        <!-- Tahap 1: Bayi -->
        <rect x="10" y="20" width="85" height="100" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="52.5" cy="55" r="20" fill="#bfdbfe"/>
        <text x="52.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">👶</text>
        <text x="52.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">1. Bayi</text>
        <text x="52.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">0 - 1 Tahun</text>
        
        <!-- Tahap 2: Balita -->
        <rect x="115" y="20" width="85" height="100" rx="12" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
        <circle cx="157.5" cy="55" r="20" fill="#bbf7d0"/>
        <text x="157.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">🧒</text>
        <text x="157.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#166534" text-anchor="middle">2. Balita</text>
        <text x="157.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">1 - 5 Tahun</text>
        
        <!-- Tahap 3: Anak-anak -->
        <rect x="220" y="20" width="95" height="100" rx="12" fill="#fefce8" stroke="#eab308" stroke-width="2"/>
        <circle cx="267.5" cy="55" r="20" fill="#fef08a"/>
        <text x="267.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">👦</text>
        <text x="267.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#854d0e" text-anchor="middle">3. Anak-anak</text>
        <text x="267.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">6 - 11 Tahun</text>
        
        <!-- Tahap 4: Remaja -->
        <rect x="335" y="20" width="85" height="100" rx="12" fill="#faf5ff" stroke="#a855f7" stroke-width="2"/>
        <circle cx="377.5" cy="55" r="20" fill="#e9d5ff"/>
        <text x="377.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">🧑</text>
        <text x="377.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6b21a8" text-anchor="middle">4. Remaja</text>
        <text x="377.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">12 - 18 Tahun</text>

        <!-- Tahap 5: Dewasa -->
        <rect x="440" y="20" width="85" height="100" rx="12" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
        <circle cx="482.5" cy="55" r="20" fill="#fed7aa"/>
        <text x="482.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">👨</text>
        <text x="482.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#9a3412" text-anchor="middle">5. Dewasa</text>
        <text x="482.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">19 - 59 Tahun</text>

        <!-- Tahap 6: Lansia -->
        <rect x="545" y="20" width="75" height="100" rx="12" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
        <circle cx="582.5" cy="55" r="16" fill="#e2e8f0"/>
        <text x="582.5" y="60" font-family="sans-serif" font-size="16" text-anchor="middle">👴</text>
        <text x="582.5" y="95" font-family="sans-serif" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">6. Lansia</text>
        <text x="582.5" y="110" font-family="sans-serif" font-size="8.5" fill="#64748b" text-anchor="middle">&gt;= 60 Tahun</text>
      </g>
    </svg>
  `)}`,

  // Denah Ragam Ruangan di Rumah
  denahRumah: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 260" width="100%" height="100%">
      <rect width="560" height="260" rx="16" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>
      <text x="280" y="24" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Denah Tata Ruangan Rumah Sehat</text>
      
      <!-- Garasi (Kiri Bawah) -->
      <g transform="translate(20, 140)">
        <rect width="160" height="100" fill="#f1f5f9" stroke="#64748b" stroke-width="2" rx="8"/>
        <text x="80" y="42" font-family="sans-serif" font-size="24" text-anchor="middle">🚗🛵</text>
        <text x="80" y="68" font-family="sans-serif" font-size="12" font-weight="bold" fill="#334155" text-anchor="middle">Garasi</text>
        <text x="80" y="85" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Tempat Kendaraan</text>
      </g>

      <!-- Ruang Tamu (Kiri Atas) -->
      <g transform="translate(20, 35)">
        <rect width="160" height="95" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" rx="8"/>
        <text x="80" y="38" font-family="sans-serif" font-size="22" text-anchor="middle">🛋️🪴</text>
        <text x="80" y="62" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Ruang Tamu</text>
        <text x="80" y="79" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">Menerima Kunjungan</text>
      </g>

      <!-- Ruang Makan (Tengah Atas) -->
      <g transform="translate(190, 35)">
        <rect width="180" height="95" fill="#fefce8" stroke="#eab308" stroke-width="2" rx="8"/>
        <text x="90" y="38" font-family="sans-serif" font-size="22" text-anchor="middle">🍽️🪑</text>
        <text x="90" y="62" font-family="sans-serif" font-size="12" font-weight="bold" fill="#854d0e" text-anchor="middle">Ruang Makan</text>
        <text x="90" y="79" font-family="sans-serif" font-size="9" fill="#713f12" text-anchor="middle">Makan Bersama Keluarga</text>
      </g>

      <!-- Kamar Tidur (Tengah Bawah) -->
      <g transform="translate(190, 140)">
        <rect width="180" height="100" fill="#fdf2f8" stroke="#ec4899" stroke-width="2" rx="8"/>
        <text x="90" y="42" font-family="sans-serif" font-size="22" text-anchor="middle">🛏️🧸</text>
        <text x="90" y="68" font-family="sans-serif" font-size="12" font-weight="bold" fill="#be185d" text-anchor="middle">Kamar Tidur</text>
        <text x="90" y="85" font-family="sans-serif" font-size="9" fill="#9d174d" text-anchor="middle">Istirahat &amp; Tidur</text>
      </g>

      <!-- Dapur (Kanan Atas) -->
      <g transform="translate(380, 35)">
        <rect width="160" height="95" fill="#fff7ed" stroke="#f97316" stroke-width="2" rx="8"/>
        <text x="80" y="38" font-family="sans-serif" font-size="22" text-anchor="middle">🍳🥘</text>
        <text x="80" y="62" font-family="sans-serif" font-size="12" font-weight="bold" fill="#c2410c" text-anchor="middle">Dapur</text>
        <text x="80" y="79" font-family="sans-serif" font-size="9" fill="#9a3412" text-anchor="middle">Memasak Makanan</text>
      </g>

      <!-- Kamar Mandi (Kanan Bawah) -->
      <g transform="translate(380, 140)">
        <rect width="160" height="100" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" rx="8"/>
        <text x="80" y="42" font-family="sans-serif" font-size="22" text-anchor="middle">🚿🧼</text>
        <text x="80" y="68" font-family="sans-serif" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">Kamar Mandi</text>
        <text x="80" y="85" font-family="sans-serif" font-size="9" fill="#166534" text-anchor="middle">Membersihkan Diri</text>
      </g>
    </svg>
  `)}`,

  // Kerjasama dan Peran Anggota Keluarga di Rumah
  peranKeluarga: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" width="100%" height="100%">
      <rect width="540" height="180" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
      <text x="270" y="24" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Kerjasama &amp; Pembagian Tugas Anggota Keluarga di Rumah</text>
      
      <!-- Ayah -->
      <g transform="translate(20, 42)">
        <rect width="115" height="120" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="57.5" y="40" font-family="sans-serif" font-size="28" text-anchor="middle">👨🔧</text>
        <text x="57.5" y="68" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">Ayah</text>
        <text x="57.5" y="84" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Kepala keluarga</text>
        <text x="57.5" y="98" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Mencari nafkah &amp;</text>
        <text x="57.5" y="110" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">merawat garasi</text>
      </g>

      <!-- Ibu -->
      <g transform="translate(150, 42)">
        <rect width="115" height="120" rx="10" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.5"/>
        <text x="57.5" y="40" font-family="sans-serif" font-size="28" text-anchor="middle">👩🍳</text>
        <text x="57.5" y="68" font-family="sans-serif" font-size="12" font-weight="bold" fill="#9d174d" text-anchor="middle">Ibu</text>
        <text x="57.5" y="84" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Mengurus rumah</text>
        <text x="57.5" y="98" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Menyiapkan masakan</text>
        <text x="57.5" y="110" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">&amp; mendidik anak</text>
      </g>

      <!-- Anak (Kakak & Adik) -->
      <g transform="translate(280, 42)">
        <rect width="115" height="120" rx="10" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5"/>
        <text x="57.5" y="40" font-family="sans-serif" font-size="28" text-anchor="middle">👦👧</text>
        <text x="57.5" y="68" font-family="sans-serif" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">Anak</text>
        <text x="57.5" y="84" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Belajar giat</text>
        <text x="57.5" y="98" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Merapikan kamar</text>
        <text x="57.5" y="110" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">&amp; patuh orang tua</text>
      </g>

      <!-- Kakek / Nenek -->
      <g transform="translate(410, 42)">
        <rect width="110" height="120" rx="10" fill="#fefce8" stroke="#eab308" stroke-width="1.5"/>
        <text x="55" y="40" font-family="sans-serif" font-size="28" text-anchor="middle">👵👴</text>
        <text x="55" y="68" font-family="sans-serif" font-size="12" font-weight="bold" fill="#854d0e" text-anchor="middle">Kakek &amp; Nenek</text>
        <text x="55" y="84" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Anggota sesepuh</text>
        <text x="55" y="98" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">Dihormati &amp;</text>
        <text x="55" y="110" font-family="sans-serif" font-size="8.5" fill="#475569" text-anchor="middle">disayangi cucu</text>
      </g>
    </svg>
  `)}`,

  // Peralatan Kebersihan dan Keamanan Rumah
  kebersihanRumah: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" width="100%" height="100%">
      <rect width="500" height="150" rx="14" fill="#ecfeff" stroke="#06b6d4" stroke-width="2"/>
      <text x="250" y="24" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0e7490" text-anchor="middle">Perawatan Ruangan &amp; Keselamatan Anggota Keluarga di Rumah</text>
      
      <g transform="translate(30, 40)">
        <rect width="125" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="62.5" y="38" font-family="sans-serif" font-size="24" text-anchor="middle">🧹🗑️</text>
        <text x="62.5" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e293b" text-anchor="middle">Sapu &amp; Pel</text>
        <text x="62.5" y="82" font-family="sans-serif" font-size="8.5" fill="#64748b" text-anchor="middle">Lantai bersih &amp; higienis</text>
      </g>

      <g transform="translate(185, 40)">
        <rect width="130" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="65" y="38" font-family="sans-serif" font-size="24" text-anchor="middle">⚠️🔥</text>
        <text x="65" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">Kompor &amp; Pisau</text>
        <text x="65" y="82" font-family="sans-serif" font-size="8.5" fill="#64748b" text-anchor="middle">Hati-hati di area dapur</text>
      </g>

      <g transform="translate(345, 40)">
        <rect width="125" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="62.5" y="38" font-family="sans-serif" font-size="24" text-anchor="middle">🪟☀️</text>
        <text x="62.5" y="65" font-family="sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Ventilasi Udara</text>
        <text x="62.5" y="82" font-family="sans-serif" font-size="8.5" fill="#64748b" text-anchor="middle">Cahaya &amp; udara segar</text>
      </g>
    </svg>
  `)}`
};

export const INITIAL_QUESTIONS: Question[] = [
  // =========================================================================
  // BAGIAN 1: PILIHAN GANDA (20 SOAL: NOMOR 1 s.d. 20)
  // Lingkup materi:
  // 1. Siklus Hidup Manusia (bayi, balita, anak-anak, remaja, dewasa, lansia)
  // 2. Ragam Ruangan di Rumah (ruang tamu, kamar tidur, dapur, ruang makan, kamar mandi, garasi)
  // 3. Peran Anggota Keluarga di Lingkungan Rumah
  // =========================================================================

  // --- SIKLUS HIDUP MANUSIA (Soal 1 s.d. 7) ---
  {
    id: 'pg-1',
    originalNumber: 1,
    type: 'pilihan_ganda',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi tahapan siklus hidup manusia secara berurutan mulai dari lahir hingga lanjut usia.',
    indikator: 'Disajikan bagan siklus hidup manusia, siswa dapat mengidentifikasi tahapan awal kehidupan manusia setelah lahir.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Perhatikan bagan siklus hidup manusia berikut ini!\nTahapan pertama kehidupan manusia yang dimulai sesaat setelah dilahirkan oleh ibu hingga berusia 1 tahun disebut masa ...',
    imageUrl: SVG_ICONS.siklusHidup,
    imageCaption: 'Bagan 6 Tahapan Siklus Hidup Manusia',
    options: ['Balita', 'Bayi', 'Anak-anak', 'Remaja'],
    correctAnswer: 1,
    explanation: 'Tahap pertama setelah manusia lahir ke dunia adalah masa bayi (usia 0 hingga 1 tahun).'
  },
  {
    id: 'pg-2',
    originalNumber: 2,
    type: 'pilihan_ganda',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi karakteristik tahapan balita pada siklus hidup manusia.',
    indikator: 'Siswa dapat menentukan rentang usia manusia yang tergolong ke dalam masa balita (bawah lima tahun).',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Adik Wayan sudah mulai lancar berjalan dan belajar menyebutkan kata-kata sederhana. Adik Wayan berusia 3 tahun, yang berarti ia berada pada tahapan ...',
    options: ['Bayi baru lahir', 'Balita (Bawah Lima Tahun)', 'Remaja', 'Dewasa'],
    correctAnswer: 1,
    explanation: 'Masa balita (bawah lima tahun) berlangsung antara usia 1 hingga 5 tahun, di mana anak mulai belajar berjalan dan berbicara.'
  },
  {
    id: 'pg-3',
    originalNumber: 3,
    type: 'pilihan_ganda',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi ciri-ciri fisik dan kemandirian pada masa anak-anak.',
    indikator: 'Siswa dapat mengidentifikasi peristiwa tanggalnya gigi susu yang terjadi pada masa anak-anak usia sekolah dasar.',
    cognitiveLevel: 'L1',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Pada tahapan masa anak-anak (usia sekitar 6 sampai 11 tahun) seperti siswa kelas 3 SD, peristiwa fisik alami yang umumnya dialami adalah ...',
    options: [
      'Gigi susu mulai tanggal dan digantikan oleh gigi permanen (gigi tetap)',
      'Pertumbuhan tinggi badan telah berhenti total',
      'Rambut seluruhnya memutih (beruban)',
      'Hanya bisa minum air susu ibu tanpa makanan lain'
    ],
    correctAnswer: 0,
    explanation: 'Pada masa anak-anak usia 6-11 tahun, gigi susu mulai tanggal secara bertahap dan digantikan oleh gigi tetap/permanen.'
  },
  {
    id: 'pg-4',
    originalNumber: 4,
    type: 'pilihan_ganda',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi masa remaja dan pubertas dalam daur hidup manusia.',
    indikator: 'Siswa dapat menjelaskan tahapan peralihan dari masa anak-anak menuju masa dewasa.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Masa peralihan dari masa anak-anak menuju masa dewasa yang ditandai dengan perubahan fisik pubertas disebut masa ...',
    options: ['Bayi', 'Balita', 'Remaja', 'Lanjut Usia (Lansia)'],
    correctAnswer: 2,
    explanation: 'Masa remaja (usia 12 - 18 tahun) merupakan masa transisi atau peralihan dari anak-anak menuju dewasa dengan ciri perubahan pubertas.'
  },
  {
    id: 'pg-5',
    originalNumber: 5,
    type: 'pilihan_ganda',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi karakteristik masa dewasa pada manusia.',
    indikator: 'Siswa dapat menentukan ciri utama masa dewasa dalam hal pertumbuhan dan peran tanggung jawab.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Ayah dan ibu di rumah bekerja mencari nafkah dan mengasuh anak-anaknya dengan penuh kasih sayang. Pada siklus hidup manusia, ayah dan ibu berada pada tahap ...',
    options: ['Masa balita', 'Masa anak-anak', 'Masa dewasa', 'Masa bayi'],
    correctAnswer: 2,
    explanation: 'Masa dewasa (sekitar usia 19-59 tahun) adalah tahap kematangan berpikir, organ tubuh telah matang sempurna, dan memiliki tanggung jawab bekerja serta berkeluarga.'
  },
  {
    id: 'pg-6',
    originalNumber: 6,
    type: 'pilihan_ganda',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi ciri-ciri masa lanjut usia (lansia).',
    indikator: 'Disajikan deskripsi perubahan fisik kakek/nenek, siswa dapat mengaitkannya dengan tahap lanjut usia.',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Kakek memiliki rambut yang telah memutih (beruban), kulit yang mulai keriput, serta memerlukan kacamata saat membaca koran. Hal ini menandakan bahwa Kakek telah memasuki tahapan ...',
    options: ['Remaja', 'Balita', 'Anak-anak', 'Lanjut Usia (Lansia)'],
    correctAnswer: 3,
    explanation: 'Ciri-ciri fisik seperti rambut beruban, kulit keriput, dan penurunan daya fungsi tubuh adalah ciri alami manusia pada masa lanjut usia (lansia, umumnya 60 tahun ke atas).'
  },
  {
    id: 'pg-7',
    originalNumber: 7,
    type: 'pilihan_ganda',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengurutkan tahapan siklus hidup manusia dengan tepat.',
    indikator: 'Siswa dapat menentukan urutan daur hidup manusia dari awal hingga akhir dengan benar.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Urutan tahapan siklus hidup manusia yang benar dari awal kelahiran sampai akhir kehidupan adalah ...',
    imageUrl: SVG_ICONS.siklusHidup,
    imageCaption: 'Urutan Siklus Hidup Manusia',
    options: [
      'Bayi → Anak-anak → Balita → Dewasa → Remaja → Lansia',
      'Bayi → Balita → Anak-anak → Remaja → Dewasa → Lanjut Usia (Lansia)',
      'Balita → Bayi → Remaja → Anak-anak → Dewasa → Lansia',
      'Anak-anak → Bayi → Balita → Remaja → Lansia → Dewasa'
    ],
    correctAnswer: 1,
    explanation: 'Urutan siklus hidup manusia yang benar: Bayi (0-1 th) → Balita (1-5 th) → Anak-anak (6-11 th) → Remaja (12-18 th) → Dewasa (19-59 th) → Lanjut Usia (>=60 th).'
  },

  // --- RAGAM RUANGAN DI RUMAH (Soal 8 s.d. 14) ---
  {
    id: 'pg-8',
    originalNumber: 8,
    type: 'pilihan_ganda',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi fungsi ruang tamu sebagai tempat menerima tamu di rumah.',
    indikator: 'Disajikan situasi bertamu, siswa dapat menentukan ruangan yang tepat di rumah untuk menyambut tamu.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Paman dan bibi datang berkunjung ke rumah Made. Ruangan di dalam rumah yang paling tepat digunakan untuk menyambut dan mempersilakan tamu duduk dengan sopan adalah ...',
    options: ['Kamar mandi', 'Kamar tidur', 'Ruang tamu', 'Garasi mobil'],
    correctAnswer: 2,
    explanation: 'Ruang tamu terletak di bagian depan rumah dan difungsikan secara khusus untuk menerima serta menjamu sanak saudara atau tamu yang berkunjung.'
  },
  {
    id: 'pg-9',
    originalNumber: 9,
    type: 'pilihan_ganda',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik menjelaskan fungsi kamar tidur bagi anggota keluarga.',
    indikator: 'Siswa dapat mengidentifikasi fungsi utama kamar tidur serta cara menjaga kerapiannya.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Setelah seharian belajar di sekolah dan bermain bersama teman, Ketut merasa lelah dan mengantuk. Ruangan di rumah yang berfungsi sebagai tempat beristirahat dan tidur nyenyak adalah ...',
    options: ['Kamar tidur', 'Dapur', 'Garasi', 'Ruang makan'],
    correctAnswer: 0,
    explanation: 'Kamar tidur adalah ruangan pribadi di rumah yang berfungsi untuk tempat tidur, beristirahat memulihkan tenaga, dan belajar pribadi.'
  },
  {
    id: 'pg-10',
    originalNumber: 10,
    type: 'pilihan_ganda',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik menganalisis fungsi dapur dan peralatan yang terdapat di dalamnya.',
    indikator: 'Disajikan denah rumah, siswa dapat menentukan fungsi ruangan dapur bagi pemenuhan kebutuhan pangan keluarga.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Perhatikan denah tata ruangan rumah di bawah ini!\nRuangan yang dilengkapi dengan peralatan kompor, wajan, panci, dan kulkas untuk mengolah bahan makanan menjadi masakan siap santap adalah ...',
    imageUrl: SVG_ICONS.denahRumah,
    imageCaption: 'Denah Tata Ruangan Rumah Sehat',
    options: ['Ruang tamu', 'Dapur', 'Kamar tidur', 'Garasi'],
    correctAnswer: 1,
    explanation: 'Dapur adalah ruangan yang digunakan untuk mengolah bahan pangan, memasak, dan menyiapkan aneka masakan sehat bagi seluruh keluarga.'
  },
  {
    id: 'pg-11',
    originalNumber: 11,
    type: 'pilihan_ganda',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi fungsi ruang makan dan adab makan bersama.',
    indikator: 'Siswa dapat menentukan fungsi ruang makan sebagai sarana mempererat kebersamaan keluarga saat santap makan.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Ruangan di rumah yang biasanya terdapat meja makan dan kursi makan untuk berkumpul menikmati sarapan atau makan malam bersama keluarga disebut ...',
    options: ['Ruang makan', 'Garasi', 'Kamar mandi', 'Ruang tamu'],
    correctAnswer: 0,
    explanation: 'Ruang makan berfungsi sebagai tempat santap makan bersama seluruh anggota keluarga sehingga tercipta suasana kebersamaan yang hangat.'
  },
  {
    id: 'pg-12',
    originalNumber: 12,
    type: 'pilihan_ganda',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik menjelaskan fungsi kamar mandi dan pentingnya menjaga keselamatan di dalamnya.',
    indikator: 'Siswa dapat menentukan tindakan yang tepat untuk mencegah bahaya terpeleset di kamar mandi.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Kamar mandi berfungsi untuk membersihkan diri, mandi, dan buang air. Agar anggota keluarga seperti kakek dan adik tidak terpeleset saat berada di kamar mandi, hal yang harus selalu dijaga adalah ...',
    options: [
      'Menyiram lantai dengan air sabun dan membiarkannya licin',
      'Menyikat lantai kamar mandi secara rutin agar tidak berlumut dan licin',
      'Mematikan semua lampu hingga gelap gulita',
      'Menyimpan benda-benda tajam di lantai kamar mandi'
    ],
    correctAnswer: 1,
    explanation: 'Lantai kamar mandi harus rutin disikat bersih agar bebas dari lumut dan sisa sabun yang licin sehingga aman dan mencegah risiko terpeleset.'
  },
  {
    id: 'pg-13',
    originalNumber: 13,
    type: 'pilihan_ganda',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi fungsi garasi di rumah.',
    indikator: 'Siswa dapat menentukan kendaraan atau benda yang tepat diletakkan di garasi rumah.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Ayah baru saja pulang dari kantor mengendarai sepeda motor. Ruangan di rumah yang difungsikan khusus sebagai tempat memarkir dan menyimpan sepeda motor, mobil, atau sepeda adalah ...',
    options: ['Ruang tamu', 'Kamar tidur', 'Garasi', 'Ruang makan'],
    correctAnswer: 2,
    explanation: 'Garasi adalah ruangan atau bagian rumah yang digunakan khusus untuk memarkir dan menyimpan kendaraan bermotor maupun sepeda agar aman dari cuaca dan pencurian.'
  },
  {
    id: 'pg-14',
    originalNumber: 14,
    type: 'pilihan_ganda',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik menganalisis aturan keselamatan saat berada di dapur rumah.',
    indikator: 'Disajikan gambar peralatan dapur dan kebersihan, siswa dapat menentukan sikap hati-hati terhadap benda berbahaya di dapur.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Perhatikan gambar perlengkapan dan keamanan rumah berikut ini!\nKetika berada di area dapur, anak kelas 3 SD tidak boleh bermain-main dengan kompor gas dan pisau dapur karena ...',
    imageUrl: SVG_ICONS.kebersihanRumah,
    imageCaption: 'Keamanan dan Kebersihan Ruangan Rumah',
    options: [
      'Pisau dan api kompor dapat menyebabkan luka sayat atau kebakaran berbahaya',
      'Dapur adalah tempat khusus untuk tidur siang',
      'Kompor gas dapat digunakan sebagai mainan balon',
      'Ibu akan senang jika kompor dinyalakan sembarangan'
    ],
    correctAnswer: 0,
    explanation: 'Kompor dan pisau di dapur merupakan benda yang berisiko bahaya (panas/tajam), sehingga anak harus berhati-hati dan selalu di bawah pengawasan orang tua.'
  },

  // --- PERAN ANGGOTA KELUARGA DI RUMAH (Soal 15 s.d. 20) ---
  {
    id: 'pg-15',
    originalNumber: 15,
    type: 'pilihan_ganda',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi peran dan tanggung jawab ayah di lingkungan rumah.',
    indikator: 'Siswa dapat menentukan kedudukan dan kewajiban utama seorang ayah sebagai kepala keluarga.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Dalam susunan anggota keluarga di rumah, ayah berperan sebagai kepala keluarga yang memiliki kewajiban utama untuk ...',
    options: [
      'Hanya bermain ponsel sepanjang hari tanpa bekerja',
      'Mencari nafkah, melindungi, dan memimpin keluarga dengan bijaksana',
      'Menyerahkan semua pekerjaan rumah kepada anak kecil',
      'Tidur terus-menerus di kamar tamu'
    ],
    correctAnswer: 1,
    explanation: 'Sebagai kepala keluarga, ayah bertanggung jawab mencari nafkah untuk mencukupi kebutuhan keluarga, menjadi teladan, serta melindungi seluruh anggota keluarga.'
  },
  {
    id: 'pg-16',
    originalNumber: 16,
    type: 'pilihan_ganda',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi peran dan tugas ibu di lingkungan rumah.',
    indikator: 'Siswa dapat menjelaskan peran ibu dalam merawat keluarga dan mengurus kebutuhan rumah tangga.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Ibu memiliki peran yang sangat mulia di rumah, antara lain mengurus rumah tangga, memasak makanan sehat, serta ...',
    options: [
      'Membiarkan anak tidak belajar dan membolos sekolah',
      'Mendidik, merawat, dan menyayangi anak-anak dengan tulus',
      'Melarang anak makan makanan bergizi',
      'Menyuruh anak tinggal di luar rumah'
    ],
    correctAnswer: 1,
    explanation: 'Peran ibu di rumah antara lain mendidik dan merawat anak, mengelola urusan rumah tangga, serta menciptakan suasana rumah yang penuh kasih sayang.'
  },
  {
    id: 'pg-17',
    originalNumber: 17,
    type: 'pilihan_ganda',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik menganalisis kewajiban dan tanggung jawab anak di rumah.',
    indikator: 'Siswa dapat memilih contoh perilaku anak yang menjalankan kewajibannya di rumah setelah bangun tidur.',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Setiap pagi setelah bangun tidur di kamar tidurnya, tindakan yang menunjukkan pelaksanaan kewajiban dan kemandirian anak adalah ...',
    options: [
      'Membiarkan selimut dan bantal berantakan di lantai',
      'Merapikan tempat tidur, melipat selimut, dan meletakkan bantal pada tempatnya',
      'Menangis meminta ibu membereskan semua kasurnya',
      'Langsung bermain sepeda keluar tanpa mandi'
    ],
    correctAnswer: 1,
    explanation: 'Merapikan tempat tidur sendiri setelah bangun merupakan salah satu wujud kewajiban anak dalam menjaga kerapian rumah dan melatih kemandirian.'
  },
  {
    id: 'pg-18',
    originalNumber: 18,
    type: 'pilihan_ganda',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengevaluasi manfaat gotong royong dan kerjasama anggota keluarga di rumah.',
    indikator: 'Disajikan ilustrasi kerjasama keluarga, siswa dapat menyimpulkan manfaat membersihkan rumah secara bersama-sama.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Perhatikan gambar pembagian tugas keluarga berikut ini!\nPada hari Minggu, Ayah membersihkan halaman dan garasi, Ibu memasak di dapur, sedangkan Komang dan Kakak membantu menyapu lantai ruang tamu. Manfaat dari kegiatan kerjasama ini adalah ...',
    imageUrl: SVG_ICONS.peranKeluarga,
    imageCaption: 'Kerjasama Anggota Keluarga di Lingkungan Rumah',
    options: [
      'Pekerjaan rumah menjadi terasa lebih berat dan melelahkan',
      'Anggota keluarga menjadi sering bertengkar satu sama lain',
      'Pekerjaan rumah tangga cepat selesai dan hubungan keluarga menjadi semakin rukun',
      'Rumah menjadi semakin berdebu dan berantakan'
    ],
    correctAnswer: 2,
    explanation: 'Gotong royong dan saling membantu antaranggota keluarga membuat pekerjaan rumah yang berat menjadi ringan, cepat selesai, serta menumbuhkan kerukunan.'
  },
  {
    id: 'pg-19',
    originalNumber: 19,
    type: 'pilihan_ganda',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi sikap santun kepada kakek dan nenek yang tinggal di rumah.',
    indikator: 'Siswa dapat memilih sikap hormat dan kasih sayang yang patut ditunjukkan kepada kakek/nenek.',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Jika kakek atau nenek tinggal bersama kita di rumah, sikap yang paling terpuji yang harus ditunjukkan oleh seorang anak adalah ...',
    options: [
      'Berbicara dengan nada membentak dan kasar kepada kakek',
      'Menghormati, berbicara santun, dan siap membantu saat kakek atau nenek membutuhkan bantuan',
      'Mengabaikan kakek dan nenek yang sedang duduk sendirian',
      'Mengambil kacamata kakek untuk mainan sembunyi-sembunyian'
    ],
    correctAnswer: 1,
    explanation: 'Kakek dan nenek adalah orang tua dari ayah atau ibu yang harus dihormati, disayangi, dan diperlakukan dengan sopan santun serta penuh kasih sayang.'
  },
  {
    id: 'pg-20',
    originalNumber: 20,
    type: 'pilihan_ganda',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik membedakan antara hak dan kewajiban anak di lingkungan keluarga.',
    indikator: 'Siswa dapat menentukan hak yang berhak diterima anak dari orang tuanya di rumah.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Di samping memiliki kewajiban untuk belajar dan membantu orang tua, seorang anak juga berhak mendapatkan ...',
    options: [
      'Hukuman setiap hari tanpa alasan yang jelas',
      'Kasih sayang, bimbingan, makanan bergizi, dan tempat tinggal yang aman dari orang tua',
      'Tuntutan untuk bekerja mencari uang nafkah keluarga',
      'Kewajiban mengerjakan semua pekerjaan rumah tangga sendirian'
    ],
    correctAnswer: 1,
    explanation: 'Hak anak di rumah antara lain mendapatkan kasih sayang, perlindungan, tempat tinggal yang layak, makanan sehat, serta kesempatan untuk belajar dan bermain.'
  },

  // =========================================================================
  // BAGIAN 2: PILIHAN GANDA KOMPLEKS KATEGORI (10 SOAL: NOMOR 21 s.d. 30)
  // Setiap butir memuat tepat 3 deskripsi/pernyataan yang harus direspons Benar atau Salah!
  // =========================================================================

  // Soal 21: Siklus Hidup Manusia (Bayi dan Balita)
  {
    id: 'pgk-21',
    originalNumber: 21,
    type: 'kategori',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik membedakan ciri-ciri tahap bayi dan balita dalam siklus hidup manusia.',
    indikator: 'Disajikan 3 pernyataan tentang tahap bayi dan balita, siswa dapat menentukan kebenaran tiap pernyataan (Benar/Salah).',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 1,
    imageUrl: SVG_ICONS.siklusHidup,
    imageCaption: 'Tahap Bayi dan Balita pada Siklus Hidup',
    question: 'Perhatikan bagan siklus hidup manusia! Tentukan apakah setiap pernyataan mengenai tahapan "Bayi dan Balita" berikut ini BENAR atau SALAH!',
    explanation: 'Bayi (0-1 tahun) sangat bergantung pada orang tua dan mengonsumsi ASI. Balita (1-5 tahun) mulai belajar berjalan dan berbicara.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-21-1',
        text: 'Bayi yang baru lahir sangat bergantung pada orang tua untuk makan dan belum mampu berjalan sendiri.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-21-2',
        text: 'Pada masa balita (usia 1 sampai 5 tahun), anak mulai belajar berjalan, berlari kecil, dan berbicara kata-kata sederhana.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-21-3',
        text: 'Bayi yang baru berusia 2 bulan sudah dapat langsung disuruh menyiapkan pakaian dan seragam sekolahnya sendiri.',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 22: Siklus Hidup Manusia (Anak-anak dan Remaja)
  {
    id: 'pgk-22',
    originalNumber: 22,
    type: 'kategori',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi perubahan pada masa anak-anak menuju masa remaja.',
    indikator: 'Disajikan 3 pernyataan tentang ciri anak-anak dan remaja, siswa dapat menentukan kebenarannya.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai tahapan "Anak-Anak dan Remaja" berikut ini BENAR atau SALAH!',
    explanation: 'Masa anak-anak adalah usia sekolah dasar. Masa remaja mengalami pubertas dengan pertumbuhan fisik yang cepat.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-22-1',
        text: 'Siswa kelas 3 SD yang berusia sekitar 8 sampai 9 tahun berada pada tahapan masa anak-anak.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-22-2',
        text: 'Masa remaja merupakan masa peralihan dari anak-anak menuju dewasa yang ditandai dengan perubahan fisik masa pubertas.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-22-3',
        text: 'Masa remaja dilalui manusia setelah mereka melewati usia lanjut (lansia).',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 23: Siklus Hidup Manusia (Dewasa dan Lanjut Usia)
  {
    id: 'pgk-23',
    originalNumber: 23,
    type: 'kategori',
    category: 'Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi ciri-ciri tahap dewasa dan lanjut usia.',
    indikator: 'Disajikan 3 pernyataan tentang tahap dewasa dan lansia, siswa dapat menganalisis kebenarannya.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai tahapan "Dewasa dan Lanjut Usia (Lansia)" berikut ini BENAR atau SALAH!',
    explanation: 'Masa dewasa pertumbuhan tinggi badan berhenti dan siap bekerja. Pada lansia terjadi penurunan fisik alami (uban, keriput).',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-23-1',
        text: 'Pada masa dewasa, manusia umumnya telah memiliki kematangan fisik dan tanggung jawab untuk bekerja mencari nafkah.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-23-2',
        text: 'Rambut yang memutih (beruban) dan kulit yang mulai keriput adalah ciri fisik yang umum terjadi pada masa lanjut usia (lansia).',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-23-3',
        text: 'Tinggi badan manusia pada masa lanjut usia akan terus bertambah semakin tinggi melebihi pohon kelapa.',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 24: Ragam Ruangan di Rumah (Ruang Tamu, Kamar Tidur, Ruang Makan)
  {
    id: 'pgk-24',
    originalNumber: 24,
    type: 'kategori',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik membedakan fungsi ruang tamu, kamar tidur, dan ruang makan di rumah.',
    indikator: 'Disajikan 3 pernyataan tentang fungsi ruangan di rumah, siswa dapat memvalidasi kebenarannya.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    imageUrl: SVG_ICONS.denahRumah,
    imageCaption: 'Denah Ruangan Rumah',
    question: 'Perhatikan denah ruangan rumah! Tentukan apakah setiap pernyataan mengenai fungsi ruangan berikut ini BENAR atau SALAH!',
    explanation: 'Ruang tamu untuk menerima tamu, kamar tidur untuk istirahat, dan ruang makan untuk santap makan bersama.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-24-1',
        text: 'Ruang tamu berfungsi sebagai tempat untuk menyambut dan mempersilakan tamu yang berkunjung ke rumah.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-24-2',
        text: 'Kamar tidur adalah tempat pribadi yang digunakan untuk beristirahat, tidur nyenyak, dan belajar mandiri.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-24-3',
        text: 'Ruang makan adalah tempat khusus di rumah yang digunakan untuk mencuci pakaian dan memarkir mobil.',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 25: Ragam Ruangan di Rumah (Dapur, Kamar Mandi, Garasi)
  {
    id: 'pgk-25',
    originalNumber: 25,
    type: 'kategori',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik membedakan fungsi dapur, kamar mandi, dan garasi kendaraan.',
    indikator: 'Disajikan 3 pernyataan tentang fungsi dapur, kamar mandi, dan garasi, siswa dapat mengevaluasi kebenarannya.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai fungsi ruangan "Dapur, Kamar Mandi, dan Garasi" berikut ini BENAR atau SALAH!',
    explanation: 'Dapur untuk memasak, kamar mandi untuk membersihkan diri, garasi untuk memarkir kendaraan.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-25-1',
        text: 'Dapur difungsikan sebagai ruangan untuk mengolah bahan makanan dan memasak sajian keluarga.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-25-2',
        text: 'Garasi digunakan sebagai tempat untuk memarkir serta menyimpan sepeda, sepeda motor, atau mobil agar aman.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-25-3',
        text: 'Kamar mandi adalah tempat yang tepat untuk menyalakan api unggun dan memasak sayur sop.',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 26: Ragam Ruangan di Rumah (Kebersihan & Keselamatan Ruangan)
  {
    id: 'pgk-26',
    originalNumber: 26,
    type: 'kategori',
    category: 'Ragam Ruangan di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik menganalisis aturan menjaga kebersihan dan keselamatan di berbagai ruangan rumah.',
    indikator: 'Disajikan 3 aturan keselamatan ruangan rumah, siswa dapat menilai ketepatannya (Benar/Salah).',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    imageUrl: SVG_ICONS.kebersihanRumah,
    imageCaption: 'Pedoman Kebersihan dan Keamanan Ruangan',
    question: 'Tentukan apakah setiap pernyataan mengenai "Kebersihan dan Keselamatan Ruangan di Rumah" berikut ini BENAR atau SALAH!',
    explanation: 'Kebersihan ruangan menjaga kesehatan keluarga. Lantai licin di kamar mandi dan api kompor di dapur harus diwaspadai.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-26-1',
        text: 'Lantai kamar mandi harus rutin disikat agar tidak berlumut licin yang dapat membahayakan anggota keluarga.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-26-2',
        text: 'Membuka jendela kamar tidur di pagi hari membantu pergantian udara segar dan masuknya sinar matahari yang sehat.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-26-3',
        text: 'Meninggalkan piring dan gelas kotor menumpuk berhari-hari di dapur adalah cara terbaik menjaga kebersihan rumah.',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 27: Peran Anggota Keluarga di Rumah (Tanggung Jawab Ayah dan Ibu)
  {
    id: 'pgk-27',
    originalNumber: 27,
    type: 'kategori',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengidentifikasi peran ayah dan ibu dalam membina keharmonisan keluarga.',
    indikator: 'Disajikan 3 pernyataan tentang peran orang tua di rumah, siswa dapat menganalisis kebenarannya.',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 1,
    imageUrl: SVG_ICONS.peranKeluarga,
    imageCaption: 'Peran Orang Tua dan Anak di Rumah',
    question: 'Perhatikan gambar peran keluarga! Tentukan apakah setiap pernyataan mengenai "Peran Ayah dan Ibu di Rumah" berikut BENAR atau SALAH!',
    explanation: 'Ayah memimpin dan mencari nafkah. Ibu mengurus rumah tangga dan merawat anak. Keduanya bekerjasama membimbing keluarga.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-27-1',
        text: 'Ayah berperan sebagai kepala keluarga yang bertanggung jawab memimpin, menafkahi, dan melindungi anggota keluarga.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-27-2',
        text: 'Ibu berperan merawat anak-anak, mengelola kebutuhan rumah tangga, dan mendidik anak dengan penuh kasih sayang.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-27-3',
        text: 'Ayah dan ibu tidak perlu saling membantu karena tugas di rumah hanya boleh dikerjakan oleh satu orang saja.',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 28: Peran Anggota Keluarga di Rumah (Hak & Kewajiban Anak)
  {
    id: 'pgk-28',
    originalNumber: 28,
    type: 'kategori',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengevaluasi hak dan kewajiban anak di lingkungan rumah.',
    indikator: 'Disajikan 3 perilaku anak di rumah, siswa dapat menentukan kebenaran peran anak tersebut.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai "Hak dan Kewajiban Anak di Lingkungan Rumah" berikut ini BENAR atau SALAH!',
    explanation: 'Kewajiban anak: belajar, menghormati orang tua, membantu tugas rumah sesuai kemampuan. Hak anak: kasih sayang, sandang pangan, pendidikan.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-28-1',
        text: 'Belajar dengan tekun dan mematuhi nasehat baik dari orang tua merupakan kewajiban utama seorang anak di rumah.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-28-2',
        text: 'Membantu menyapu lantai atau mencuci piring sendiri setelah makan adalah wujud bakti anak dalam meringankan tugas orang tua.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-28-3',
        text: 'Seorang anak memiliki hak untuk membentak orang tua dan menolak mengerjakan pekerjaan sekolah.',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 29: Peran Anggota Keluarga di Rumah (Kerjasama & Gotong Royong)
  {
    id: 'pgk-29',
    originalNumber: 29,
    type: 'kategori',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik menerapkan nilai gotong royong dan kebersamaan di lingkungan keluarga.',
    indikator: 'Disajikan 3 kegiatan kerjasama keluarga, siswa dapat memvalidasi kebenarannya.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai "Kerjasama dan Kerukunan Anggota Keluarga" berikut ini BENAR atau SALAH!',
    explanation: 'Kerjasama menjaga rumah tetap bersih dan nyaman serta mempererat ikatan kasih sayang keluarga.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-29-1',
        text: 'Ketika rumah dibersihkan bersama-sama pada hari libur, suasana rumah menjadi bersih dan hubungan antarkeluarga semakin akrab.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-29-2',
        text: 'Kakak dan adik yang saling tolong-menolong serta tidak bertengkar saat belajar membuat orang tua merasa bahagia.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-29-3',
        text: 'Menumpuk sampah di halaman depan dan enggan membantu orang tua adalah contoh perilaku terpuji anak di rumah.',
        correctAnswer: 'Salah'
      }
    ]
  },

  // Soal 30: Peran Anggota Keluarga & Kakek Nenek
  {
    id: 'pgk-30',
    originalNumber: 30,
    type: 'kategori',
    category: 'Peran Anggota Keluarga di Rumah',
    elemen: 'Pemahaman IPAS',
    capaianPembelajaran: 'Peserta didik mengaitkan tahapan siklus hidup lansia dengan penghormatan cucu kepada kakek dan nenek di rumah.',
    indikator: 'Disajikan 3 pernyataan tentang peran dan kasih sayang kepada kakek/nenek, siswa dapat mengevaluasi kebenarannya.',
    cognitiveLevel: 'L3',
    difficulty: 'Sedang',
    scoreWeight: 1,
    imageUrl: SVG_ICONS.peranKeluarga,
    imageCaption: 'Menyayangi Anggota Keluarga di Rumah',
    question: 'Tentukan apakah setiap pernyataan mengenai "Sikap Terhadap Kakek dan Nenek di Rumah" berikut ini BENAR atau SALAH!',
    explanation: 'Kakek dan nenek berada pada tahap lanjut usia yang fisik/daya ingatnya mulai menurun, sehingga perlu diperlakukan dengan penuh kesabaran, cinta, dan hormat.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-30-1',
        text: 'Kakek dan nenek berada pada tahap lanjut usia yang perlu disayangi, diperhatikan kesehatannya, dan dihormati oleh cucu-cucunya.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-30-2',
        text: 'Membantu menuntun kakek berjalan atau mengambilkan air minum adalah contoh tindakan terpuji yang mencerminkan bakti anak.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-30-3',
        text: 'Kakek dan nenek yang sudah lanjut usia sebaiknya dipaksa bekerja mengangkat beban berat di kebun setiap hari.',
        correctAnswer: 'Salah'
      }
    ]
  }
];
