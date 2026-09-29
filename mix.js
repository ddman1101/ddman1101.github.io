// A club-style spectrum analyser pulsing at 124 BPM. Synthetic, no audio.
(function () {
  const cv = document.getElementById("mix");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const BPM = 124, MAXBARS = 96;
  let BARS = MAXBARS;
  let seed = 5;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const tilt = Array.from({ length: MAXBARS }, () => 0.15 * rnd());
  const phase = Array.from({ length: MAXBARS }, () => rnd() * Math.PI * 2);
  const peak = new Array(MAXBARS).fill(0);
  let w = 0, h = 0;

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    BARS = Math.max(24, Math.min(MAXBARS, Math.floor(w / 14)));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const beat = (t / 1000) * BPM / 60, ph = beat % 1;
    const kick = Math.exp(-ph * 6), hat = Math.exp(-((beat + 0.5) % 1) * 9);
    const gap = 3, bw = (w - gap * (BARS - 1)) / BARS, seg = 5, segGap = 2;
    for (let i = 0; i < BARS; i++) {
      const low = i < BARS * 0.18, high = i > BARS * 0.62;
      const drive = low ? 0.35 + 0.65 * kick : high ? 0.3 + 0.5 * hat : 0.45 + 0.25 * Math.sin(t / 700 + phase[i]);
      const v = Math.min(0.97, 1.45 * (0.95 - 0.55 * (i / BARS) + tilt[i]) * drive * (0.85 + 0.15 * Math.sin(t / 230 + phase[i] * 3)));
      peak[i] = Math.max(v, peak[i] - 0.012);
      const x = i * (bw + gap), n = Math.floor((v * h) / (seg + segGap));
      for (let k = 0; k < n; k++) {
        const y = h - (k + 1) * (seg + segGap);
        const hot = y < h * 0.3;
        ctx.shadowColor = hot ? "#ff2bd6" : "#19e3ff"; ctx.shadowBlur = hot ? 10 : 6;
        const f = k / (h / (seg + segGap));            // 0 bottom .. 1 top
        ctx.fillStyle = hot ? "#ff2bd6" : f > 0.4 ? "rgba(124,77,255,0.85)" : "rgba(25,227,255," + (0.45 + f) + ")";
        ctx.fillRect(x, y, bw, seg);
      }
      ctx.fillStyle = "#f3effc";
      ctx.fillRect(x, h - peak[i] * h - 2, bw, 2);
    }
    if (!still) requestAnimationFrame(draw);
  }

  size();
  window.addEventListener("resize", () => { size(); if (still) draw(1234); });
  if (still) draw(1234); else requestAnimationFrame(draw);
})();
