/* Screen Balance - scoring logic (pure functions, no DOM). Works in browsers and Node. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Scoring = factory();
})(typeof self !== "undefined" ? self : this, function () {
  // Each question is scored 0-3 (0 = healthy, 3 = most concerning).
  const QUESTION_IDS = ["hours", "bedtime", "sleep", "sleepy", "focus", "eyes", "mood", "school", "social"];
  // Answers that, when scored 3, count as "red flags" for referral.
  const RED_FLAG_IDS = ["sleep", "mood", "school", "social"];
  const MAX = QUESTION_IDS.length * 3;

  function score(answers) {
    let total = 0;
    for (const id of QUESTION_IDS) {
      const v = Number(answers[id]);
      if (!Number.isInteger(v) || v < 0 || v > 3) throw new Error("Invalid answer for " + id);
      total += v;
    }
    const redFlags = RED_FLAG_IDS.filter((id) => Number(answers[id]) === 3);
    let level = total <= 9 ? "low" : total <= 17 ? "moderate" : "high";
    if (redFlags.length >= 2) level = "high";
    // Tips: the concerning answers (>= 2), worst first, at most 4.
    const tips = QUESTION_IDS.filter((id) => Number(answers[id]) >= 2)
      .sort((a, b) => Number(answers[b]) - Number(answers[a]))
      .slice(0, 4);
    return { total, max: MAX, level, redFlags, tips };
  }

  // Sleep planner: wake time "HH:MM" and age group -> bedtime window and screens-off time.
  function sleepPlan(wake, ageGroup) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(wake || "");
    if (!m) throw new Error("Invalid time");
    const wakeMin = Number(m[1]) * 60 + Number(m[2]);
    const [minH, maxH] = ageGroup === "teen" ? [8, 10] : [9, 11];
    const fmt = (min) => {
      const x = ((min % 1440) + 1440) % 1440;
      return String(Math.floor(x / 60)).padStart(2, "0") + ":" + String(x % 60).padStart(2, "0");
    };
    const latest = wakeMin - minH * 60;
    const earliest = wakeMin - maxH * 60;
    return { latestBedtime: fmt(latest), earliestBedtime: fmt(earliest), screensOff: fmt(latest - 60), hours: [minH, maxH] };
  }

  function aggregate(records) {
    const n = records.length;
    const out = { n, levels: { low: 0, moderate: 0, high: 0 }, avg: 0, pct: {} };
    if (!n) return out;
    let sum = 0, bed = 0, shortSleep = 0, eyes = 0;
    for (const r of records) {
      out.levels[r.level]++;
      sum += r.total;
      if (r.answers.bedtime >= 2) bed++;
      if (r.answers.sleep === 3) shortSleep++;
      if (r.answers.eyes >= 2) eyes++;
    }
    out.avg = Math.round((sum / n) * 10) / 10;
    const p = (x) => Math.round((x / n) * 100);
    out.pct = { screensBeforeBed: p(bed), shortSleep: p(shortSleep), eyeStrain: p(eyes) };
    return out;
  }

  function csvCell(v) {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s; // avoid spreadsheet formula injection
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function toCSV(records) {
    const head = ["date", "class", "level", "total", ...QUESTION_IDS];
    const rows = records.map((r) => [r.date, r.cls || "", r.level, r.total, ...QUESTION_IDS.map((id) => r.answers[id])]);
    return [head, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  }

  return { QUESTION_IDS, RED_FLAG_IDS, MAX, score, sleepPlan, aggregate, toCSV };
});
