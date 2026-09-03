// A small 3D character assembled from the three strokes that make up 한 (han):
//   ㅎ — a ring over a line   ㅏ — a vertical stroke with a tick   ㄴ — a bent stroke (base)
// Built with primitive geometry only — no external model files, so this drops
// straight into a GitHub repo with zero binary assets.

(function initMascot() {
  const mount = document.getElementById("mascot-mount");
  if (!mount || typeof THREE === "undefined") return;

  const COLORS = {
    ink: 0x14171c,
    paper: 0xf7f3ec,
    indigo: 0x3a5a8c,
    indigoDark: 0x24314a,
    dancheong: 0xc1432e,
    gold: 0xd4af37
  };

  let width = mount.clientWidth;
  let height = mount.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 0.6, 8.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  mount.appendChild(renderer.domElement);

  // ---- lighting ----
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(4, 6, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x9fb4d8, 0.5);
  fill.position.set(-5, -2, 3);
  scene.add(fill);
  const ambient = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambient);

  // ---- character group ----
  const character = new THREE.Group();

  // ㅇ — the head, a torus (open throat / circle)
  const headMat = new THREE.MeshStandardMaterial({ color: COLORS.paper, roughness: 0.45, metalness: 0.05 });
  const head = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.34, 24, 48), headMat);
  head.position.set(0, 2.05, 0);
  character.add(head);

  // face plate inside the ring, gives the head volume
  const faceMat = new THREE.MeshStandardMaterial({ color: COLORS.indigo, roughness: 0.5 });
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.78, 32, 32), faceMat);
  face.position.set(0, 2.05, -0.05);
  character.add(face);

  // two small dancheong-red eyes
  const eyeMat = new THREE.MeshStandardMaterial({ color: COLORS.dancheong, roughness: 0.3 });
  const eyeGeo = new THREE.SphereGeometry(0.1, 16, 16);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.32, 2.12, 0.68);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.32;
  character.add(eyeL, eyeR);

  // ㅏ — the body: a vertical stroke (cylinder) with a small tick (box), just like the vowel
  const bodyMat = new THREE.MeshStandardMaterial({ color: COLORS.indigoDark, roughness: 0.5 });
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.68, 2.1, 32), bodyMat);
  torso.position.set(0, 0.35, 0);
  character.add(torso);

  const tickMat = new THREE.MeshStandardMaterial({ color: COLORS.gold, roughness: 0.35, metalness: 0.2 });
  const tick = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.16), tickMat);
  tick.position.set(0.42, 1.05, 0.5);
  tick.rotation.z = -0.15;
  character.add(tick);

  // ㄴ — the base: a bent stroke made of two cylinders, like little feet/a plinth
  const baseMat = new THREE.MeshStandardMaterial({ color: COLORS.ink, roughness: 0.6 });
  const baseVert = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.9, 16), baseMat);
  baseVert.position.set(-0.55, -0.95, 0);
  character.add(baseVert);

  const baseHoriz = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.5, 16), baseMat);
  baseHoriz.rotation.z = Math.PI / 2;
  baseHoriz.position.set(0.05, -1.35, 0);
  character.add(baseHoriz);

  // soft ground shadow disc
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12 });
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1.5, 32), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.85;
  character.add(shadow);

  character.scale.setScalar(0.72);
  character.position.y = -0.3;
  scene.add(character);

  // ---- interaction: drag to spin, auto-rotate when idle ----
  let dragging = false;
  let prevX = 0;
  let prevY = 0;
  let velY = 0.004;
  let velX = 0;
  let idleTimer = null;

  function pointerDown(e) {
    dragging = true;
    prevX = (e.touches ? e.touches[0].clientX : e.clientX);
    prevY = (e.touches ? e.touches[0].clientY : e.clientY);
    clearTimeout(idleTimer);
  }
  function pointerMove(e) {
    if (!dragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const y = (e.touches ? e.touches[0].clientY : e.clientY);
    const dx = x - prevX;
    const dy = y - prevY;
    velY = dx * 0.005;
    velX = dy * 0.005;
    character.rotation.y += velY;
    character.rotation.x = Math.max(-0.6, Math.min(0.6, character.rotation.x + velX));
    prevX = x;
    prevY = y;
  }
  function pointerUp() {
    dragging = false;
    idleTimer = setTimeout(() => {
      velX = 0;
      velY = 0.004;
    }, 1200);
  }

  const dom = renderer.domElement;
  dom.style.touchAction = "none";
  dom.addEventListener("mousedown", pointerDown);
  window.addEventListener("mousemove", pointerMove);
  window.addEventListener("mouseup", pointerUp);
  dom.addEventListener("touchstart", pointerDown, { passive: true });
  window.addEventListener("touchmove", pointerMove, { passive: true });
  window.addEventListener("touchend", pointerUp);

  // ---- render loop ----
  const clock = new THREE.Clock();
  const reduced = document.documentElement.classList.contains("reduced-motion");

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!dragging) {
      character.rotation.y += reduced ? 0 : velY;
      character.rotation.x += -character.rotation.x * 0.02;
      velY += (0.004 - velY) * 0.01;
    }
    if (!reduced) {
      character.position.y = -0.3 + Math.sin(t * 1.1) * 0.08;
    }
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    width = mount.clientWidth;
    height = mount.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();
