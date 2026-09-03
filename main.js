// ============ HERO: build the word 안녕하세요, one block at a time ============
(function buildHero() {
  const word = "안녕하세요";
  const mount = document.getElementById("build-word");
  if (!mount) return;

  [...word].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "syl";
    span.textContent = ch;
    span.style.animationDelay = `${0.15 + i * 0.11}s`;
    mount.appendChild(span);
  });

  const sub = document.querySelector(".hero__title-sub");
  if (sub) sub.style.animationDelay = `${0.15 + word.length * 0.11 + 0.15}s`;
})();

// ============ VOWELS + CONSONANTS: flip-to-reveal grids ============
function buildGlyphGrid(mountId, items) {
  const root = document.getElementById(mountId);
  if (!root) return;

  items.forEach((item) => {
    const card = document.createElement("button");
    card.className = "glyph-card" + (item.tense ? " glyph-card--tense" : "");
    card.setAttribute("aria-pressed", "false");
    card.innerHTML = `
      <span class="glyph-card__face glyph-card__face--front">
        <span class="glyph-card__ch">${item.ch}</span>
      </span>
      <span class="glyph-card__face glyph-card__face--back">
        <span class="glyph-card__sound">${item.sound}</span>
        <span class="glyph-card__note">${item.note}</span>
      </span>
    `;
    card.addEventListener("click", () => {
      const flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", String(flipped));
    });
    root.appendChild(card);
  });
}

if (typeof VOWELS !== "undefined") buildGlyphGrid("vowel-grid", VOWELS);
if (typeof CONSONANTS !== "undefined") buildGlyphGrid("consonant-grid", CONSONANTS);

// ============ BLOCK BUILDER ============
(function buildBlockBuilder() {
  const initialsRoot = document.getElementById("builder-initials");
  const medialsRoot = document.getElementById("builder-medials");
  const finalsRoot = document.getElementById("builder-finals");
  const output = document.getElementById("builder-output");
  const hint = document.getElementById("builder-hint");
  if (!initialsRoot || typeof composeHangul === "undefined") return;

  const state = { initial: null, medial: null, final: "" };

  function makeOptionSet(root, values, key, allowEmpty) {
    if (allowEmpty) {
      const noneBtn = document.createElement("button");
      noneBtn.className = "builder__opt builder__opt--none is-active";
      noneBtn.textContent = "none";
      noneBtn.addEventListener("click", () => select(root, noneBtn, key, ""));
      root.appendChild(noneBtn);
    }
    values.forEach((v) => {
      const btn = document.createElement("button");
      btn.className = "builder__opt";
      btn.textContent = v;
      btn.addEventListener("click", () => select(root, btn, key, v));
      root.appendChild(btn);
    });
  }

  function select(root, btn, key, value) {
    root.querySelectorAll(".builder__opt").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    state[key] = value;
    render();
  }

  function render() {
    const composed = composeHangul(state.initial, state.medial, state.final);
    if (composed) {
      output.textContent = composed;
      output.classList.add("is-live");
      hint.textContent = `${state.initial}${state.medial ? " + " + state.medial : ""}${state.final ? " + " + state.final : ""} → this is a real, readable Hangul block.`;
    } else {
      output.textContent = "?";
      output.classList.remove("is-live");
      hint.textContent = state.initial
        ? "Now pick a vowel."
        : "Choose an initial and a vowel to begin.";
    }
  }

  makeOptionSet(initialsRoot, BUILDER_INITIALS, "initial", false);
  makeOptionSet(medialsRoot, BUILDER_MEDIALS, "medial", false);
  makeOptionSet(finalsRoot, BUILDER_FINALS.filter(Boolean), "final", true);
})();

// ============ PHRASES ============
(function buildPhrases() {
  const root = document.getElementById("phrase-grid");
  if (!root || typeof PHRASES === "undefined") return;

  PHRASES.forEach((p) => {
    const card = document.createElement("div");
    card.className = "phrase-card";
    card.innerHTML = `
      <span class="phrase-card__kr">${p.kr}</span>
      <span class="phrase-card__rom">${p.rom}</span>
      <span class="phrase-card__en">${p.en}</span>
    `;
    root.appendChild(card);
  });
})();

// ============ NUMBERS ============
(function buildNumbers() {
  const root = document.getElementById("number-row");
  if (!root || typeof NUMBERS === "undefined") return;

  NUMBERS.forEach((num) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.innerHTML = `
      <span class="number-card__n">${num.n}</span>
      <span class="number-card__kr">${num.kr}</span>
      <span class="number-card__rom">${num.rom}</span>
    `;
    root.appendChild(card);
  });
})();

// ============ QUIZ ============
(function buildQuiz() {
  const root = document.getElementById("quiz-grid");
  if (!root || typeof QUIZ === "undefined") return;

  QUIZ.forEach((q) => {
    const card = document.createElement("button");
    card.className = "quiz-card";
    card.setAttribute("aria-pressed", "false");
    card.innerHTML = `
      <span class="quiz-card__face quiz-card__face--front">${q.front}</span>
      <span class="quiz-card__face quiz-card__face--back">${q.back}</span>
    `;
    card.addEventListener("click", () => {
      const flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", String(flipped));
    });
    root.appendChild(card);
  });
})();

// ============ Reduced motion respect ============
if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reduced-motion");
}
