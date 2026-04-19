// =============================================================
// STEAM CRON STUDIO — Cron Natural Language Translator
// Arabic & English → cron expression, and reverse
// =============================================================

// ── Day maps ───────────────────────────────────────────────────
const DAYS_AR = {
  'الأحد': 0, 'أحد': 0,
  'الاثنين': 1, 'اثنين': 1, 'الإثنين': 1,
  'الثلاثاء': 2, 'ثلاثاء': 2,
  'الأربعاء': 3, 'أربعاء': 3,
  'الخميس': 4, 'خميس': 4,
  'الجمعة': 5, 'جمعة': 5,
  'السبت': 6, 'سبت': 6,
};

const DAYS_EN = {
  'sunday': 0, 'sun': 0,
  'monday': 1, 'mon': 1,
  'tuesday': 2, 'tue': 2,
  'wednesday': 3, 'wed': 3,
  'thursday': 4, 'thu': 4,
  'friday': 5, 'fri': 5,
  'saturday': 6, 'sat': 6,
};

const DAY_NAMES_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const DAY_NAMES_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ── Time period maps (Arabic) ──────────────────────────────────
const PERIODS_AR = {
  'صباحاً': 'am', 'صباح': 'am',
  'ظهراً':  'pm12', 'ظهر': 'pm12',
  'عصراً':  'pm',  'عصر': 'pm',
  'مساءً':  'pm',  'مساء': 'pm',
  'ليلاً':  'pm',  'ليل': 'pm',
};

// ── Number word maps ───────────────────────────────────────────
const NUMS_AR = {
  'واحدة': 1, 'واحد': 1,
  'اثنتين': 2, 'اثنين': 2, 'ثنتين': 2,
  'ثلاثة': 3, 'ثلاث': 3,
  'أربعة': 4, 'أربع': 4,
  'خمسة': 5, 'خمس': 5,
  'ستة': 6, 'ست': 6,
  'سبعة': 7, 'سبع': 7,
  'ثمانية': 8, 'ثمان': 8,
  'تسعة': 9, 'تسع': 9,
  'عشرة': 10, 'عشر': 10,
  'إحدى عشرة': 11, 'أحد عشر': 11,
  'اثنا عشر': 12, 'اثنتا عشرة': 12,
};

/**
 * Parse an Arabic/English time string to { hour, minute }
 * Handles: "الساعة 4", "4:30", "الساعة الرابعة", "2 ظهراً", "3:15 عصراً"
 */
function parseTime(text) {
  text = text.trim();

  // Match HH:MM or H:MM
  const colonMatch = text.match(/(\d{1,2}):(\d{2})/);
  if (colonMatch) {
    return { hour: parseInt(colonMatch[1]), minute: parseInt(colonMatch[2]) };
  }

  // Match standalone digit
  const digitMatch = text.match(/(\d{1,2})/);
  if (digitMatch) {
    return { hour: parseInt(digitMatch[1]), minute: 0 };
  }

  // Match Arabic number words
  for (const [word, num] of Object.entries(NUMS_AR)) {
    if (text.includes(word)) {
      return { hour: num, minute: 0 };
    }
  }

  return null;
}

/**
 * Apply AM/PM correction to hour
 */
function applyPeriod(hour, period) {
  if (!period) return hour;
  if (period === 'am') {
    return hour === 12 ? 0 : hour;
  }
  if (period === 'pm12') {
    return 12; // noon
  }
  if (period === 'pm') {
    // ظهراً/عصراً/مساء/ليل: 1–6 → add 12, 7–11 → already PM in Arabic context
    if (hour >= 1 && hour <= 6) return hour + 12;
    if (hour === 12) return 12;
    return hour;
  }
  return hour;
}

/**
 * Translate natural language (AR or EN) → cron expression
 * @param {string} input
 * @returns {{ cron: string, human: string, error?: string }}
 */
