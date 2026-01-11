// Data dummy untuk demo

export const classes = [
  { id: '4', name: 'Kelas 4', description: 'Soal tingkat kelas 4 SD' },
  { id: '5', name: 'Kelas 5', description: 'Soal tingkat kelas 5 SD' },
  { id: '6', name: 'Kelas 6', description: 'Soal tingkat kelas 6 SD' }
];

export const subjects = [
  { id: 'matematika', name: 'Matematika', icon: '🔢' },
  { id: 'bahasa-indonesia', name: 'Bahasa Indonesia', icon: '📚' },
  { id: 'ipa', name: 'Ilmu Pengetahuan Alam', icon: '🔬' },
  { id: 'ips', name: 'Ilmu Pengetahuan Sosial', icon: '🌍' }
];

// Contoh soal dummy
export const generateQuestions = (subjectId, classId) => {
  const baseQuestions = [
    {
      id: 1,
      question: 'Berapakah hasil dari 5 + 3?',
      options: ['6', '7', '8', '9'],
      correct: 2
    },
    {
      id: 2,
      question: 'Apa ibukota Indonesia?',
      options: ['Bandung', 'Jakarta', 'Surabaya', 'Medan'],
      correct: 1
    },
    {
      id: 3,
      question: 'Manakah yang termasuk benda padat?',
      options: ['Air', 'Es batu', 'Uap', 'Angin'],
      correct: 1
    },
    {
      id: 4,
      question: 'Siapa yang menemukan bola lampu?',
      options: ['Albert Einstein', 'Thomas Edison', 'Isaac Newton', 'Galileo'],
      correct: 1
    },
    {
      id: 5,
      question: 'Berapakah hasil dari 10 × 4?',
      options: ['30', '35', '40', '45'],
      correct: 2
    }
  ];
  
  return baseQuestions;
};

// User dummy untuk login
export const dummyUsers = [
  {
    username: 'peserta001',
    password: '123456',
    name: 'Ahmad Fauzi',
    school: 'SD Negeri 1 Jakarta',
    birthDate: '2010-05-15'
  },
  {
    username: 'peserta002',
    password: '123456',
    name: 'Siti Nurhaliza',
    school: 'SD Negeri 2 Bandung',
    birthDate: '2011-03-20'
  }
];