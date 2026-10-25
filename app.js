/* Screen Balance - UI. No frameworks, no network requests, no tracking. */
(function () {
  "use strict";
  const S = window.Scoring;
  const KEY = "screenBalance.records.v1", LANG = "screenBalance.lang";

  const T = {
    ar: {
      title: "توازن الشاشة", sub: "أداة تثقيف صحي للمدارس: الشاشات والانتباه والنوم والأداء الدراسي", lang: "English",
      tabs: { check: "فحص عاداتي", eyes: "استراحة العين", sleep: "مخطط النوم", pledge: "الميثاق", nurse: "ملخص الصف" },
      disclaimer: "\"Brain Rot\" مصطلح شائع وليس تشخيصاً طبياً رسمياً. هذه أداة تثقيفية لبدء الحديث وليست تشخيصاً. عند القلق، تحدثي أو تحدث مع ممرضة المدرسة أو المرشدة أو الأهل أو الطبيب.",
      privacy: "الخصوصية: لا تُرسل أي بيانات عبر الإنترنت. كل شيء يبقى على هذا الجهاز فقط.",
      intro: "أجب عن 9 أسئلة قصيرة وصريحة. لا توجد إجابة صحيحة أو خاطئة.",
      q: {
        hours: ["كم ساعة باليوم تستخدم الشاشات للتسلية (ألعاب، فيديو، تواصل)؟", ["أقل من ساعتين", "2 إلى 4 ساعات", "4 إلى 6 ساعات", "أكثر من 6 ساعات"]],
        bedtime: ["هل توقف الشاشات قبل النوم بـ 60 دقيقة على الأقل؟", ["دائماً", "أحياناً", "نادراً", "أبداً"]],
        sleep: ["كم ساعة تنام عادةً في أيام الدراسة؟", ["9 ساعات أو أكثر", "8 ساعات", "7 ساعات", "أقل من 7 ساعات"]],
        sleepy: ["هل تشعر بنعاس شديد خلال اليوم الدراسي؟", ["أبداً", "أحياناً", "كثيراً", "تقريباً كل يوم"]],
        focus: ["هل تصعّب عليك الإشعارات والتنقل بين التطبيقات التركيز في الدراسة أو الحصة؟", ["أبداً", "أحياناً", "كثيراً", "تقريباً دائماً"]],
        eyes: ["هل تعاني من صداع أو حرقة أو تعب في العينين بعد الشاشات؟", ["أبداً", "أحياناً", "كثيراً", "تقريباً كل يوم"]],
        mood: ["هل تغضب أو تنزعج عندما يحدّ أحد من وقت الشاشة؟", ["أبداً", "أحياناً", "كثيراً", "تقريباً دائماً"]],
        school: ["هل تراجعت علاماتك أو تأخرت واجباتك بسبب الشاشات؟", ["أبداً", "قليلاً", "إلى حد ما", "كثيراً"]],
        social: ["هل تتخلى عن وقتك مع العائلة أو الصديقات والأصدقاء لتبقى على الشاشات؟", ["أبداً", "أحياناً", "كثيراً", "تقريباً دائماً"]],
      },
      tip: {
        hours: "حدّد مع أهلك سقفاً يومياً للتسلية على الشاشة واختر ساعات بلا شاشات.",
        bedtime: "أوقف الشاشات الترفيهية قبل النوم بساعة، واشحن الهاتف خارج غرفة النوم.",
        sleep: "اهدف إلى 9 ساعات نوم أو أكثر بموعد نوم ثابت حتى في العطلة.",
        sleepy: "النعاس نهاراً غالباً علامة قلة نوم، فاحمِ موعد نومك.",
        focus: "أغلق الإشعارات غير الضرورية وضع الهاتف في غرفة أخرى أثناء الدراسة.",
        eyes: "طبّق قاعدة 20-20-20: كل 20 دقيقة انظر إلى شيء يبعد 6 أمتار لمدة 20 ثانية.",
        mood: "لاحظ الشعور وخذ نفساً عميقاً، واتفق على قواعد الشاشة مع أهلك مسبقاً.",
        school: "ادرس أولاً ثم الشاشة، واستخدم مؤقتاً لفترات الواجب.",
        social: "خطط لنشاط واحد بلا شاشات كل يوم مع العائلة أو الأصدقاء.",
      },
      flagLabel: { sleep: "نوم قليل جداً", mood: "انزعاج شديد عند تقييد الشاشة", school: "تراجع دراسي", social: "ابتعاد عن العائلة والأصدقاء" },
      res: { low: "متوازن، استمر!", moderate: "علامات مبكرة، تعديلات بسيطة تفيد", high: "تحتاج إلى دعم، تحدث مع شخص بالغ" },
      resMsg: {
        low: "عاداتك تبدو صحية. حافظ عليها وجرّب قاعدة 20-20-20.",
        moderate: "تحدث مع ممرضة المدرسة أو شخص بالغ تثق به، وجرّب النصائح التالية لمدة أسبوع.",
        high: "نوصي بالتحدث قريباً مع ممرضة المدرسة أو المرشدة أو أحد الوالدين، وقد يفيد فحص الطبيب. أنت لست وحدك.",
      },
      score: "النتيجة", flags: "إشارات تستحق الانتباه", tipsT: "نصائح لك", genericTip: "استمر على عاداتك الجيدة.",
      submit: "اعرض نتيجتي", again: "إعادة", fill: "الرجاء الإجابة عن كل الأسئلة.",
      saveOpt: "احفظ إجاباتي بدون اسم على هذا الجهاز ليرى الفريق الصحي ملخص الصف", cls: "رمز الصف (اختياري)", saved: "تم الحفظ بدون اسم.",
      eyesT: "استراحة العين 20-20-20", eyesD: "كل 20 دقيقة انظر إلى شيء يبعد 20 قدماً (6 أمتار) لمدة 20 ثانية.",
      start: "ابدأ", stop: "إيقاف", demo: "وضع تجريبي سريع للحصة (10 ثوانٍ و5 ثوانٍ)", work: "ركّز في دراستك", rest: "استراحة! انظر بعيداً الآن", done: "أحسنت! عُد للدراسة.",
      sleepT: "مخطط النوم", wake: "وقت الاستيقاظ", age: "الفئة العمرية", child: "6 إلى 12 سنة (9 إلى 11 ساعة)", teen: "13 إلى 17 سنة (8 إلى 10 ساعات)",
      sleepRes: (p) => `نم بين ${p.earliestBedtime} و${p.latestBedtime}. أوقف الشاشات الترفيهية عند ${p.screensOff}.`,
      pledgeT: "ميثاق التوازن الرقمي", pledgeIntro: "نحن الطلبة الموقّعون أدناه نتعهّد ونلتزم بالمواد التالية:",
      art: ["الشاشات ممنوعة في غرف النوم وعلى سفرة الطعام.", "يُوقَف استخدام الشاشات الترفيهية قبل النوم بساعة على الأقل.", "تُريَّح العينان 20 ثانية بعد كل 20 دقيقة دراسة على الشاشة (قاعدة 20-20-20).", "تُستخدم الشاشة للتعلّم بمسؤولية، وتُكتم الإشعارات أثناء الدراسة.", "يُبلَّغ عن أي أثر للشاشات على النوم أو المزاج أو العلامات إلى الممرضة أو المعلمة أو أحد الوالدين."],
      artN: "المادة", pick: "عادتي لهذا الأسبوع", habits: ["لا هاتف في السرير", "إيقاف الشاشات قبل النوم بساعة", "20-20-20 أثناء الدراسة", "كتم الإشعارات وقت الدراسة", "نشاط يومي بلا شاشات"],
      nameL: "الاسم", signL: "وقّع بإصبعك أو بالقلم", clear: "مسح", print: "اطبع الميثاق", agree: "أوافق على المواد الخمس", date: "التاريخ",
      nurseT: "ملخص الصف (بدون أسماء)", nurseNote: "البيانات من هذا الجهاز فقط. لا يوجد تسجيل دخول، فضعه على جهاز المدرسة ولا تشارك الملفات المصدّرة إلا مع الفريق الصحي.",
      n: "عدد الإجابات", avg: "متوسط الدرجة", lv: { low: "متوازن", moderate: "علامات مبكرة", high: "يحتاج دعماً" },
      p1: "شاشات قبل النوم", p2: "نوم أقل من 7 ساعات", p3: "إجهاد العين", all: "كل الصفوف", empty: "لا توجد بيانات بعد.", export: "تصدير CSV", wipe: "حذف كل البيانات", sure: "هل أنت متأكد من حذف كل البيانات المحفوظة على هذا الجهاز؟",
      refer: "للتحويل: ينصح عند المستوى المرتفع أو وجود علامات خطر بالتواصل مع مرشدة المدرسة أو طبيب الأطفال أو أخصائي الصحة النفسية.",
    },
    en: {
      title: "Screen Balance", sub: "A school health-education tool: screens, attention, sleep and learning", lang: "العربية",
      tabs: { check: "Check my habits", eyes: "Eye break", sleep: "Sleep planner", pledge: "Pledge", nurse: "Class summary" },
      disclaimer: "\"Brain Rot\" is a popular term, not a formal medical diagnosis. This is an educational tool to start a conversation, not a diagnosis. If you are worried, talk to the school nurse, counselor, a parent or a doctor.",
      privacy: "Privacy: nothing is sent over the internet. Everything stays on this device only.",
      intro: "Answer 9 short, honest questions. There are no right or wrong answers.",
      q: {
        hours: ["How many hours a day do you use screens for fun (games, videos, social media)?", ["Less than 2", "2 to 4", "4 to 6", "More than 6"]],
        bedtime: ["Do you stop screens at least 60 minutes before sleep?", ["Always", "Sometimes", "Rarely", "Never"]],
        sleep: ["How many hours do you usually sleep on school nights?", ["9 or more", "8", "7", "Less than 7"]],
        sleepy: ["Do you feel very sleepy during the school day?", ["Never", "Sometimes", "Often", "Almost every day"]],
        focus: ["Do notifications or switching apps make it hard to focus on study or class?", ["Never", "Sometimes", "Often", "Almost always"]],
        eyes: ["Do you get headaches, burning or tired eyes after screens?", ["Never", "Sometimes", "Often", "Almost every day"]],
        mood: ["Do you get angry or upset when someone limits your screen time?", ["Never", "Sometimes", "Often", "Almost always"]],
        school: ["Have your grades dropped or homework been late because of screens?", ["Not at all", "A little", "Quite a bit", "A lot"]],
        social: ["Do you skip time with family or friends to stay on screens?", ["Never", "Sometimes", "Often", "Almost always"]],
      },
      tip: {
        hours: "Agree a daily limit for fun screen time with your family and choose screen-free hours.",
        bedtime: "Stop recreational screens 60 minutes before bed and charge your phone outside the bedroom.",
        sleep: "Aim for 9+ hours of sleep with a fixed bedtime, even on weekends.",
        sleepy: "Daytime sleepiness often means too little sleep, so protect your bedtime.",
        focus: "Turn off non-essential notifications and keep your phone in another room while studying.",
        eyes: "Use the 20-20-20 rule: every 20 minutes look at something 20 feet (6 m) away for 20 seconds.",
        mood: "Notice the feeling, take a deep breath, and agree screen rules with your family in advance.",
        school: "Study first, screens after, and use a timer for homework blocks.",
        social: "Plan one screen-free activity every day with family or friends.",
      },
      flagLabel: { sleep: "Very little sleep", mood: "Strong upset when screens are limited", school: "Falling grades", social: "Pulling away from family and friends" },
      res: { low: "Balanced, keep it up!", moderate: "Early signs: small changes help", high: "Needs support: talk to an adult" },
      resMsg: {
        low: "Your habits look healthy. Keep them up and try the 20-20-20 rule.",
        moderate: "Talk to the school nurse or an adult you trust, and try the tips below for one week.",
        high: "We recommend talking soon with the school nurse, counselor or a parent; a doctor check may help. You are not alone.",
      },
      score: "Score", flags: "Signs worth attention", tipsT: "Tips for you", genericTip: "Keep up your good habits.",
      submit: "Show my result", again: "Start over", fill: "Please answer every question.",
      saveOpt: "Save my answers (no name) on this device so the health team can see class totals", cls: "Class code (optional)", saved: "Saved without a name.",
      eyesT: "20-20-20 eye break", eyesD: "Every 20 minutes look at something 20 feet (6 m) away for 20 seconds.",
      start: "Start", stop: "Stop", demo: "Quick classroom demo mode (10 s and 5 s)", work: "Focus on your studying", rest: "Break time! Look far away now", done: "Well done! Back to work.",
      sleepT: "Sleep planner", wake: "Wake-up time", age: "Age group", child: "6 to 12 years (9 to 11 hours)", teen: "13 to 17 years (8 to 10 hours)",
      sleepRes: (p) => `Go to bed between ${p.earliestBedtime} and ${p.latestBedtime}. Stop recreational screens at ${p.screensOff}.`,
      pledgeT: "Digital Balance Pledge", pledgeIntro: "We, the undersigned students, solemnly pledge and bind ourselves to uphold the following Articles:",
      art: ["Screens shall be kept out of bedrooms and away from the dining table.", "Recreational screens shall be stopped at least 60 minutes before sleep.", "The eyes shall be rested for 20 seconds after every 20 minutes of screen study (20-20-20).", "Screens shall be used for learning responsibly, with notifications silenced during study.", "Any effect of screens on sleep, mood, or grades shall be reported to a nurse, teacher, or parent."],
      artN: "Article", pick: "My habit for this week", habits: ["No phone in bed", "Screens off 60 minutes before sleep", "20-20-20 while studying", "Silence notifications while studying", "One screen-free activity daily"],
      nameL: "Name", signL: "Sign with your finger or a pen", clear: "Clear", print: "Print the pledge", agree: "I agree to all five Articles", date: "Date",
      nurseT: "Class summary (no names)", nurseNote: "Data comes from this device only. There is no login, so keep it on a school device and share exported files only with the health team.",
      n: "Responses", avg: "Average score", lv: { low: "Balanced", moderate: "Early signs", high: "Needs support" },
      p1: "Screens before bed", p2: "Sleep under 7 hours", p3: "Eye strain", all: "All classes", empty: "No data yet.", export: "Export CSV", wipe: "Delete all data", sure: "Delete all data saved on this device?",
      refer: "Referral: for a high level or any red flags, contact the school counselor, a pediatrician or a mental-health specialist.",
    },
  };

  let lang = "ar", tab = "check";
  try { lang = localStorage.getItem(LANG) || "ar"; } catch (e) {}
  const t = () => T[lang];

  const h = (tag, attrs, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "class") el.className = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  };
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const save = (r) => { try { localStorage.setItem(KEY, JSON.stringify(r)); return true; } catch (e) { return false; } };

  // ---------- Views ----------
  function viewCheck() {
    const box = h("div");
    const form = h("form", { novalidate: true });
    const names = S.QUESTION_IDS;
    names.forEach((id, i) => {
      const [q, opts] = t().q[id];
      form.append(h("div", { class: "card q" }, h("fieldset", {}, h("legend", {}, `${i + 1}. ${q}`),
        h("div", { class: "opts" }, opts.map((o, v) => h("label", {}, h("input", { type: "radio", name: id, value: v }), o))))));
    });
    const save1 = h("input", { type: "checkbox", id: "saveOpt" });
    const cls = h("input", { type: "text", id: "cls", maxlength: 12, autocomplete: "off" });
    const msg = h("p", { class: "note", role: "alert" });
    form.append(h("div", { class: "card" },
      h("label", {}, save1, " ", t().saveOpt), h("p", {}, h("label", {}, t().cls + ": ", cls)),
      msg, h("button", { class: "btn", type: "submit" }, t().submit)));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ans = {};
      for (const id of names) { const c = form.querySelector(`input[name=${id}]:checked`); if (!c) { msg.textContent = t().fill; return; } ans[id] = Number(c.value); }
      const r = S.score(ans);
      let note = "";
      if (save1.checked) {
        const rec = load(); rec.push({ date: new Date().toISOString().slice(0, 10), cls: cls.value.trim().slice(0, 12), level: r.level, total: r.total, answers: ans });
        note = save(rec) ? t().saved : "";
      }
      box.replaceChildren(resultView(r, note));
      if (box.scrollIntoView) box.scrollIntoView();
    });
    box.append(h("p", {}, t().intro), form);
    return box;
  }
  function resultView(r, note) {
    const tt = t();
    const out = h("div", {}, h("div", { class: "level " + r.level }, tt.res[r.level], h("div", { class: "note" }, `${tt.score}: ${r.total} / ${r.max}`)),
      h("p", {}, tt.resMsg[r.level]));
    if (r.redFlags.length) out.append(h("div", { class: "card" }, h("h3", {}, tt.flags), h("ul", {}, r.redFlags.map((f) => h("li", {}, tt.flagLabel[f])))));
    out.append(h("div", { class: "card" }, h("h3", {}, tt.tipsT), h("ul", {}, (r.tips.length ? r.tips.map((k) => tt.tip[k]) : [tt.genericTip]).map((x) => h("li", {}, x)))));
    if (r.level !== "low") out.append(h("p", { class: "note" }, tt.refer));
    if (note) out.append(h("p", { class: "note" }, note));
    out.append(h("button", { class: "btn alt", type: "button", onclick: () => render() }, tt.again));
    return out;
  }

  let timer = null;
  function viewEyes() {
    const tt = t(), disp = h("div", { class: "big", "aria-live": "polite" }, "20:00"), status = h("p", { role: "status" }, tt.work);
    const demo = h("input", { type: "checkbox", id: "demo" }), btn = h("button", { class: "btn", type: "button" }, tt.start);
    const fmt = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
    const beep = () => { try { const a = new (window.AudioContext || window.webkitAudioContext)(), o = a.createOscillator(); o.connect(a.destination); o.frequency.value = 660; o.start(); o.stop(a.currentTime + 0.25); } catch (e) {} };
    const stop = () => { clearInterval(timer); timer = null; btn.textContent = tt.start; disp.textContent = fmt(demo.checked ? 10 : 1200); status.textContent = tt.work; };
    btn.addEventListener("click", () => {
      if (timer) return stop();
      let phase = "work", left = demo.checked ? 10 : 1200; btn.textContent = tt.stop; status.textContent = tt.work; disp.textContent = fmt(left);
      timer = setInterval(() => {
        left--; disp.textContent = fmt(left);
        if (left > 0) return;
        beep();
        if (phase === "work") { phase = "rest"; left = demo.checked ? 5 : 20; status.textContent = tt.rest; }
        else { phase = "work"; left = demo.checked ? 10 : 1200; status.textContent = tt.done + " " + tt.work; }
        disp.textContent = fmt(left);
      }, 1000);
    });
    demo.addEventListener("change", stop);
    return h("div", { class: "card" }, h("h2", {}, tt.eyesT), h("p", {}, tt.eyesD), disp, status, h("p", {}, h("label", {}, demo, " ", tt.demo)), btn);
  }

  function viewSleep() {
    const tt = t(), wake = h("input", { type: "time", id: "wake", value: "06:30" }),
      age = h("select", { id: "age" }, h("option", { value: "child" }, tt.child), h("option", { value: "teen" }, tt.teen)), out = h("p", { class: "level low", role: "status" });
    const upd = () => { try { out.textContent = tt.sleepRes(S.sleepPlan(wake.value, age.value)); } catch (e) { out.textContent = ""; } };
    wake.addEventListener("input", upd); age.addEventListener("change", upd); upd();
    return h("div", { class: "card" }, h("h2", {}, tt.sleepT), h("div", { class: "row" }, h("label", {}, tt.wake + ": ", wake), h("label", {}, tt.age + ": ", age)), out);
  }

  function viewPledge() {
    const tt = t(), name = h("input", { type: "text", id: "pname", maxlength: 40, autocomplete: "off" }),
      habit = h("select", {}, tt.habits.map((x) => h("option", { value: x }, x))), agree = h("input", { type: "checkbox" }),
      cv = h("canvas", { width: 520, height: 160, "aria-label": tt.signL });
    const ctx = cv.getContext("2d") || { beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, clearRect() {} };
    ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.strokeStyle = "#12263f";
    let down = false, inked = false;
    const pos = (e) => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) * (cv.width / b.width), (e.clientY - b.top) * (cv.height / b.height)]; };
    cv.addEventListener("pointerdown", (e) => { down = true; inked = true; cv.setPointerCapture(e.pointerId); ctx.beginPath(); ctx.moveTo(...pos(e)); });
    cv.addEventListener("pointermove", (e) => { if (down) { ctx.lineTo(...pos(e)); ctx.stroke(); } });
    cv.addEventListener("pointerup", () => { down = false; });
    const card = h("div", { class: "printcard" });
    const print = h("button", { class: "btn", type: "button", onclick: () => {
      if (!agree.checked) { agree.focus(); return; }
      const img = h("img", { src: inked ? cv.toDataURL("image/png") : "", alt: "", width: 260 });
      card.replaceChildren(h("h1", {}, tt.pledgeT), h("p", {}, tt.pledgeIntro), h("ol", {}, tt.art.map((a) => h("li", {}, a))),
        h("p", {}, `${tt.nameL}: ${name.value || "________"}`), h("p", {}, `${tt.pick}: ${habit.value}`), inked ? img : null, h("p", {}, `${tt.date}: ${new Date().toISOString().slice(0, 10)}`));
      window.print();
    } }, tt.print);
    return h("div", {}, h("div", { class: "card pledge" }, h("h2", {}, tt.pledgeT), h("p", {}, tt.pledgeIntro),
      h("ol", {}, tt.art.map((a, i) => h("li", {}, h("b", {}, `${tt.artN} ${i + 1}: `), a))),
      h("p", {}, h("label", {}, tt.nameL + ": ", name)), h("p", {}, h("label", {}, tt.pick + ": ", habit)),
      h("p", {}, tt.signL), cv, h("p", {}, h("button", { class: "btn alt", type: "button", onclick: () => { ctx.clearRect(0, 0, cv.width, cv.height); inked = false; } }, tt.clear)),
      h("p", {}, h("label", {}, agree, " ", tt.agree)), print), card);
  }

  function viewNurse() {
    const tt = t(), recs = load(), sel = h("select", {}, h("option", { value: "" }, tt.all), [...new Set(recs.map((r) => r.cls).filter(Boolean))].sort().map((c) => h("option", { value: c }, c)));
    const body = h("div");
    const draw = () => {
      const f = recs.filter((r) => !sel.value || r.cls === sel.value), g = S.aggregate(f);
      if (!g.n) { body.replaceChildren(h("p", {}, tt.empty)); return; }
      const col = { low: "#178f88", moderate: "#c9922e", high: "#d9604c" };
      body.replaceChildren(h("p", {}, `${tt.n}: ${g.n} | ${tt.avg}: ${g.avg}`),
        ...["low", "moderate", "high"].map((k) => { const f2 = h("div", { class: "fill" }); f2.style.width = Math.round((g.levels[k] / g.n) * 100) + "%"; f2.style.background = col[k]; return h("div", { class: "bar" }, h("span", { class: "l" }, tt.lv[k]), f2, h("span", {}, g.levels[k])); }),
        h("table", {}, h("tr", {}, h("td", {}, tt.p1), h("td", {}, g.pct.screensBeforeBed + "%")), h("tr", {}, h("td", {}, tt.p2), h("td", {}, g.pct.shortSleep + "%")), h("tr", {}, h("td", {}, tt.p3), h("td", {}, g.pct.eyeStrain + "%"))),
        h("p", { class: "note" }, tt.refer));
    };
    sel.addEventListener("change", draw); draw();
    const exp = h("button", { class: "btn", type: "button", onclick: () => {
      const a = h("a", { href: URL.createObjectURL(new Blob(["\ufeff" + S.toCSV(recs)], { type: "text/csv" })), download: "screen-balance.csv" }); a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    } }, tt.export);
    const wipe = h("button", { class: "btn alt", type: "button", onclick: () => { if (confirm(tt.sure)) { save([]); render(); } } }, tt.wipe);
    return h("div", { class: "card" }, h("h2", {}, tt.nurseT), h("p", { class: "note" }, tt.nurseNote), h("p", {}, sel), body, h("p", { class: "row" }, exp, wipe));
  }

  // ---------- Shell ----------
  const views = { check: viewCheck, eyes: viewEyes, sleep: viewSleep, pledge: viewPledge, nurse: viewNurse };
  function render() {
    if (timer) { clearInterval(timer); timer = null; }
    const tt = t();
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = tt.title;
    document.getElementById("appTitle").textContent = tt.title;
    document.getElementById("appSub").textContent = tt.sub;
    document.getElementById("langBtn").textContent = tt.lang;
    const nav = document.getElementById("tabs");
    nav.replaceChildren(...Object.keys(views).map((k) => h("button", { type: "button", role: "tab", "aria-selected": k === tab, onclick: () => { tab = k; render(); } }, tt.tabs[k])));
    document.getElementById("view").replaceChildren(views[tab]());
    document.getElementById("foot").replaceChildren(h("p", {}, tt.disclaimer), h("p", {}, tt.privacy));
  }
  document.getElementById("langBtn").addEventListener("click", () => { lang = lang === "ar" ? "en" : "ar"; try { localStorage.setItem(LANG, lang); } catch (e) {} render(); });
  render();
})();