export function nlToCron(input) {
  const orig  = input;
  const lower = input.toLowerCase().trim();

  let minute = 0;
  let hour   = 9;
  let dom    = '*';
  let month  = '*';
  let dow    = '*';
  let period = null;
  let isDaily = false;

  // ── Detect period (Arabic) ──
  for (const [word, p] of Object.entries(PERIODS_AR)) {
    if (lower.includes(word)) { period = p; break; }
  }
  // EN period
  if (lower.includes('pm') && !lower.includes('صباح')) period = period || 'pm';
  if (lower.includes('am')) period = 'am';
  if (lower.includes('noon') || lower.includes('ظهر')) period = 'pm12';

  // ── Detect day (Arabic) ──
  for (const [word, num] of Object.entries(DAYS_AR)) {
    if (lower.includes(word)) { dow = num; break; }
  }
  // Detect day (English)
  if (dow === '*') {
    for (const [word, num] of Object.entries(DAYS_EN)) {
      if (lower.includes(word)) { dow = num; break; }
    }
  }

  // ── Detect "daily/يومياً" ──
  if (lower.includes('يومياً') || lower.includes('يومي') || lower.includes('كل يوم') || lower.includes('daily') || lower.includes('every day')) {
    isDaily = true;
    dow = '*';
  }

  // ── Detect "weekly/أسبوعي" without day → default Sunday ──
  if ((lower.includes('أسبوعياً') || lower.includes('أسبوعي') || lower.includes('weekly')) && dow === '*') {
    dow = 0;
  }

  // ── Extract time ──
  // Strip day names and period words for cleaner time parsing
  let timePart = lower;
  Object.keys(DAYS_AR).forEach(w => { timePart = timePart.replace(w, ''); });
  Object.keys(PERIODS_AR).forEach(w => { timePart = timePart.replace(w, ''); });
  timePart = timePart.replace(/الساعة|الساعه|كل|يومياً|يومي|أسبوعياً|أسبوعي|pm|am|noon|daily|weekly|every/gi, '');

  const time = parseTime(timePart);
  if (time) {
    hour   = applyPeriod(time.hour, period);
    minute = time.minute;
  } else if (period === 'pm12') {
    hour = 12; minute = 0;
  }

  // Clamp
  hour   = Math.max(0, Math.min(23, hour));
  minute = Math.max(0, Math.min(59, minute));

  const cron  = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const human = cronToHuman(cron);

  return { cron, human };
}

/**
 * Translate cron expression → human readable (Arabic + English)
 * @param {string} cron  e.g. "0 16 * * *" or "15 14 * * 4"
 * @returns {{ ar: string, en: string }}
 */
export function cronToHuman(cron) {
  const parts = String(cron).trim().split(/\s+/);
  if (parts.length < 5) return { ar: cron, en: cron };

  const [min, hr, , , dow] = parts;

  const minute  = parseInt(min);
  const hour    = parseInt(hr);
  const dowNum  = dow === '*' ? null : parseInt(dow);

  const hourPad = String(hour).padStart(2, '0');
  const minPad  = String(minute).padStart(2, '0');
  const timeStr = `${hourPad}:${minPad}`;

  // Arabic AM/PM
  let periodAr;
  if (hour < 12) periodAr = 'صباحاً';
  else if (hour === 12) periodAr = 'ظهراً';
  else if (hour < 17) periodAr = 'عصراً';
  else periodAr = 'مساءً';

  let periodEn = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  const time12 = `${hour12}:${minPad} ${periodEn}`;

  if (dowNum === null) {
    return {
      ar: `كل يوم الساعة ${timeStr} (${periodAr})`,
      en: `Daily at ${time12}`,
    };
  }

  const dayAr = DAY_NAMES_AR[dowNum] ?? dow;
  const dayEn = DAY_NAMES_EN[dowNum] ?? dow;

  return {
    ar: `كل ${dayAr} الساعة ${timeStr} (${periodAr})`,
    en: `Every ${dayEn} at ${time12}`,
  };
}

/**
 * Validate cron expression (basic)
 * @param {string} cron
 * @returns {boolean}
 */
export function isValidCron(cron) {
  const parts = String(cron).trim().split(/\s+/);
  if (parts.length !== 5) return false;
  const [min, hr, dom, month, dow] = parts;
  const inRange = (v, lo, hi) => v === '*' || (!isNaN(v) && +v >= lo && +v <= hi);
  return inRange(min, 0, 59) && inRange(hr, 0, 23) && inRange(dom, 1, 31) && inRange(month, 1, 12) && inRange(dow, 0, 7);
}
