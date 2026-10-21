import { Question } from '../types';

// SVG Visual Assets for Questions (Data URIs for flawless offline rendering and sharp printing)
const SVG_ICONS = {
  // Bagan Siklus Hidup Manusia
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
        
        <path d="M 100 70 L 120 70" stroke="#94a3b8" stroke-width="3" marker-end="url(#arrow)"/>
        
        <!-- Tahap 2: Balita -->
        <rect x="125" y="20" width="85" height="100" rx="12" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
        <circle cx="167.5" cy="55" r="20" fill="#bbf7d0"/>
        <text x="167.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">🧒</text>
        <text x="167.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#166534" text-anchor="middle">2. Balita</text>
        <text x="167.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">1 - 5 Tahun</text>
        
        <!-- Tahap 3: Anak-anak -->
        <rect x="235" y="20" width="95" height="100" rx="12" fill="#fefce8" stroke="#eab308" stroke-width="2"/>
        <circle cx="282.5" cy="55" r="20" fill="#fef08a"/>
        <text x="282.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">👦</text>
        <text x="282.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#854d0e" text-anchor="middle">3. Anak-anak</text>
        <text x="282.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">6 - 11 Tahun</text>
        
        <!-- Tahap 4: Remaja -->
        <rect x="355" y="20" width="85" height="100" rx="12" fill="#faf5ff" stroke="#a855f7" stroke-width="2"/>
        <circle cx="397.5" cy="55" r="20" fill="#e9d5ff"/>
        <text x="397.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">🧑</text>
        <text x="397.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6b21a8" text-anchor="middle">4. Remaja</text>
        <text x="397.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">12 - 18 Tahun</text>

        <!-- Tahap 5: Dewasa -->
        <rect x="465" y="20" width="85" height="100" rx="12" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
        <circle cx="507.5" cy="55" r="20" fill="#fed7aa"/>
        <text x="507.5" y="60" font-family="sans-serif" font-size="20" text-anchor="middle">👨</text>
        <text x="507.5" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#9a3412" text-anchor="middle">5. Dewasa</text>
        <text x="507.5" y="110" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">19 - 59 Tahun</text>

        <!-- Tahap 6: Lansia -->
        <rect x="560" y="20" width="55" height="100" rx="12" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
        <circle cx="587.5" cy="55" r="16" fill="#e2e8f0"/>
        <text x="587.5" y="60" font-family="sans-serif" font-size="16" text-anchor="middle">👴</text>
        <text x="587.5" y="95" font-family="sans-serif" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">6. Lansia</text>
      </g>
    </svg>
  `)}`,

  // Grafik Pertumbuhan Tinggi Badan Bayi sampai SD
  grafikPertumbuhan: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220" width="100%" height="100%">
      <rect width="520" height="220" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="260" y="26" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Grafik Pertambahan Tinggi Badan Andi (Usia 0 s.d. 8 Tahun)</text>
      
      <!-- Sumbu Y -->
      <line x1="60" y1="40" x2="60" y2="180" stroke="#64748b" stroke-width="2"/>
      <!-- Sumbu X -->
      <line x1="60" y1="180" x2="480" y2="180" stroke="#64748b" stroke-width="2"/>
      
      <!-- Label Y (Tinggi cm) -->
      <text x="50" y="180" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="end">0</text>
      <text x="50" y="145" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="end">50 cm</text>
      <text x="50" y="110" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="end">85 cm</text>
      <text x="50" y="75" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="end">110 cm</text>
      <text x="50" y="45" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="end">130 cm</text>
      
      <!-- Grid lines horizontal -->
      <line x1="60" y1="145" x2="480" y2="145" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="60" y1="110" x2="480" y2="110" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="60" y1="75" x2="480" y2="75" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="60" y1="45" x2="480" y2="45" stroke="#f1f5f9" stroke-width="1"/>
      
      <!-- Batang Bar Usia -->
      <!-- 0 Tahun (Lahir: 50 cm) -->
      <rect x="90" y="145" width="40" height="35" rx="4" fill="#3b82f6"/>
      <text x="110" y="140" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1d4ed8" text-anchor="middle">50 cm</text>
      <text x="110" y="195" font-family="sans-serif" font-size="10" fill="#334155" text-anchor="middle">Lahir</text>
      
      <!-- 2 Tahun (85 cm) -->
      <rect x="190" y="110" width="40" height="70" rx="4" fill="#10b981"/>
      <text x="210" y="105" font-family="sans-serif" font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">85 cm</text>
      <text x="210" y="195" font-family="sans-serif" font-size="10" fill="#334155" text-anchor="middle">2 Thn</text>
      
      <!-- 5 Tahun (110 cm) -->
      <rect x="290" y="75" width="40" height="105" rx="4" fill="#f59e0b"/>
      <text x="310" y="70" font-family="sans-serif" font-size="10" font-weight="bold" fill="#b45309" text-anchor="middle">110 cm</text>
      <text x="310" y="195" font-family="sans-serif" font-size="10" fill="#334155" text-anchor="middle">5 Thn</text>
      
      <!-- 8 Tahun (128 cm) -->
      <rect x="390" y="50" width="40" height="130" rx="4" fill="#8b5cf6"/>
      <text x="410" y="45" font-family="sans-serif" font-size="10" font-weight="bold" fill="#6d28d9" text-anchor="middle">128 cm</text>
      <text x="410" y="195" font-family="sans-serif" font-size="10" fill="#334155" text-anchor="middle">8 Thn (Kelas 3)</text>
    </svg>
  `)}`,

  // Piring Makanku Seimbang
  giziSeimbang: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 200" width="100%" height="100%">
      <rect width="460" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <circle cx="160" cy="100" r="75" fill="#ffffff" stroke="#0ea5e9" stroke-width="4"/>
      
      <!-- Pembagian Isi Piringku -->
      <!-- Makanan Pokok (Karbohidrat) -->
      <path d="M 160 100 L 160 25 A 75 75 0 0 1 235 100 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
      <text x="185" y="75" font-family="sans-serif" font-size="10" font-weight="bold" fill="#854d0e">Makanan Pokok</text>
      <text x="185" y="87" font-family="sans-serif" font-size="8" fill="#a16207">(Nasi/Ubi/Jagung)</text>
      
      <!-- Sayuran -->
      <path d="M 160 100 L 235 100 A 75 75 0 0 1 160 175 Z" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>
      <text x="185" y="125" font-family="sans-serif" font-size="10" font-weight="bold" fill="#166534">Sayuran</text>
      <text x="185" y="137" font-family="sans-serif" font-size="8" fill="#15803d">(Bayam/Wortel)</text>

      <!-- Lauk Pauk (Protein) -->
      <path d="M 160 100 L 160 175 A 75 75 0 0 1 85 100 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
      <text x="100" y="130" font-family="sans-serif" font-size="10" font-weight="bold" fill="#9a3412">Lauk Pauk</text>
      <text x="100" y="142" font-family="sans-serif" font-size="8" fill="#c2410c">(Ikan/Telur/Tempe)</text>
      
      <!-- Buah-buahan -->
      <path d="M 160 100 L 85 100 A 75 75 0 0 1 160 25 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="1.5"/>
      <text x="105" y="70" font-family="sans-serif" font-size="10" font-weight="bold" fill="#9d174d">Buah</text>
      <text x="105" y="82" font-family="sans-serif" font-size="8" fill="#be185d">(Pisang/Pepaya)</text>
      
      <!-- Keterangan Samping -->
      <g transform="translate(260, 35)">
        <text x="0" y="15" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Konsep Isi Piringku</text>
        <text x="0" y="35" font-family="sans-serif" font-size="10" fill="#475569">Mendukung Pertumbuhan &amp; </text>
        <text x="0" y="48" font-family="sans-serif" font-size="10" fill="#475569">Perkembangan Tubuh Sehat:</text>
        <circle cx="8" cy="70" r="4" fill="#ca8a04"/>
        <text x="20" y="74" font-family="sans-serif" font-size="10" fill="#334155">Energi untuk bergerak &amp; belajar</text>
        <circle cx="8" cy="90" r="4" fill="#16a34a"/>
        <text x="20" y="94" font-family="sans-serif" font-size="10" fill="#334155">Vitamin dan mineral pelindung tubuh</text>
        <circle cx="8" cy="110" r="4" fill="#ea580c"/>
        <text x="20" y="114" font-family="sans-serif" font-size="10" fill="#334155">Protein pembangun sel dan jaringan</text>
      </g>
    </svg>
  `)}`,

  // Perkembangan Motorik Bayi
  motorikBayi: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 160" width="100%" height="100%">
      <rect width="500" height="160" rx="12" fill="#eff6ff" stroke="#bfdbfe" stroke-width="2"/>
      <text x="250" y="24" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Perkembangan Gerak (Motorik Kasar) pada Masa Bayi</text>
      
      <!-- Step 1: Tengkurap -->
      <g transform="translate(30, 45)">
        <rect width="85" height="90" rx="8" fill="#ffffff" stroke="#93c5fd"/>
        <text x="42.5" y="38" font-family="sans-serif" font-size="22" text-anchor="middle">🛌</text>
        <text x="42.5" y="62" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Tengkurap</text>
        <text x="42.5" y="78" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">3-4 Bulan</text>
      </g>
      
      <text x="130" y="95" font-family="sans-serif" font-size="18" fill="#3b82f6">→</text>
      
      <!-- Step 2: Duduk -->
      <g transform="translate(150, 45)">
        <rect width="85" height="90" rx="8" fill="#ffffff" stroke="#93c5fd"/>
        <text x="42.5" y="38" font-family="sans-serif" font-size="22" text-anchor="middle">🧘</text>
        <text x="42.5" y="62" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Duduk</text>
        <text x="42.5" y="78" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">6-7 Bulan</text>
      </g>
      
      <text x="250" y="95" font-family="sans-serif" font-size="18" fill="#3b82f6">→</text>
      
      <!-- Step 3: Merangkak -->
      <g transform="translate(270, 45)">
        <rect width="85" height="90" rx="8" fill="#ffffff" stroke="#93c5fd"/>
        <text x="42.5" y="38" font-family="sans-serif" font-size="22" text-anchor="middle">🚼</text>
        <text x="42.5" y="62" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Merangkak</text>
        <text x="42.5" y="78" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">8-9 Bulan</text>
      </g>

      <text x="370" y="95" font-family="sans-serif" font-size="18" fill="#3b82f6">→</text>
      
      <!-- Step 4: Berdiri & Berjalan -->
      <g transform="translate(390, 45)">
        <rect width="85" height="90" rx="8" fill="#ffffff" stroke="#93c5fd"/>
        <text x="42.5" y="38" font-family="sans-serif" font-size="22" text-anchor="middle">🚶</text>
        <text x="42.5" y="62" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Berjalan</text>
        <text x="42.5" y="78" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">11-14 Bulan</text>
      </g>
    </svg>
  `)}`,

  // Pertumbuhan Gigi Susu ke Gigi Permanen
  tumbuhGigi: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 170" width="100%" height="100%">
      <rect width="460" height="170" rx="12" fill="#fffbeb" stroke="#fde68a" stroke-width="2"/>
      <text x="230" y="24" font-family="sans-serif" font-size="12" font-weight="bold" fill="#92400e" text-anchor="middle">Pergantian Gigi pada Masa Anak-Anak</text>
      
      <g transform="translate(40, 40)">
        <rect width="170" height="105" rx="10" fill="#ffffff" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="85" y="35" font-family="sans-serif" font-size="28" text-anchor="middle">🦷</text>
        <text x="85" y="65" font-family="sans-serif" font-size="12" font-weight="bold" fill="#b45309" text-anchor="middle">Gigi Susu</text>
        <text x="85" y="82" font-family="sans-serif" font-size="9.5" fill="#78350f" text-anchor="middle">Jumlah: 20 buah</text>
        <text x="85" y="96" font-family="sans-serif" font-size="8.5" fill="#a16207" text-anchor="middle">Mulai tanggal usia 6 tahun</text>
      </g>
      
      <text x="230" y="98" font-family="sans-serif" font-size="22" fill="#d97706" text-anchor="middle">→</text>
      
      <g transform="translate(250, 40)">
        <rect width="170" height="105" rx="10" fill="#ffffff" stroke="#10b981" stroke-width="1.5"/>
        <text x="85" y="35" font-family="sans-serif" font-size="28" text-anchor="middle">✨🦷</text>
        <text x="85" y="65" font-family="sans-serif" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">Gigi Permanen (Tetap)</text>
        <text x="85" y="82" font-family="sans-serif" font-size="9.5" fill="#065f46" text-anchor="middle">Jumlah lengkap: 32 buah</text>
        <text x="85" y="96" font-family="sans-serif" font-size="8.5" fill="#047857" text-anchor="middle">Tidak berganti lagi jika tanggal</text>
      </g>
    </svg>
  `)}`,

  // Waktu Istirahat Tidur Sehat Anak
  tidurCukup: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 160" width="100%" height="100%">
      <rect width="460" height="160" rx="12" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
      <g transform="translate(30, 25)">
        <circle cx="50" cy="55" r="40" fill="#1e293b"/>
        <text x="50" y="64" font-family="sans-serif" font-size="32" text-anchor="middle">🌙</text>
        <g transform="translate(110, 10)">
          <text x="0" y="20" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Kebutuhan Tidur Anak Usia Sekolah (Kelas 3 SD)</text>
          <text x="0" y="42" font-family="sans-serif" font-size="11" fill="#334155">• Durasi ideal: <tspan font-weight="bold" fill="#2563eb">9 s.d. 11 Jam setiap malam</tspan></text>
          <text x="0" y="64" font-family="sans-serif" font-size="11" fill="#334155">• Hormon pertumbuhan aktif diproduksi saat tidur lelap</text>
          <text x="0" y="86" font-family="sans-serif" font-size="11" fill="#334155">• Memulihkan energi otak untuk fokus belajar keesokan hari</text>
        </g>
      </g>
    </svg>
  `)}`
};

