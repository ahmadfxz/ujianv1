import { writable } from 'svelte/store';

// User state
export const user = writable(null);
export const isLoggedIn = writable(false);

// Ujian state
export const selectedClass = writable(null);
export const selectedSubject = writable(null);
export const examData = writable({
  questions: [],
  answers: {},
  startTime: null,
  endTime: null,
  timeLimit: 60 * 60 * 1000 // 60 menit dalam ms
});

// Result state
export const examResult = writable(null);