const test = require("node:test");
const assert = require("node:assert/strict");
const S = require("../scoring.js");
const all = (v) => Object.fromEntries(S.QUESTION_IDS.map((id) => [id, v]));

test("healthy answers are low", () => {
  const r = S.score(all(0));
  assert.equal(r.level, "low"); assert.equal(r.total, 0); assert.deepEqual(r.tips, []);
});
test("boundaries", () => {
  assert.equal(S.score(all(1)).total, 9);
  assert.equal(S.score(all(1)).level, "low");
  const a = all(1); a.hours = 2; assert.equal(S.score(a).level, "moderate");
  assert.equal(S.score(all(2)).level, "high"); // 18 points
});
test("two red flags force high level", () => {
  const a = all(0); a.mood = 3; a.social = 3;
  const r = S.score(a);
  assert.equal(r.level, "high"); assert.deepEqual(r.redFlags.sort(), ["mood", "social"]);
});
test("one red flag alone does not", () => {
  const a = all(0); a.school = 3;
  assert.equal(S.score(a).level, "low");
});
test("tips are worst-first and capped at 4", () => {
  const r = S.score(all(3));
  assert.equal(r.tips.length, 4);
});
test("invalid answers throw", () => {
  const a = all(0); a.hours = 5;
  assert.throws(() => S.score(a));
  assert.throws(() => S.score({}));
});
test("sleep plan", () => {
  const p = S.sleepPlan("06:30", "child");
  assert.equal(p.latestBedtime, "21:30"); assert.equal(p.earliestBedtime, "19:30"); assert.equal(p.screensOff, "20:30");
  assert.equal(S.sleepPlan("07:00", "teen").latestBedtime, "23:00");
  assert.throws(() => S.sleepPlan("abc", "child"));
});
test("aggregate and csv", () => {
  const recs = [
    { date: "2026-10-26", cls: "6A", level: "low", total: 3, answers: { ...all(0), hours: 3 } },
    { date: "2026-10-26", cls: "=6B", level: "high", total: 27, answers: all(3) },
  ];
  const g = S.aggregate(recs);
  assert.equal(g.n, 2); assert.equal(g.levels.high, 1); assert.equal(g.avg, 15); assert.equal(g.pct.screensBeforeBed, 50);
  const csv = S.toCSV(recs);
  assert.ok(csv.split("\n")[2].includes("'=6B")); // formula injection neutralised
  assert.deepEqual(S.aggregate([]).levels, { low: 0, moderate: 0, high: 0 });
});