export const INITIAL_QUESTIONS: Question[] = [
  // =========================================================================
  // BAGIAN 1: PILIHAN GANDA (20 SOAL: NOMOR 1 s.d. 20)
  // =========================================================================
  {
    id: 'pg-1',
    originalNumber: 1,
    type: 'pilihan_ganda',
    category: 'Tahapan Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi tahapan siklus hidup manusia dari awal hingga akhir dengan tepat.',
    indikator: 'Disajikan gambar urutan daur hidup manusia, siswa dapat menentukan tahapan awal siklus hidup setelah dilahirkan.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    question: 'Perhatikan gambar bagan siklus hidup manusia di bawah ini!\nTahapan pertama yang dilalui oleh seorang manusia sesaat setelah dilahirkan ke dunia adalah tahapan ...',
    imageUrl: SVG_ICONS.siklusHidup,
    imageCaption: 'Bagan Urutan Siklus Hidup Manusia',
    options: ['Anak-anak', 'Balita', 'Bayi', 'Remaja'],
    correctAnswer: 2,
    scoreWeight: 1,
    explanation: 'Setelah dilahirkan oleh ibu, tahapan pertama kehidupan manusia adalah masa bayi (usia 0 hingga 1 tahun).'
  },
  {
    id: 'pg-2',
    originalNumber: 2,
    type: 'pilihan_ganda',
    category: 'Ciri Pertumbuhan Fisik',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi ciri-ciri pertumbuhan fisik pada manusia.',
    indikator: 'Siswa dapat menentukan peristiwa sehari-hari yang menjadi bukti terjadinya proses pertumbuhan (pertambahan ukuran).',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    question: 'Saat masih duduk di kelas 1 SD, seragam merah-putih milik Made terasa pas. Namun saat Made duduk di kelas 3 SD, seragam tersebut sudah terasa sempit dan pendek. Peristiwa ini membuktikan bahwa Made mengalami proses ...',
    options: ['Perkembangbiakan', 'Pertumbuhan', 'Pernapasan', 'Pengurangan berat'],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Pertumbuhan adalah proses pertambahan ukuran fisik tubuh seperti bertambah tinggi dan bertambah berat badan, sehingga baju lama menjadi sempit.'
  },
  {
    id: 'pg-3',
    originalNumber: 3,
    type: 'pilihan_ganda',
    category: 'Ciri Pertumbuhan Fisik',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik membaca dan menganalisis data grafik pertumbuhan tinggi badan manusia.',
    indikator: 'Disajikan grafik pertambahan tinggi badan dari lahir hingga usia 8 tahun, siswa dapat menghitung pertambahan tinggi badan yang terjadi.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    question: 'Perhatikan grafik pertambahan tinggi badan Andi di bawah ini!\nBerdasarkan grafik tersebut, pertambahan tinggi badan Andi sejak dilahirkan (50 cm) hingga berusia 8 tahun (128 cm) adalah sebesar ...',
    imageUrl: SVG_ICONS.grafikPertumbuhan,
    imageCaption: 'Grafik Pertumbuhan Tinggi Badan Andi',
    options: ['68 cm', '78 cm', '88 cm', '128 cm'],
    correctAnswer: 1, // 128 - 50 = 78 cm
    scoreWeight: 1,
    explanation: 'Pertambahan tinggi badan = Tinggi saat usia 8 tahun - Tinggi saat lahir = 128 cm - 50 cm = 78 cm.'
  },
  {
    id: 'pg-4',
    originalNumber: 4,
    type: 'pilihan_ganda',
    category: 'Ciri Perkembangan Kemampuan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik membedakan konsep pertumbuhan dan perkembangan pada manusia.',
    indikator: 'Siswa dapat memilih contoh yang menunjukkan terjadinya proses perkembangan (pematangan fungsi organ atau kemampuan).',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    question: 'Manakah dari pernyataan berikut yang merupakan contoh dari proses "perkembangan" pada manusia?',
    options: [
      'Berat badan adik bertambah dari 7 kg menjadi 10 kg',
      'Tinggi badan kakak bertambah 5 sentimeter dalam setahun',
      'Adik yang semula hanya bisa berguling kini sudah lancar berbicara',
      'Panjang telapak kaki Dayu bertambah sehingga ukuran sepatunya naik'
    ],
    correctAnswer: 2,
    scoreWeight: 1,
    explanation: 'Pertumbuhan berkaitan dengan ukuran fisik yang dapat diukur dengan angka (tinggi, berat). Perkembangan berkaitan dengan bertambahnya fungsi dan kemampuan tubuh, seperti lancar berbicara dan berpikir.'
  },
  {
    id: 'pg-5',
    originalNumber: 5,
    type: 'pilihan_ganda',
    category: 'Ciri Perkembangan Kemampuan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengurutkan tahapan perkembangan motorik gerak pada masa bayi.',
    indikator: 'Disajikan ilustrasi tahapan gerak bayi, siswa dapat menentukan urutan perkembangan gerak yang benar.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    question: 'Perhatikan bagan perkembangan kemampuan motorik bayi berikut ini!\nUrutan tahapan perkembangan gerak alami yang dilalui oleh seorang bayi adalah ...',
    imageUrl: SVG_ICONS.motorikBayi,
    imageCaption: 'Tahapan Perkembangan Gerak Kasar Bayi',
    options: [
      'Berjalan → Merangkak → Duduk → Tengkurap',
      'Tengkurap → Duduk → Merangkak → Berjalan',
      'Duduk → Tengkurap → Berjalan → Merangkak',
      'Merangkak → Berjalan → Duduk → Tengkurap'
    ],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Urutan perkembangan gerak kasar pada bayi secara bertahap adalah tengkurap (3-4 bulan), duduk (6-7 bulan), merangkak (8-9 bulan), lalu mulai berdiri dan berjalan (11-14 bulan).'
  },
  {
    id: 'pg-6',
    originalNumber: 6,
    type: 'pilihan_ganda',
    category: 'Tahapan Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi rentang usia dan karakteristik masa balita.',
    indikator: 'Siswa dapat menentukan rentang usia manusia yang tergolong ke dalam kelompok balita (bawah lima tahun).',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    question: 'Istilah "balita" merupakan singkatan dari bawah lima tahun. Rentang usia seorang manusia yang berada pada masa balita adalah ...',
    options: ['0 sampai 6 bulan', '1 sampai 5 tahun', '6 sampai 10 tahun', '12 sampai 17 tahun'],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Masa balita (bawah lima tahun) berlangsung pada rentang usia 1 hingga 5 tahun setelah melewati masa bayi.'
  },
  {
    id: 'pg-7',
    originalNumber: 7,
    type: 'pilihan_ganda',
    category: 'Ciri Pertumbuhan Fisik',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik menjelaskan perubahan susunan gigi pada masa anak-anak.',
    indikator: 'Disajikan informasi pertumbuhan gigi, siswa dapat menentukan ciri gigi susu yang mulai tanggal pada masa anak-anak.',
    cognitiveLevel: 'L1',
    difficulty: 'Sedang',
    question: 'Perhatikan gambar perbandingan gigi susu dan gigi permanen berikut ini!\nKetika anak berusia sekitar 6 hingga 7 tahun, gigi susu mulai tanggal satu per satu dan digantikan oleh ...',
    imageUrl: SVG_ICONS.tumbuhGigi,
    imageCaption: 'Pertumbuhan dan Pergantian Gigi pada Anak',
    options: ['Gigi taring palsu', 'Gigi permanen (gigi tetap)', 'Gigi geraham sementara', 'Gigi susu baru'],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Pada usia anak-anak (sekitar 6-12 tahun), gigi susu yang berjumlah 20 buah akan tanggal secara bertahap dan digantikan oleh gigi permanen (gigi tetap) yang berjumlah 32 buah.'
  },
  {
    id: 'pg-8',
    originalNumber: 8,
    type: 'pilihan_ganda',
    category: 'Faktor Nutrisi & Pola Hidup',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi zat makanan yang berfungsi utama sebagai zat pembangun tubuh.',
    indikator: 'Siswa dapat menentukan jenis zat gizi yang sangat diperlukan untuk pembentukan sel-sel tubuh baru pada masa pertumbuhan.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    question: 'Zat gizi yang sangat dibutuhkan oleh anak-anak pada masa pertumbuhan karena berfungsi sebagai zat pembangun sel-sel tubuh dan jaringan otot adalah ...',
    options: ['Karbohidrat', 'Protein', 'Lemak jenuh', 'Garam dapur'],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Protein (seperti pada ikan, telur, tempe, susu, dan daging) berperan sebagai zat pembangun yang penting untuk pertumbuhan sel dan jaringan tubuh anak.'
  },
  {
    id: 'pg-9',
    originalNumber: 9,
    type: 'pilihan_ganda',
    category: 'Faktor Nutrisi & Pola Hidup',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik menganalisis menu gizi seimbang berdasarkan konsep Isi Piringku.',
    indikator: 'Disajikan gambar Isi Piringku, siswa dapat menentukan kombinasi makanan yang memenuhi syarat gizi seimbang.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    question: 'Perhatikan gambar panduan "Isi Piringku" berikut ini!\nIbu menyiapkan menu sarapan untuk Komang: sepiring nasi, sepotong ikan tongkol panggang, sayur bening bayam, dan sepotong buah pepaya segar. Menu makanan tersebut tergolong ...',
    imageUrl: SVG_ICONS.giziSeimbang,
    imageCaption: 'Pedoman Porsi Gizi Seimbang Isi Piringku',
    options: [
      'Kurang sehat karena tidak ada mie instan',
      'Makanan bergizi seimbang lengkap dengan karbohidrat, protein, vitamin, dan serat',
      'Berlebihan karena banyak mengandung gula',
      'Hanya mengandung lemak tanpa vitamin'
    ],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Menu tersebut lengkap: nasi (karbohidrat/pokok), ikan tongkol (protein hewani/lauk), sayur bayam (vitamin & mineral), dan pepaya (vitamin & serat).'
  },
  {
    id: 'pg-10',
    originalNumber: 10,
    type: 'pilihan_ganda',
    category: 'Faktor Nutrisi & Pola Hidup',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik memahami pengaruh istirahat dan tidur terhadap hormon pertumbuhan.',
    indikator: 'Disajikan infografis durasi tidur anak, siswa dapat menyimpulkan manfaat tidur cukup bagi pertumbuhan tubuh anak kelas 3 SD.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    question: 'Perhatikan gambar pentingnya istirahat tidur bagi anak-anak berikut ini!\nAnak usia sekolah dasar dianjurkan tidur sekitar 9-11 jam setiap malam karena saat tidur nyenyak tubuh akan ...',
    imageUrl: SVG_ICONS.tidurCukup,
    imageCaption: 'Pentingnya Istirahat Cukup bagi Tumbuh Kembang',
    options: [
      'Menghambat pertumbuhan tinggi badan',
      'Memproduksi hormon pertumbuhan dan memulihkan energi tubuh',
      'Mengurangi jumlah sel darah merah di tubuh',
      'Membuat organ jantung berhenti bekerja sementara'
    ],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Ketika tidur nyenyak di malam hari, tubuh anak memproduksi hormon pertumbuhan (growth hormone) secara optimal yang membantu pertambahan tinggi badan dan perbaikan sel tubuh.'
  },
  {
    id: 'pg-11',
    originalNumber: 11,
    type: 'pilihan_ganda',
    category: 'Tahapan Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi masa pubertas pada siklus hidup manusia.',
    indikator: 'Siswa dapat menentukan tahapan siklus hidup di mana manusia mulai mengalami masa pubertas (peralihan dari anak-anak).',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    question: 'Masa peralihan dari tahap anak-anak menuju tahap dewasa yang ditandai dengan perubahan fisik pubertas disebut masa ...',
    options: ['Bayi', 'Balita', 'Remaja', 'Lansia'],
    correctAnswer: 2,
    scoreWeight: 1,
    explanation: 'Masa remaja (usia sekitar 12 - 18 tahun) adalah masa transisi dari anak-anak menuju dewasa yang ditandai oleh perubahan pubertas.'
  },
  {
    id: 'pg-12',
    originalNumber: 12,
    type: 'pilihan_ganda',
    category: 'Tahapan Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi ciri-ciri fisik pada masa lanjut usia (lansia).',
    indikator: 'Siswa dapat menganalisis ciri-ciri fisik yang dialami oleh manusia pada masa lanjut usia.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    question: 'Kakek Wayan memiliki rambut yang mulai memutih (beruban), kulit yang mulai keriput, serta kekuatan otot dan penglihatan yang mulai berkurang. Ciri-ciri fisik tersebut menunjukkan bahwa Kakek Wayan berada pada tahap ...',
    options: ['Dewasa awal', 'Masa remaja', 'Masa anak-anak', 'Lanjut usia (Lansia)'],
    correctAnswer: 3,
    scoreWeight: 1,
    explanation: 'Pada tahap lanjut usia (lansia, umumnya 60 tahun ke atas), terjadi proses penuaan alami seperti rambut beruban, kulit keriput, dan penurunan daya fungsi tubuh.'
  },
  {
    id: 'pg-13',
    originalNumber: 13,
    type: 'pilihan_ganda',
    category: 'Ciri Pertumbuhan Fisik',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi faktor keturunan (genetik) dalam pertumbuhan fisik.',
    indikator: 'Siswa dapat menentukan faktor bawaan dari orang tua yang mempengaruhi ciri fisik anak.',
    cognitiveLevel: 'L1',
    difficulty: 'Sedang',
    question: 'Ketut memiliki rambut ikal dan kulit sawo matang mirip seperti ayahnya, sedangkan bentuk hidungnya mirip dengan ibunya. Ciri-ciri fisik yang diwariskan dari orang tua kepada anaknya ini dipengaruhi oleh faktor ...',
    options: ['Keturunan (Genetik)', 'Olahraga teratur', 'Pemberian vitamin', 'Pola tidur'],
    correctAnswer: 0,
    scoreWeight: 1,
    explanation: 'Ciri-ciri fisik seperti warna kulit, bentuk rambut, dan golongan darah diwariskan langsung oleh kedua orang tua melalui faktor keturunan (genetik).'
  },
  {
    id: 'pg-14',
    originalNumber: 14,
    type: 'pilihan_ganda',
    category: 'Perawatan Diri & Kesehatan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik menerapkan kebiasaan hidup bersih dan sehat untuk menjaga organ tubuh.',
    indikator: 'Siswa dapat memilih tindakan tepat dalam menjaga kebersihan diri untuk mendukung tumbuh kembang yang optimal.',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    question: 'Agar tubuh terhindar dari kuman penyakit dan tetap tumbuh sehat setelah berolahraga di lapangan sekolah, tindakan yang paling tepat dilakukan adalah ...',
    options: [
      'Langsung tidur siang dengan pakaian olahraga',
      'Mencuci tangan dan kaki dengan sabun serta mandi membersihkan badan',
      'Membeli es sirup yang manis di pinggir jalan',
      'Mengusap keringat di baju lalu bermain gawai'
    ],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Mandi dan mencuci tangan/kaki menggunakan sabun setelah beraktivitas membantu membersihkan keringat, debu, dan kuman yang menempel di tubuh sehingga kesehatan tetap terjaga.'
  },
  {
    id: 'pg-15',
    originalNumber: 15,
    type: 'pilihan_ganda',
    category: 'Ciri Perkembangan Kemampuan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik menganalisis perkembangan kemandirian pada siswa kelas 3 SD.',
    indikator: 'Siswa dapat menentukan contoh perilaku mandiri yang menunjukkan perkembangan kemampuan diri anak usia sekolah dasar.',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    question: 'Di antara kegiatan berikut, manakah yang menunjukkan perkembangan sikap mandiri pada seorang siswa kelas 3 SD?',
    options: [
      'Menangis ketika harus ditinggal orang tua di depan gerbang sekolah',
      'Menyiapkan buku pelajaran dan memakai seragam sekolah sendiri tanpa bantuan ibu',
      'Meminta disuapi makanan setiap kali makan siang',
      'Meninggalkan sepatu dan tas sembarangan di lantai ruang tamu'
    ],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Kemampuan menyiapkan perlengkapan sekolah dan berpakaian secara mandiri merupakan tanda perkembangan kemandirian dan tanggung jawab anak usia sekolah dasar.'
  },
  {
    id: 'pg-16',
    originalNumber: 16,
    type: 'pilihan_ganda',
    category: 'Faktor Nutrisi & Pola Hidup',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik memahami fungsi air putih bagi metabolisme tubuh manusia.',
    indikator: 'Siswa dapat menentukan anjuran minum air putih harian untuk mencegah dehidrasi pada anak.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    question: 'Tubuh manusia sebagian besar terdiri dari cairan. Untuk menjaga kesehatan dan mendukung kelancaran metabolisme tubuh, kita dianjurkan minum air putih setiap hari minimal sebanyak ...',
    options: ['1 sampai 2 gelas', '4 sampai 5 sendok makan', '8 gelas (sekitar 1,5 sampai 2 liter)', '15 liter sehari'],
    correctAnswer: 2,
    scoreWeight: 1,
    explanation: 'Anjuran minum air putih harian untuk anak-anak dan orang dewasa rata-rata adalah 8 gelas atau setara dengan 1,5 hingga 2 liter setiap hari.'
  },
  {
    id: 'pg-17',
    originalNumber: 17,
    type: 'pilihan_ganda',
    category: 'Perawatan Diri & Kesehatan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik menganalisis dampak makanan cepat saji (junk food) terhadap kesehatan anak.',
    indikator: 'Disajikan studi kasus kebiasaan jajan anak, siswa dapat memprediksi dampak negatif jajan tidak sehat bagi proses tumbuh kembang.',
    cognitiveLevel: 'L3',
    difficulty: 'Sukar',
    question: 'Putu sangat gemar mengonsumsi makanan ringan kemasan yang gurih dan minuman bersoda setiap hari, serta jarang makan sayur dan buah. Jika kebiasaan ini terus berlanjut, dampak yang paling mungkin dialami Putu adalah ...',
    options: [
      'Tulang dan giginya menjadi sangat kuat',
      'Daya tahan tubuh meningkat pesat',
      'Tubuh rentan mengalami obesitas (kegemukan tidak sehat) dan kekurangan zat gizi mikro',
      'Tinggi badannya bertambah lebih cepat dari teman sebayanya'
    ],
    correctAnswer: 2,
    scoreWeight: 1,
    explanation: 'Makanan ringan kemasan dan minuman bersoda tinggi kadar gula, garam, dan lemak, namun miskin vitamin dan serat, sehingga dapat memicu obesitas dan mengganggu kekebalan tubuh anak.'
  },
  {
    id: 'pg-18',
    originalNumber: 18,
    type: 'pilihan_ganda',
    category: 'Faktor Nutrisi & Pola Hidup',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik menjelaskan manfaat olahraga bagi pertumbuhan tulang dan otot.',
    indikator: 'Siswa dapat menjelaskan mekanisme olahraga dalam memperkuat tulang dan kelincahan tubuh.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    question: 'Olahraga teratur seperti berenang, lari pagi, atau senam sangat bermanfaat bagi anak-anak karena ...',
    options: [
      'Menjadikan anak malas belajar di kelas',
      'Merangsang pertumbuhan tulang, menguatkan otot, dan melatih kelenturan tubuh',
      'Mengurangi kebutuhan makan setiap hari',
      'Menyebabkan gigi susu tanggal lebih cepat'
    ],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Olahraga fisik merangsang kepadatan tulang, memperkuat otot jantung dan rangka, serta menjaga kebugaran jasmani anak.'
  },
  {
    id: 'pg-19',
    originalNumber: 19,
    type: 'pilihan_ganda',
    category: 'Tahapan Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi fase dewasa dalam siklus hidup manusia.',
    indikator: 'Siswa dapat mengidentifikasi ciri-ciri kehidupan seseorang pada tahap dewasa.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    question: 'Pada tahap kehidupan manusia, masa dewasa ditandai oleh ciri-ciri utama seperti ...',
    options: [
      'Pertumbuhan fisik tinggi badan telah berhenti dan siap bekerja serta membina keluarga',
      'Masih membutuhkan bantuan penuh dari orang tua untuk makan',
      'Seluruh gigi susunya baru mulai tanggal',
      'Hanya mampu berkomunikasi dengan menangis'
    ],
    correctAnswer: 0,
    scoreWeight: 1,
    explanation: 'Pada masa dewasa (usia 19-59 tahun), pertambahan tinggi badan umumnya telah berhenti, emosi lebih stabil, organ reproduksi matang, dan memiliki tanggung jawab mandiri (bekerja/berkeluarga).'
  },
  {
    id: 'pg-20',
    originalNumber: 20,
    type: 'pilihan_ganda',
    category: 'Ciri Pertumbuhan Fisik',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengevaluasi alat ukur pertumbuhan pada manusia.',
    indikator: 'Disajikan beberapa alat ukur, siswa dapat memilih alat yang tepat untuk mengukur pertumbuhan berat dan tinggi badan.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    question: 'Untuk mengetahui apakah berat badan dan tinggi badan siswa kelas 3 SD mengalami pertumbuhan yang baik dari bulan ke bulan, petugas kesehatan menggunakan alat ukur berupa ...',
    options: [
      'Termometer dan stopwatch',
      'Timbangan berat badan dan meteran / stadiometer pengukur tinggi badan',
      'Penggaris segitiga dan jangka sorong',
      'Gelas ukur dan neraca pegas lab'
    ],
    correctAnswer: 1,
    scoreWeight: 1,
    explanation: 'Timbangan digunakan untuk mengukur massa/berat badan (satuan kg), sedangkan meteran/stadiometer digunakan untuk mengukur tinggi badan (satuan cm).'
  },

  // =========================================================================
  // BAGIAN 2: PILIHAN GANDA KOMPLEKS KATEGORI (10 SOAL: NOMOR 21 s.d. 30)
  // Setiap soal memiliki tepat 3 deskripsi/pernyataan yang harus direspons Benar / Salah.
  // =========================================================================
  {
    id: 'pgk-21',
    originalNumber: 21,
    type: 'kategori',
    category: 'Ciri Pertumbuhan Fisik',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik membedakan ciri-ciri proses pertumbuhan fisik manusia.',
    indikator: 'Disajikan 3 pernyataan tentang pertumbuhan fisik, siswa dapat menentukan kebenaran tiap pernyataan (Benar/Salah).',
    cognitiveLevel: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai "Ciri Pertumbuhan Fisik" pada manusia berikut ini termasuk BENAR atau SALAH!',
    explanation: 'Pertumbuhan bersifat kuantitatif (dapat diukur dengan angka seperti kg dan cm). Berat badan bayi yang bertambah dan ukuran sepatu yang membesar merupakan bukti pertumbuhan.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-21-1',
        text: 'Pertumbuhan fisik manusia ditandai dengan pertambahan ukuran tubuh yang dapat diukur dengan angka seperti tinggi dan berat badan.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-21-2',
        text: 'Pertambahan ukuran sepatu anak dari nomor 28 menjadi nomor 32 merupakan contoh terjadinya pertumbuhan telapak kaki.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-21-3',
        text: 'Tinggi badan manusia akan terus bertambah sepanjang hidupnya bahkan hingga usia kakek-nenek (lansia).',
        correctAnswer: 'Salah'
      }
    ]
  },
  {
    id: 'pgk-22',
    originalNumber: 22,
    type: 'kategori',
    category: 'Ciri Perkembangan Kemampuan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi ciri-ciri perkembangan kemampuan dan kematangan fungsi tubuh.',
    indikator: 'Disajikan 3 pernyataan tentang ciri perkembangan manusia, siswa dapat menganalisis kebenarannya (Benar/Salah).',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai "Perkembangan Kemampuan Manusia" berikut ini termasuk BENAR atau SALAH!',
    explanation: 'Perkembangan menitikberatkan pada pematangan kemampuan, fungsi organ, keterampilan gerak, bahasa, serta pola pikir.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-22-1',
        text: 'Bayi yang awalnya hanya menangis lalu mulai belajar mengucap kata "mama" dan "papa" adalah contoh perkembangan kemampuan berbicara.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-22-2',
        text: 'Perkembangan pada manusia hanya terjadi pada bentuk ukuran fisik saja dan tidak melibatkan kemampuan berpikir atau emosi.',
        correctAnswer: 'Salah'
      },
      {
        id: 'st-22-3',
        text: 'Siswa kelas 3 SD yang sudah mampu membaca buku cerita sendiri dan memahami isinya menunjukkan terjadinya perkembangan kecerdasan.',
        correctAnswer: 'Benar'
      }
    ]
  },
  {
    id: 'pgk-23',
    originalNumber: 23,
    type: 'kategori',
    category: 'Tahapan Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi tahapan dan karakteristik siklus hidup manusia.',
    indikator: 'Disajikan 3 pernyataan tentang tahapan siklus hidup manusia, siswa dapat menentukan kebenaran tiap pernyataan.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    imageUrl: SVG_ICONS.siklusHidup,
    imageCaption: 'Tahapan Siklus Hidup Manusia Lengkap',
    question: 'Perhatikan bagan siklus hidup manusia! Tentukan apakah setiap pernyataan mengenai tahapan kehidupan manusia berikut BENAR atau SALAH!',
    explanation: 'Urutan siklus hidup manusia adalah: Bayi → Balita → Anak-anak → Remaja → Dewasa → Lansia.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-23-1',
        text: 'Masa anak-anak dilalui setelah seorang manusia melewati tahapan bayi dan balita.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-23-2',
        text: 'Masa remaja dialami manusia setelah mereka melewati tahap usia lanjut (lansia).',
        correctAnswer: 'Salah'
      },
      {
        id: 'st-23-3',
        text: 'Semua manusia yang lahir sehat akan melewati siklus pertumbuhan dari bayi hingga masa dewasa.',
        correctAnswer: 'Benar'
      }
    ]
  },
  {
    id: 'pgk-24',
    originalNumber: 24,
    type: 'kategori',
    category: 'Faktor Nutrisi & Pola Hidup',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik menganalisis fungsi gizi pada makanan terhadap pertumbuhan tubuh.',
    indikator: 'Disajikan 3 pernyataan tentang fungsi zat gizi makanan, siswa dapat mengevaluasi kebenarannya.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    imageUrl: SVG_ICONS.giziSeimbang,
    imageCaption: 'Kelompok Zat Gizi Isi Piringku',
    question: 'Tentukan apakah setiap pernyataan mengenai zat gizi bagi tumbuh kembang tubuh berikut ini termasuk BENAR atau SALAH!',
    explanation: 'Karbohidrat penghasil energi, protein zat pembangun, vitamin/mineral zat pengatur & pelindung daya tahan tubuh.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-24-1',
        text: 'Nasi, jagung, dan singkong merupakan makanan pokok yang kaya akan karbohidrat sebagai sumber tenaga utama tubuh.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-24-2',
        text: 'Kalsium pada susu dan ikan bermanfaat untuk memperkuat kepadatan tulang dan gigi pada anak-anak.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-24-3',
        text: 'Makan permen dan cokelat dalam jumlah banyak adalah pengganti terbaik untuk sayur dan buah.',
        correctAnswer: 'Salah'
      }
    ]
  },
  {
    id: 'pgk-25',
    originalNumber: 25,
    type: 'kategori',
    category: 'Ciri Pertumbuhan Fisik',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik memahami proses pergantian gigi susu ke gigi permanen pada anak.',
    indikator: 'Disajikan 3 pernyataan tentang fase pergantian gigi susu, siswa dapat memvalidasi kebenarannya.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    imageUrl: SVG_ICONS.tumbuhGigi,
    imageCaption: 'Karakteristik Gigi Susu dan Gigi Tetap',
    question: 'Perhatikan gambar pertumbuhan gigi! Tentukan apakah setiap pernyataan mengenai pertumbuhan gigi berikut ini BENAR atau SALAH!',
    explanation: 'Gigi susu berjumlah 20 dan dapat tanggal. Gigi permanen berjumlah 32, jika rusak/tanggal tidak akan tumbuh lagi secara alami.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-25-1',
        text: 'Gigi pertama yang tumbuh pada masa bayi disebut dengan gigi susu.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-25-2',
        text: 'Jika gigi permanen (gigi tetap) pada orang dewasa tanggal atau dicabut, gigi tersebut akan tumbuh kembali dengan sendirinya.',
        correctAnswer: 'Salah'
      },
      {
        id: 'st-25-3',
        text: 'Menyikat gigi secara teratur dua kali sehari (pagi setelah sarapan dan malam sebelum tidur) menjaga gigi tetap sehat dan tidak berlubang.',
        correctAnswer: 'Benar'
      }
    ]
  },
  {
    id: 'pgk-26',
    originalNumber: 26,
    type: 'kategori',
    category: 'Faktor Nutrisi & Pola Hidup',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik menganalisis faktor-faktor yang mempengaruhi percepatan tumbuh kembang manusia.',
    indikator: 'Disajikan 3 pernyataan tentang faktor yang mempengaruhi pertumbuhan manusia, siswa dapat menganalisis kebenarannya.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan tentang faktor-faktor yang mempengaruhi proses tumbuh kembang manusia berikut BENAR atau SALAH!',
    explanation: 'Faktor penentu meliputi makanan bergizi, genetik/keturunan orang tua, aktivitas fisik/olahraga, waktu tidur cukup, dan kesehatan lingkungan.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-26-1',
        text: 'Dua orang anak yang berusia sama persis (misalnya sama-sama berusia 8 tahun) pasti selalu memiliki tinggi dan berat badan yang tepat sama.',
        correctAnswer: 'Salah'
      },
      {
        id: 'st-26-2',
        text: 'Kebiasaan tidur larut malam (begadang) sambil bermain game di ponsel dapat mengganggu kerja hormon pertumbuhan pada anak.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-26-3',
        text: 'Pemberian imunisasi dan vitamin pada masa balita membantu melindungi tubuh anak dari serangan penyakit berbahaya.',
        correctAnswer: 'Benar'
      }
    ]
  },
  {
    id: 'pgk-27',
    originalNumber: 27,
    type: 'kategori',
    category: 'Tahapan Siklus Hidup Manusia',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengidentifikasi perubahan fisik yang terjadi pada masa pubertas dan lanjut usia.',
    indikator: 'Disajikan 3 pernyataan tentang perubahan fisik pada masa remaja dan lansia, siswa dapat menentukan kebenarannya.',
    cognitiveLevel: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai perubahan fisik pada tahapan kehidupan manusia berikut ini BENAR atau SALAH!',
    explanation: 'Pada remaja laki-laki suara membesar dan tumbuh jakun. Pada lansia fungsi organ menurun dan kulit mengeriput.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-27-1',
        text: 'Salah satu ciri pubertas pada anak laki-laki adalah suara yang terdengar lebih berat dan membesar.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-27-2',
        text: 'Pada masa lanjut usia (lansia), kemampuan daya ingat, pendengaran, dan kelenturan otot tubuh cenderung mengalami penurunan.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-27-3',
        text: 'Masa bayi adalah masa di mana manusia telah memiliki kemampuan fisik paling kuat untuk bekerja berat.',
        correctAnswer: 'Salah'
      }
    ]
  },
  {
    id: 'pgk-28',
    originalNumber: 28,
    type: 'kategori',
    category: 'Perawatan Diri & Kesehatan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengaitkan kebiasaan higienis dengan pencegahan penyakit infeksi saluran cerna.',
    indikator: 'Disajikan 3 pernyataan mengenai kebiasaan mencuci tangan, siswa dapat menentukan kebenarannya.',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai cara menjaga kebersihan diri berikut ini termasuk BENAR atau SALAH!',
    explanation: 'Mencuci tangan dengan air mengalir dan sabun membunuh kuman penyebab diare dan cacingan yang mengganggu penyerapan nutrisi anak.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-28-1',
        text: 'Mencuci tangan dengan sabun dan air mengalir sebelum makan dapat mencegah kuman penyebab sakit perut masuk ke dalam tubuh.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-28-2',
        text: 'Kuku jari tangan yang panjang dan kotor sebaiknya dibiarkan saja karena tidak mempengaruhi kesehatan.',
        correctAnswer: 'Salah'
      },
      {
        id: 'st-28-3',
        text: 'Memakai pakaian yang bersih dan kering menghindarkan kulit dari rasa gatal serta jamur kulit.',
        correctAnswer: 'Benar'
      }
    ]
  },
  {
    id: 'pgk-29',
    originalNumber: 29,
    type: 'kategori',
    category: 'Ciri Perkembangan Kemampuan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik membandingkan karakteristik kemampuan bayi baru lahir dengan anak usia sekolah.',
    indikator: 'Disajikan 3 perbandingan kemampuan bayi vs anak usia 8-9 tahun, siswa dapat memvalidasi kebenarannya.',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap perbandingan kemampuan antara bayi dengan siswa kelas 3 SD berikut ini BENAR atau SALAH!',
    explanation: 'Bayi belum mandiri dan makanannya berupa ASI. Siswa kelas 3 SD sudah mampu makan mandiri, berlari, dan berpikir logis.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-29-1',
        text: 'Bayi baru lahir hanya dapat mengonsumsi air susu ibu (ASI) karena organ pencernaannya belum mampu mengunyah nasi atau daging.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-29-2',
        text: 'Anak kelas 3 SD sudah dapat diajarkan untuk membedakan perbuatan yang baik dan perbuatan yang tidak terpuji.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-29-3',
        text: 'Bayi berusia 2 bulan sudah mampu menyeberang jalan raya sendiri tanpa bantuan orang dewasa.',
        correctAnswer: 'Salah'
      }
    ]
  },
  {
    id: 'pgk-30',
    originalNumber: 30,
    type: 'kategori',
    category: 'Perawatan Diri & Kesehatan',
    elemen: 'Pemahaman IPAS (Sains dan Sosial)',
    capaianPembelajaran: 'Peserta didik mengevaluasi pola hidup sehat untuk mengoptimalkan potensi tumbuh kembang.',
    indikator: 'Disajikan 3 pernyataan penerapan pola hidup sehat di lingkungan keluarga dan sekolah, siswa dapat mengevaluasi kebenarannya.',
    cognitiveLevel: 'L3',
    difficulty: 'Sedang',
    scoreWeight: 1,
    question: 'Tentukan apakah setiap pernyataan mengenai pola hidup sehat untuk mendukung proses tumbuh kembang manusia berikut ini BENAR atau SALAH!',
    explanation: 'Pola hidup sehat memadukan makanan bergizi seimbang, kebersihan diri, olahraga, tidur cukup, serta suasana keluarga yang penuh kasih sayang.',
    categoryType: 'benar_salah',
    statements: [
      {
        id: 'st-30-1',
        text: 'Bermain game di depan layar gawai sepanjang hari tanpa bergerak sama sekali adalah cara terbaik melatih kekuatan otot anak.',
        correctAnswer: 'Salah'
      },
      {
        id: 'st-30-2',
        text: 'Lingkungan rumah yang bersih dan mendapat sirkulasi udara serta sinar matahari pagi yang cukup mendukung kesehatan pernapasan anak.',
        correctAnswer: 'Benar'
      },
      {
        id: 'st-30-3',
        text: 'Perhatian dan kasih sayang dari orang tua serta guru di sekolah berperan penting bagi perkembangan rasa percaya diri anak.',
        correctAnswer: 'Benar'
      }
    ]
  }
];
