# 한글 시작 (hangul-sijak) — Learn to Read Hangul

A free, interactive first lesson in Korean — not a schedule page, an actual teaching tool. It takes someone from zero to reading and building real Hangul syllables, plus the essential greetings, numbers, and a self-intro sentence pattern, all in one sitting.

This is the **reading & writing foundation** — a companion site with audio pronunciation, roleplay, and pair-practice drills is planned as a follow-up.

**[Live demo →](#)** *(replace with your GitHub Pages URL after deploying — see below)*

## What's inside

- **A hero that builds itself.** The word 안녕하세요 assembles syllable by syllable on load, echoing how a Hangul block is built from parts.
- **Flip-to-learn vowel & consonant cards.** Tap any of the 10 vowels or 19 consonants to see how it sounds and what the shape represents.
- **A real syllable-block builder.** Pick an initial consonant, a vowel, and an optional final consonant (받침) and watch them compose into an actual, correct Hangul character live — using the real Unicode Hangul composition formula, not a lookup image.
- **Greetings, numbers, and a sentence pattern** — eight essential phrases, numbers 1–10, and the 저는 ___이에요/예요 self-intro pattern with a plain-language explanation of which ending to use.
- **A self-quiz.** Flip cards to check what stuck.
- **A 3D mascot.** A small character made only from primitive geometry (no model files) — literally shaped from the three strokes in 한 (ㅎ, ㅏ, ㄴ). Drag it to spin. Built with [Three.js](https://threejs.org/).
- Fully static: **no build step, no dependencies to install.** Open `index.html` or deploy as-is.

## Project structure

```
korean-class/
├── index.html          # page structure & content shell
├── css/
│   └── style.css        # design system (tokens, layout, motion)
├── js/
│   ├── lessons.js         # all lesson content — vowels, consonants, phrases, numbers, quiz, jamo maps
│   ├── main.js              # renders every section from lessons.js + the hero animation
│   └── mascot.js             # Three.js 3D character scene
└── README.md
```

## Running it locally

No build tools needed. Any static server works:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, pick your branch (e.g. `main`) and the root (`/`) folder.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.

## Editing the content

Everything lives in [`js/lessons.js`](js/lessons.js) as plain arrays — `VOWELS`, `CONSONANTS`, `PHRASES`, `NUMBERS`, `QUIZ` — plus the jamo index maps that power the block builder. Add, remove, or reword any entry there and the page re-renders it automatically. No HTML editing required.

The block builder (`BUILDER_INITIALS`, `BUILDER_MEDIALS`, `BUILDER_FINALS` in the same file) currently offers the basic 14 consonants, 10 basic vowels, and 8 common final consonants — enough to build hundreds of real syllables. Add more jamo to those arrays to expand it; `composeHangul()` already knows the full correct Unicode index for every initial, medial, and final consonant in the language.

## Credits & notes

- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [Noto Sans KR](https://fonts.google.com/noto/specimen/Noto+Sans+KR), loaded from Google Fonts.
- 3D: [Three.js](https://threejs.org/) r128, loaded from cdnjs — the only external script dependency.
- No tracking, no analytics, no external fonts/assets beyond the two above.

Built for a free community Korean class. Adapt freely for your own.
