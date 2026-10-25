# Screen Balance | توازن الشاشة

A free, bilingual (Arabic / English) health-education web tool for schools. It supports a community-health-nursing session on **"Brain Rot": the impact of excessive screen time on students' attention, sleep and academic performance**.

أداة تثقيف صحي مجانية بالعربية والإنجليزية للمدارس، ضمن جلسة صحة مجتمع عن تأثير الإفراط في الشاشات على الانتباه والنوم والأداء الدراسي.

> **Important:** "Brain Rot" is a popular term, **not** a formal medical diagnosis. This tool is educational. It does not diagnose anything and does not replace a nurse, counselor or doctor.

## What it does | ماذا تفعل

| Tab | Purpose | Prevention level |
|---|---|---|
| Check my habits / فحص عاداتي | 9 anonymous questions → Balanced / Early signs / Needs support, with tips and red flags | Secondary (early detection) |
| Eye break / استراحة العين | 20-20-20 timer (+ quick demo mode for class) | Primary |
| Sleep planner / مخطط النوم | Bedtime window and "screens off" time from the wake-up time | Primary |
| Pledge / الميثاق | Digital Balance Pledge, finger/pen signature on screen, printable card | Primary |
| Class summary / ملخص الصف | Anonymous totals per class, CSV export | Secondary / referral support |

Red flags used for referral (from the session): very little sleep, strong upset when screens are limited, falling grades, and withdrawal from family and friends. Two or more red flags raise the result to "Needs support".

## Privacy | الخصوصية

- No server, no accounts, no analytics, no external requests (strict Content-Security-Policy).
- Answers are saved **only if the student ticks the box**, **without a name**, in the browser's local storage on that device.
- The class summary has no login. Use it on a school device and share exported CSV files only with the health team.
- Please follow your school's and country's rules for student data before using it with real students.

## Run it | التشغيل

Open `index.html` in any modern browser. No build step.

```bash
npm test      # runs the scoring tests (Node 18+)
```

## Publish free with GitHub Pages | النشر المجاني

1. Create a new GitHub repository and upload these files (or `git push`).
2. Repository **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`, then Save.
4. After about a minute the site is live at `https://<your-username>.github.io/<repository-name>/`.

## Customize | التخصيص

- Texts and translations: `app.js` (object `T`).
- Scoring thresholds and red flags: `scoring.js` (`score`). Update `tests/scoring.test.js` if you change them.
- Colors and layout: `style.css`.

## How scoring works

Each of the 9 questions scores 0 (healthy) to 3 (most concerning). Total 0 to 9: Balanced; 10 to 17: Early signs; 18 to 27: Needs support. Tips come from the answers scored 2 or 3. The thresholds are a simple teaching screen created for this session, **not a validated clinical instrument**. For clinical assessment use validated tools such as the Smartphone Addiction Scale or Young's Internet Addiction Test through a qualified professional.

## References

Hale & Guan (2015), *Sleep Medicine Reviews*; Walsh et al. (2018), *The Lancet Child & Adolescent Health*; Kwon et al. (2013), *PLoS ONE*; Young (1998), *CyberPsychology & Behavior*; WHO (2019) guidelines on physical activity, sedentary behaviour and sleep.

## License

MIT. See `LICENSE`.
