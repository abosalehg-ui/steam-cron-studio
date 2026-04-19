// =============================================================
// STEAM CRON STUDIO — Tasks Registry
// Defines all 8 monitoring tasks with metadata + config schema
// =============================================================

export const TASKS_REGISTRY = [
  // ── Task 1: 100% Discount Scanner ──────────────────────────
  {
    id: 'steam_free_deals_daily',
    icon: '🎮',
    name: { ar: 'ماسح التخفيضات 100٪', en: '100% Discount Scanner' },
    description: {
      ar: 'يبحث يومياً في كل متجر Steam عن الألعاب المجانية مؤقتاً ويرسل تقريراً مصوراً.',
      en: 'Daily scan for temporarily free games on Steam. Sends a visual image report.',
    },
    schedule: '0 16 * * *',
    scheduleHuman: { ar: 'يومياً 16:00 KSA', en: 'Daily 4:00 PM KSA' },
    outputFormat: 'image',
    privacyHigh: false,
    defaultEnabled: true,
    requiresItad: false,
    configs: [
      { key: 'fallback_threshold', type: 'number', default: 95, min: 80, max: 99, suffix: '٪', labelKey: 'cfg_fallback_threshold' },
      { key: 'max_results',        type: 'number', default: 10, min: 1,  max: 25,              labelKey: 'cfg_max_results' },
      { key: 'exclude_owned',      type: 'bool',   default: true,                               labelKey: 'cfg_exclude_owned' },
    ],
    telegramPreview: (cfg, lang) => lang === 'ar'
      ? `<b>🎮 تخفيضات Steam اليوم — 2025-01-15</b>\n<i>Region: SA | 5 لعبة</i>\n\n⭐ <b>ExampleGame Pro</b>\nمجانية حتى: 2025-01-20\nكانت بـ 59 ر.س\n<a href="#">افتح في Steam</a>`
      : `<b>🎮 Steam Free Games Today — 2025-01-15</b>\n<i>Region: SA | 5 games</i>\n\n⭐ <b>ExampleGame Pro</b>\nFree until: 2025-01-20\nWas: 59 SAR\n<a href="#">Open in Steam</a>`,
  },

  // ── Task 2: Wishlist ≥70% Monitor ──────────────────────────
  {
    id: 'steam_wishlist_deals_daily',
    icon: '🛒',
    name: { ar: 'مراقب تخفيضات قائمة الرغبات', en: 'Wishlist ≥70% Monitor' },
    description: {
      ar: 'يراقب قائمة رغباتك يومياً ويبلّغك بكل خصم 70% أو أكثر.',
      en: 'Daily monitor for your wishlist items with 70%+ discounts.',
    },
    schedule: '0 20 * * *',
    scheduleHuman: { ar: 'يومياً 20:00 KSA', en: 'Daily 8:00 PM KSA' },
    outputFormat: 'text',
    privacyHigh: false,
    defaultEnabled: true,
    requiresItad: false,
    configs: [
      { key: 'min_discount',  type: 'number', default: 70, min: 50, max: 95, suffix: '٪', labelKey: 'cfg_min_discount' },
      { key: 'max_results',   type: 'number', default: 15, min: 1,  max: 30,               labelKey: 'cfg_max_results' },
      { key: 'skip_if_empty', type: 'bool',   default: false,                               labelKey: 'cfg_skip_if_empty' },
    ],
    telegramPreview: (cfg, lang) => lang === 'ar'
      ? `<b>🛒 تخفيضات قائمة الرغبات — 2025-01-15</b>\n<i>3 لعبة بخصم 70%+ من أصل 42</i>\n\n🔥 <b>RPG Masterpiece</b> — خصم <b>90%</b>\n5.9 ر.س <s>59 ر.س</s>\n<a href="#">اشترِ الآن</a>\n\n💰 <b>إجمالي التوفير المحتمل: 124 ر.س</b>`
      : `<b>🛒 Wishlist Deals — 2025-01-15</b>\n<i>3 games with 70%+ off from 42 items</i>\n\n🔥 <b>RPG Masterpiece</b> — <b>90%</b> off\n5.9 SAR <s>59 SAR</s>\n<a href="#">Buy Now</a>\n\n💰 <b>Potential Savings: 124 SAR</b>`,
  },

  // ── Task 3: Game of the Week ────────────────────────────────
  {
    id: 'steam_game_of_the_week',
    icon: '🎯',
    name: { ar: 'لعبة الأسبوع', en: 'Game of the Week' },
    description: {
      ar: 'كل خميس يختار لك لعبة من مكتبتك بناءً على تفضيلاتك ويبني تقرير مصوّر.',
      en: 'Every Thursday picks a game from your library based on your preferences.',
    },
    schedule: '15 14 * * 4',
    scheduleHuman: { ar: 'الخميس 14:15 KSA', en: 'Thursday 2:15 PM KSA' },
    outputFormat: 'image',
    privacyHigh: false,
    defaultEnabled: true,
    requiresItad: false,
    configs: [
      { key: 'preferred_genres',   type: 'tags',   default: ['Strategy','Simulation','RPG','Indie','Historical','Puzzle','Adventure'], labelKey: 'cfg_preferred_genres' },
      { key: 'disliked_genres',    type: 'tags',   default: ['Horror','Battle Royale','Sexual Content'],                               labelKey: 'cfg_disliked_genres' },
      { key: 'max_playtime_minutes', type: 'number', default: 1200, min: 60, max: 9999, suffix: '',                                   labelKey: 'cfg_max_playtime' },
      { key: 'no_repeat_weeks',    type: 'number', default: 8, min: 1, max: 52,                                                       labelKey: 'cfg_no_repeat_weeks' },
      { key: 'include_family',     type: 'bool',   default: true,                                                                      labelKey: 'cfg_include_family' },
    ],
    telegramPreview: (cfg, lang) => lang === 'ar'
      ? `<b>🎯 لعبة الأسبوع — 2025-01-16</b>\n\n<b>الاختيار: Civilization VI</b>\nليش اخترتها: لم تلعبها منذ 3 أشهر وهي من النوع المفضل لك (Strategy). تقييم Metacritic 88.\n\n📊 التفاصيل:\n• وقتك فيها: 45 دقيقة (بداية)\n• النوع: Strategy, Simulation\n• المصدر: مكتبتك\n• Metacritic: 88\n• تدعم عربي: لا\n\n🔄 البدائل:\n2. <b>Victoria 3</b> — نوع مشابه، لم تجربها\n3. <b>Total War: Warhammer</b> — ممتازة للجلسات القصيرة`
      : `<b>🎯 Game of the Week — 2025-01-16</b>\n\n<b>Pick: Civilization VI</b>\nWhy: Not played in 3 months, preferred genre (Strategy). Metacritic 88.\n\n📊 Details:\n• Your playtime: 45 min (early)\n• Genre: Strategy, Simulation\n• Source: Your library\n• Metacritic: 88`,
  },

  // ── Task 4: Achievement Hunter ──────────────────────────────
  {
    id: 'steam_achievement_hunter',
    icon: '🏆',
    name: { ar: 'صائد الإنجازات', en: 'Achievement Hunter' },
    description: {
      ar: 'كل جمعة يقترح إنجازاً قابلاً للتحقيق في ألعاب تلعبها فعلاً — ليس تافهاً ولا مستحيلاً.',
      en: 'Every Friday suggests an achievable achievement in games you\'ve been playing.',
    },
    schedule: '0 10 * * 5',
    scheduleHuman: { ar: 'الجمعة 10:00 KSA', en: 'Friday 10:00 AM KSA' },
    outputFormat: 'text',
    privacyHigh: false,
    defaultEnabled: true,
    requiresItad: false,
    configs: [
      { key: 'min_rarity',   type: 'number', default: 15, min: 5,  max: 40, suffix: '٪', labelKey: 'cfg_min_rarity' },
      { key: 'max_rarity',   type: 'number', default: 65, min: 50, max: 85, suffix: '٪', labelKey: 'cfg_max_rarity' },
      { key: 'dedupe_weeks', type: 'number', default: 12, min: 4,  max: 26,               labelKey: 'cfg_dedupe_weeks' },
    ],
    telegramPreview: (cfg, lang) => lang === 'ar'
      ? `<b>🏆 إنجاز الأسبوع — 2025-01-17</b>\n\n<b>🎯 الإنجاز المقترح:</b>\n<b>Master Strategist</b> في <b>Civilization VI</b>\n📝 أكمل 10 جولات بانتصار ثقافي\n🌍 نسبة اللاعبين العالمية: <b>32%</b>\n🥈 التصنيف: غير شائع\n\n💡 ليش هذا الإنجاز مناسب:\nلعبت Civ VI الأسبوع الماضي ونسبة 32% تعني تحدياً حقيقياً.\n\n🔄 بدائل:\n2. <b>Curious Explorer</b> — Civ VI (45%)\n3. <b>Speed Runner</b> — Victoria 3 (28%)`
      : `<b>🏆 Achievement of the Week — 2025-01-17</b>\n\n<b>🎯 Suggested:</b>\n<b>Master Strategist</b> in <b>Civilization VI</b>\n📝 Win 10 games with cultural victory\n🌍 Global unlock rate: <b>32%</b>\n🥈 Tier: Uncommon`,
  },

  // ── Task 5: Regional Price Intelligence ────────────────────
  {
    id: 'steam_regional_price_intel',
    icon: '🌍',
    name: { ar: 'تحليل الأسعار الإقليمية', en: 'Regional Price Intel' },
    description: {
      ar: 'أسبوعياً يقارن أسعار قائمة رغباتك عبر 7 مناطق ويعرف إذا السعودية رخيصة أو غالية.',
      en: 'Weekly comparison of your wishlist prices across 7 regions.',
    },
    schedule: '0 11 * * 0',
    scheduleHuman: { ar: 'الأحد 11:00 KSA', en: 'Sunday 11:00 AM KSA' },
    outputFormat: 'text',
    privacyHigh: false,
    defaultEnabled: true,
    requiresItad: false,
    configs: [
      { key: 'premium_threshold', type: 'number', default: 25, min: 10, max: 50, suffix: '٪', labelKey: 'cfg_premium_threshold' },
      { key: 'bargain_threshold', type: 'number', default: 15, min: 5,  max: 40, suffix: '٪', labelKey: 'cfg_bargain_threshold' },
      { key: 'max_candidates',   type: 'number', default: 60, min: 10, max: 100,              labelKey: 'cfg_max_candidates' },
    ],
    telegramPreview: (cfg, lang) => lang === 'ar'
      ? `<b>🌍 تقرير الأسعار الإقليمية — 2025-01-19</b>\n<i>42 لعبة تم تحليلها</i>\n\n<b>✅ أسعار السعودية ممتازة فيها:</b>\n• <b>Baldur's Gate 3</b>\n  عندنا: 89 ر.س — أرخص من المتوسط العالمي بنسبة 18%\n\n<b>⚠️ أسعار السعودية مرتفعة فيها:</b>\n• <b>Elden Ring</b>\n  عندنا: 149 ر.س — أغلى من BR بـ 31%\n  (انتظر خصم أو bundle)\n\n<i>⚖️ تقرير تحليلي فقط.</i>`
      : `<b>🌍 Regional Price Report — 2025-01-19</b>\n<i>42 games analyzed</i>\n\n<b>✅ SA has great prices on:</b>\n• <b>Baldur's Gate 3</b> — 18% below global avg`,
  },

  // ── Task 6: Gift Opportunities ──────────────────────────────
  {
    id: 'steam_gift_opportunities',
    icon: '🎁',
    name: { ar: 'فرص إهداء الأصدقاء', en: "Friends' Gift Opportunities" },
    description: {
      ar: 'كل ثلاثاء يفحص قوائم رغبات أصدقائك العامة ويعرض الألعاب التي عليها خصم مناسب للإهداء. بيانات خاصة — نص فقط.',
      en: 'Weekly scan of friends\' public wishlists for gift-worthy deals. Privacy-sensitive — text only.',
    },
    schedule: '0 19 * * 2',
    scheduleHuman: { ar: 'الثلاثاء 19:00 KSA', en: 'Tuesday 7:00 PM KSA' },
    outputFormat: 'text',
    privacyHigh: true,
    defaultEnabled: true,
    requiresItad: false,
    configs: [
      { key: 'min_discount',   type: 'number', default: 50,  min: 30, max: 80, suffix: '٪', labelKey: 'cfg_min_discount' },
      { key: 'max_price_sar',  type: 'number', default: 150, min: 50, max: 400,              labelKey: 'cfg_max_price_sar' },
      { key: 'cache_days',     type: 'number', default: 7,   min: 1,  max: 30,               labelKey: 'cfg_cache_days' },
    ],
    telegramPreview: (cfg, lang) => lang === 'ar'
      ? `<b>🎁 فرص إهداء هذا الأسبوع — 2025-01-14</b>\n<i>فحصنا 8 صديق</i>\n\n• 👤 <b>Ahmed</b>\n  يتمنى: <b>Hades II</b>\n  💸 خصم 60% → 39 ر.س\n     (توفير 58 ر.س)\n  <a href="#">اهديها</a>\n\n• 👤 <b>Khalid</b>\n  يتمنى: <b>Hollow Knight</b>\n  💸 خصم 75% → 9 ر.س\n  <a href="#">اهديها</a>`
      : `<b>🎁 Gift Opportunities — 2025-01-14</b>\n<i>Scanned 8 friends</i>\n\n• 👤 <b>Ahmed</b>\n  Wants: <b>Hades II</b>\n  💸 60% off → 39 SAR (saves 58 SAR)\n  <a href="#">Gift it</a>`,
  },

  // ── Task 7: Cross-Platform Prices ───────────────────────────
  {
    id: 'steam_cross_platform_prices',
    icon: '🔀',
    name: { ar: 'مقارنة المتاجر', en: 'Cross-Platform Prices' },
    description: {
      ar: 'كل سبت يقارن أسعار قائمة رغباتك بين Steam و GOG و Epic و Humble وغيرها عبر ITAD.',
      en: 'Weekly comparison of wishlist prices between Steam, GOG, Epic, Humble via ITAD.',
    },
    schedule: '0 17 * * 6',
    scheduleHuman: { ar: 'السبت 17:00 KSA', en: 'Saturday 5:00 PM KSA' },
    outputFormat: 'text',
    privacyHigh: false,
    defaultEnabled: false,
    requiresItad: true,
    configs: [
      { key: 'min_savings_percent', type: 'number', default: 15, min: 5, max: 40, suffix: '٪', labelKey: 'cfg_min_savings' },
      { key: 'exclude_gray_market', type: 'bool',   default: true,                              labelKey: 'cfg_exclude_gray' },
    ],
    telegramPreview: (cfg, lang) => lang === 'ar'
      ? `<b>🔀 مقارنة الأسعار عبر المتاجر — 2025-01-18</b>\n<i>فحصنا 35 لعبة من قائمتك</i>\n\n• <b>Baldur's Gate 3</b>\n  Steam: 89 ر.س\n  GOG: <b>71 ر.س</b>\n  💰 وفّر 20% من GOG\n  <a href="#">اشترِ من GOG</a>\n\n<i>🛡️ متاجر موثوقة ومعتمدة رسميًا.</i>`
      : `<b>🔀 Cross-Platform Prices — 2025-01-18</b>\n<i>Checked 35 wishlist games</i>\n\n• <b>Baldur's Gate 3</b>\n  Steam: 89 SAR — GOG: <b>71 SAR</b>\n  💰 Save 20% on GOG\n  <a href="#">Buy on GOG</a>`,
  },

  // ── Task 8: Weekly Wrap-Up ──────────────────────────────────
  {
    id: 'steam_weekly_wrapup',
    icon: '📊',
    name: { ar: 'تقرير الأسبوع', en: 'Weekly Wrap-Up' },
    description: {
      ar: 'كل أحد صباحاً يجمع كل ما حدث الأسبوع في تقرير مصوّر واحد + تحقق من نجاح التوصيات السابقة.',
      en: 'Every Sunday morning: a full weekly digest image + hit/miss verification on last week\'s picks.',
    },
    schedule: '0 9 * * 0',
    scheduleHuman: { ar: 'الأحد 09:00 KSA', en: 'Sunday 9:00 AM KSA' },
    outputFormat: 'image',
    privacyHigh: false,
    defaultEnabled: true,
    requiresItad: false,
    configs: [
      { key: 'archive_after_days', type: 'number', default: 30, min: 7, max: 90, labelKey: 'cfg_archive_after' },
    ],
    telegramPreview: (cfg, lang) => lang === 'ar'
      ? `📊 خلاصة أسبوعك — 2025-01-12 إلى 2025-01-19\n🎯 لعبة الأسبوع: ✅ نجحت\n🏆 الإنجاز: ⏳ لسه ما تحقق\n💰 إجمالي التوفير المحتمل: 183 ر.س`
      : `📊 Weekly Summary — Jan 12–19, 2025\n🎯 Game of Week: ✅ Hit\n🏆 Achievement: ⏳ Pending\n💰 Total potential savings: 183 SAR`,
  },
];

/**
 * Get a task by ID
 * @param {string} id
 */
export function getTaskById(id) {
  return TASKS_REGISTRY.find(t => t.id === id);
}

/**
 * Build default configs object for all tasks
 */
export function buildDefaultConfigs() {
  const out = {};
  for (const task of TASKS_REGISTRY) {
    out[task.id] = {
      enabled: task.defaultEnabled,
      schedule: task.schedule,
      configs: Object.fromEntries(
        task.configs.map(c => [c.key, c.default])
      ),
    };
  }
  return out;
}
