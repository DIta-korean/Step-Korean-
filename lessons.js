// ============================================================
// Lesson content for 한글 시작 — edit this file to change what
// the site teaches. Nothing here touches HTML directly; every
// section below is rendered by js/main.js.
// ============================================================

// ---- Vowels (기본 모음) — the 10 basic vowels taught first ----
const VOWELS = [
  { ch: "ㅏ", sound: "ah", note: "like the a in \u201Cfather\u201D" },
  { ch: "ㅓ", sound: "eo", note: "like the o in \u201Cson\u201D — mouth relaxed, not rounded" },
  { ch: "ㅗ", sound: "oh", note: "like the o in \u201Cgo\u201D, lips rounded" },
  { ch: "ㅜ", sound: "oo", note: "like the oo in \u201Cfood\u201D" },
  { ch: "ㅡ", sound: "eu", note: "no English equivalent — smile flat, say \u201Cuh\u201D" },
  { ch: "ㅣ", sound: "ee", note: "like the ee in \u201Csee\u201D" },
  { ch: "ㅑ", sound: "yah", note: "y + 아, one syllable" },
  { ch: "ㅕ", sound: "yeo", note: "y + 어, one syllable" },
  { ch: "ㅛ", sound: "yo", note: "y + 오, one syllable" },
  { ch: "ㅠ", sound: "yu", note: "y + 우, one syllable" }
];

// ---- Consonants (기본 자음) — includes the tensed/double set ----
const CONSONANTS = [
  { ch: "ㄱ", sound: "g / k", note: "back of the tongue lifts to the soft palate" },
  { ch: "ㄴ", sound: "n", note: "tongue tip touches just behind the front teeth" },
  { ch: "ㄷ", sound: "d / t", note: "tongue taps the ridge behind the teeth" },
  { ch: "ㄹ", sound: "r / l", note: "a quick flap — between an English r and l" },
  { ch: "ㅁ", sound: "m", note: "lips closed, hums through the nose" },
  { ch: "ㅂ", sound: "b / p", note: "lips press together, then release" },
  { ch: "ㅅ", sound: "s", note: "air hisses past the tongue and teeth" },
  { ch: "ㅇ", sound: "silent / ng", note: "silent as an initial; \u201Cng\u201D as a final" },
  { ch: "ㅈ", sound: "j", note: "starts like the j in \u201Cjam\u201D" },
  { ch: "ㅊ", sound: "ch", note: "like ㅈ but with a puff of air" },
  { ch: "ㅋ", sound: "k", note: "like ㄱ but with a puff of air" },
  { ch: "ㅌ", sound: "t", note: "like ㄷ but with a puff of air" },
  { ch: "ㅍ", sound: "p", note: "like ㅂ but with a puff of air" },
  { ch: "ㅎ", sound: "h", note: "a breath, like the h in \u201Chello\u201D", },
  { ch: "ㄲ", sound: "kk", tense: true, note: "tense ㄱ — tight, no air, higher pitched" },
  { ch: "ㄸ", sound: "tt", tense: true, note: "tense ㄷ — tight, no air" },
  { ch: "ㅃ", sound: "pp", tense: true, note: "tense ㅂ — tight, no air" },
  { ch: "ㅆ", sound: "ss", tense: true, note: "tense ㅅ — a sharper hiss" },
  { ch: "ㅉ", sound: "jj", tense: true, note: "tense ㅈ — tight, clipped" }
];

// ---- Hangul jamo → real Unicode index maps, for the block builder ----
// (Unicode syllable = 0xAC00 + (initial*21 + medial)*28 + final)
const INITIAL_INDEX = {
  "ㄱ": 0, "ㄲ": 1, "ㄴ": 2, "ㄷ": 3, "ㄸ": 4, "ㄹ": 5, "ㅁ": 6, "ㅂ": 7, "ㅃ": 8,
  "ㅅ": 9, "ㅆ": 10, "ㅇ": 11, "ㅈ": 12, "ㅉ": 13, "ㅊ": 14, "ㅋ": 15, "ㅌ": 16, "ㅍ": 17, "ㅎ": 18
};
const MEDIAL_INDEX = {
  "ㅏ": 0, "ㅐ": 1, "ㅑ": 2, "ㅒ": 3, "ㅓ": 4, "ㅔ": 5, "ㅕ": 6, "ㅖ": 7, "ㅗ": 8,
  "ㅛ": 12, "ㅜ": 13, "ㅠ": 17, "ㅡ": 18, "ㅢ": 19, "ㅣ": 20
};
const FINAL_INDEX = {
  "": 0, "ㄱ": 1, "ㄴ": 4, "ㄷ": 7, "ㄹ": 8, "ㅁ": 16, "ㅂ": 17,
  "ㅅ": 19, "ㅇ": 21, "ㅈ": 22, "ㅊ": 23, "ㅋ": 24, "ㅌ": 25, "ㅍ": 26, "ㅎ": 27
};

const BUILDER_INITIALS = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const BUILDER_MEDIALS = ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ", "ㅑ", "ㅕ", "ㅛ", "ㅠ"];
const BUILDER_FINALS = ["", "ㄱ", "ㄴ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ"];

function composeHangul(initial, medial, final) {
  if (!initial || !medial) return null;
  const i = INITIAL_INDEX[initial];
  const m = MEDIAL_INDEX[medial];
  const f = FINAL_INDEX[final || ""] || 0;
  if (i === undefined || m === undefined) return null;
  return String.fromCharCode(0xac00 + (i * 21 + m) * 28 + f);
}

// ---- Greetings & essential phrases ----
const PHRASES = [
  { kr: "안녕하세요", rom: "annyeong-haseyo", en: "Hello" },
  { kr: "안녕히 가세요", rom: "annyeonghi gaseyo", en: "Goodbye (to someone leaving)" },
  { kr: "감사합니다", rom: "gamsahamnida", en: "Thank you" },
  { kr: "죄송합니다", rom: "joesong-hamnida", en: "I'm sorry" },
  { kr: "네", rom: "ne", en: "Yes" },
  { kr: "아니요", rom: "aniyo", en: "No" },
  { kr: "이거 주세요", rom: "igeo juseyo", en: "This one, please" },
  { kr: "얼마예요?", rom: "eolmayeyo?", en: "How much is it?" }
];

// ---- Numbers 1–10 (Sino-Korean — used for counting, money, phone numbers) ----
const NUMBERS = [
  { kr: "일", rom: "il", n: 1 },
  { kr: "이", rom: "i", n: 2 },
  { kr: "삼", rom: "sam", n: 3 },
  { kr: "사", rom: "sa", n: 4 },
  { kr: "오", rom: "o", n: 5 },
  { kr: "육", rom: "yuk", n: 6 },
  { kr: "칠", rom: "chil", n: 7 },
  { kr: "팔", rom: "pal", n: 8 },
  { kr: "구", rom: "gu", n: 9 },
  { kr: "십", rom: "sip", n: 10 }
];

// ---- Self-quiz — flip cards, Korean → English ----
const QUIZ = [
  { front: "안녕하세요", back: "Hello" },
  { front: "감사합니다", back: "Thank you" },
  { front: "죄송합니다", back: "I'm sorry" },
  { front: "네 / 아니요", back: "Yes / No" },
  { front: "저는 ___이에요", back: "I am ___ (name ends in a consonant)" },
  { front: "저는 ___예요", back: "I am ___ (name ends in a vowel)" },
  { front: "이거 주세요", back: "This one, please" },
  { front: "얼마예요?", back: "How much is it?" }
];
