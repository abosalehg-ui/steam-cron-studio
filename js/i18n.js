// =============================================================
// STEAM CRON STUDIO — i18n Translations
// =============================================================

export const translations = {
  ar: {
    // Nav
    nav_home:          'الرئيسية',
    nav_builder:       'بناء المهام',
    nav_library:       'مكتبة المهام',
    nav_compat:        'التوافق',
    nav_guide_api:     'مفاتيح API',
    nav_guide_deploy:  'النشر',
    lang_toggle:       'EN',

    // Hero
    hero_title:        'بنّاء مهام Steam البصري',
    hero_highlight:    'Steam',
    hero_subtitle:     'أنتج ملف cron_tasks.yaml احترافي لوكلاء الذكاء الاصطناعي في دقائق — تصميم بصري، دعم عربي كامل، تصدير متعدد الصيغ.',
    cta_start:         'ابدأ البناء',
    cta_guide:         'الدليل',

    // Stats
    stat_tasks:        'مهمة جاهزة',
    stat_formats:      'صيغ تصدير',
    stat_frameworks:   'إطار عمل',
    stat_client:       'كل شيء في المتصفح',

    // Features
    features_title:    'لماذا Steam Cron Studio؟',
    feat_templates_title:  'قوالب جاهزة',
    feat_templates_desc:   '8 مهام Steam مُعدّة مسبقًا مع prompts محسّنة وإعدادات قابلة للتخصيص الكامل.',
    feat_preview_title:    'معاينة فورية',
    feat_preview_desc:     'شوف رسالة Telegram قبل ما تولّد اليامل — معاينة نصية وصورة في نفس الوقت.',
    feat_arabic_title:     'دعم عربي كامل',
    feat_arabic_desc:      'واجهة RTL، Cron Translator بالعربي، ومخرجات بالعربي واللهجة السعودية.',
    feat_client_title:     'بدون خوادم',
    feat_client_desc:      'كل شيء يشتغل في متصفحك. مفاتيح API تبقى عندك فقط، ما ترسَل لأي مكان.',
    feat_formats_title:    'تصدير متعدد',
    feat_formats_desc:     'صدّر كـ YAML خام أو Docker Compose أو Systemd Service — بضغطة واحدة.',
    feat_share_title:      'مشاركة بـ URL',
    feat_share_desc:       'كوّد إعداداتك في رابط قابل للمشاركة مع أصدقائك.',

    // Tasks section
    tasks_section_title:   'المهام المدعومة',
    output_image:          '🖼️ صورة',
    output_text:           '📝 نص',

    // Builder page
    builder_title:         'بناء مهامك',
    step1_label:           'الإعدادات',
    step2_label:           'المهام',
    step3_label:           'التصدير',
    step1_title:           'إعدادات عامة',
    steam_id_label:        'Steam ID (SteamID64)',
    steam_id_placeholder:  '76561198017149971',
    steam_id_hint:         '17 رقم يبدأ بـ 7656119',
    verify_btn:            'تحقق',
    chat_id_label:         'Telegram Chat ID',
    chat_id_placeholder:   '6803381',
    region_label:          'المنطقة',
    currency_label:        'العملة',
    timezone_label:        'التوقيت',
    tasks_step_title:      'تفعيل المهام وتخصيصها',
    tasks_step_subtitle:   'اضغط على أي مهمة لتوسيعها وتخصيص إعداداتها',
    export_title:          'تصدير التهيئة',
    export_subtitle:       'اختر صيغة التصدير المناسبة لبيئتك',
    btn_export_yaml:       'تحميل YAML',
    btn_export_docker:     'Docker Compose',
    btn_export_systemd:    'Systemd Service',
    btn_share_url:         'مشاركة بـ URL',
    btn_copy_yaml:         'نسخ YAML',
    preview_title:         'المعاينة',
    preview_tab_tg:        'Telegram',
    preview_tab_img:       'الصورة',
    preview_tab_yaml:      'YAML',

    // Task names
    task1_name:  'ماسح التخفيضات 100٪',
    task2_name:  'مراقب تخفيضات قائمة الرغبات',
    task3_name:  'لعبة الأسبوع',
    task4_name:  'صائد الإنجازات',
    task5_name:  'تحليل الأسعار الإقليمية',
    task6_name:  'فرص إهداء الأصدقاء',
    task7_name:  'مقارنة المتاجر',
    task8_name:  'تقرير الأسبوع',

    // Config labels
    cfg_fallback_threshold: 'الحد الأدنى للتوسيع',
    cfg_max_results:        'أقصى عدد نتائج',
    cfg_exclude_owned:      'استبعاد الألعاب الموجودة لديّ',
    cfg_min_discount:       'أدنى نسبة خصم',
    cfg_skip_if_empty:      'لا ترسل لو ما في نتائج',
    cfg_preferred_genres:   'الأنواع المفضلة',
    cfg_disliked_genres:    'الأنواع غير المرغوبة',
    cfg_max_playtime:       'أقصى وقت لعب (دقيقة)',
    cfg_no_repeat_weeks:    'لا تكرار لـ (أسابيع)',
    cfg_include_family:     'تضمين مكتبة العائلة',
    cfg_min_rarity:         'أدنى ندرة (%)',
    cfg_max_rarity:         'أقصى ندرة (%)',
    cfg_dedupe_weeks:       'لا تكرار لـ (أسابيع)',
    cfg_premium_threshold:  'حد السعر المرتفع (%)',
    cfg_bargain_threshold:  'حد السعر المميز (%)',
    cfg_max_candidates:     'أقصى عدد مرشحين',
    cfg_max_price_sar:      'أقصى سعر (ر.س)',
    cfg_cache_days:         'مدة الكاش (أيام)',
    cfg_min_savings:        'أدنى توفير (%)',
    cfg_exclude_gray:       'استبعاد الأسواق الرمادية',
    cfg_archive_after:      'أرشفة بعد (يومًا)',

    // Errors / notices
    err_invalid_steam_id:  'Steam ID غير صحيح — يجب أن يكون 17 رقمًا يبدأ بـ 7656119',
    notice_client_only:    '🔒 مفاتيح API تُحفظ في المتصفح فقط ولا تُرسَل لأي خادم.',
    notice_steam_cors:     '📡 نستخدم Steam Community XML الذي يدعم CORS في المتصفح.',
    notice_privacy_high:   '🔒 بيانات الأصدقاء — لن تُعرض كصورة أبدًا (خصوصية)',
    notice_itad_required:  '⚠️ هذه المهمة تحتاج ITAD API Key',

    // Cron NL
    cron_nl_placeholder:   'كل خميس الساعة 2 ظهرًا...',
    cron_nl_btn:           'ترجم',
    cron_nl_result:        'النتيجة:',

    // Toast messages
    toast_copied:          '✅ تم النسخ',
    toast_downloaded:      '✅ تم التحميل',
    toast_link_copied:     '🔗 تم نسخ الرابط',
    toast_steam_ok:        '✅ تم التحقق من Steam ID',
    toast_steam_err:       '❌ تعذّر التحقق من Steam ID',
    toast_no_tasks:        '⚠️ يرجى تفعيل مهمة واحدة على الأقل',

    // Footer
    footer_made_by:        'صُنع بـ ❤️ لمجتمع Steam العربي',
    footer_tos_notice:     'Steam هو علامة تجارية لـ Valve Corporation. هذه الأداة غير رسمية.',
    footer_github:         'GitHub',
    footer_docs:           'الوثائق',
    footer_license:        'الرخصة',
  },

  en: {
    // Nav
    nav_home:          'Home',
    nav_builder:       'Builder',
    nav_library:       'Task Library',
    nav_compat:        'Compatibility',
    nav_guide_api:     'API Keys',
    nav_guide_deploy:  'Deployment',
    lang_toggle:       'عربي',

    // Hero
    hero_title:        'Visual Steam Task Builder',
    hero_highlight:    'Steam',
    hero_subtitle:     'Generate production-ready cron_tasks.yaml for AI agents in minutes — visual builder, Arabic RTL support, multiple export formats.',
    cta_start:         'Start Building',
    cta_guide:         'Guide',

    // Stats
    stat_tasks:        'ready tasks',
    stat_formats:      'export formats',
    stat_frameworks:   'frameworks',
    stat_client:       'fully client-side',

    // Features
    features_title:    'Why Steam Cron Studio?',
    feat_templates_title:  'Ready Templates',
    feat_templates_desc:   '8 pre-configured Steam monitoring tasks with optimized prompts and fully customizable settings.',
    feat_preview_title:    'Live Preview',
    feat_preview_desc:     'See your Telegram message before generating YAML — text and image preview side by side.',
    feat_arabic_title:     'Full Arabic Support',
    feat_arabic_desc:      'RTL interface, Arabic Cron Translator, and outputs in Arabic / Saudi dialect.',
    feat_client_title:     'No Backend',
    feat_client_desc:      'Everything runs in your browser. API keys stay with you only — never sent anywhere.',
    feat_formats_title:    'Multi-format Export',
    feat_formats_desc:     'Export as raw YAML, Docker Compose, or Systemd Service — one click.',
    feat_share_title:      'URL Sharing',
    feat_share_desc:       'Encode your configuration in a shareable URL to send to friends.',

    // Tasks section
    tasks_section_title:   'Supported Tasks',
    output_image:          '🖼️ Image',
    output_text:           '📝 Text',

    // Builder page
    builder_title:         'Build Your Tasks',
    step1_label:           'Settings',
    step2_label:           'Tasks',
    step3_label:           'Export',
    step1_title:           'Global Settings',
    steam_id_label:        'Steam ID (SteamID64)',
    steam_id_placeholder:  '76561198017149971',
    steam_id_hint:         '17 digits starting with 7656119',
    verify_btn:            'Verify',
    chat_id_label:         'Telegram Chat ID',
    chat_id_placeholder:   '6803381',
    region_label:          'Region',
    currency_label:        'Currency',
    timezone_label:        'Timezone',
    tasks_step_title:      'Enable & Customize Tasks',
    tasks_step_subtitle:   'Click any task to expand and configure its settings',
    export_title:          'Export Configuration',
    export_subtitle:       'Choose the export format that fits your environment',
    btn_export_yaml:       'Download YAML',
    btn_export_docker:     'Docker Compose',
    btn_export_systemd:    'Systemd Service',
    btn_share_url:         'Share URL',
    btn_copy_yaml:         'Copy YAML',
    preview_title:         'Preview',
    preview_tab_tg:        'Telegram',
    preview_tab_img:       'Image',
    preview_tab_yaml:      'YAML',

    // Task names
    task1_name:  '100% Discount Scanner',
    task2_name:  'Wishlist ≥70% Monitor',
    task3_name:  'Game of the Week',
    task4_name:  'Achievement Hunter',
    task5_name:  'Regional Price Intel',
    task6_name:  "Friends' Gift Opportunities",
    task7_name:  'Cross-Platform Prices',
    task8_name:  'Weekly Wrap-Up',

    // Config labels
    cfg_fallback_threshold: 'Fallback threshold',
    cfg_max_results:        'Max results',
    cfg_exclude_owned:      'Exclude owned games',
    cfg_min_discount:       'Min discount %',
    cfg_skip_if_empty:      "Don't send if no results",
    cfg_preferred_genres:   'Preferred genres',
    cfg_disliked_genres:    'Disliked genres',
    cfg_max_playtime:       'Max playtime (min)',
    cfg_no_repeat_weeks:    'No-repeat window (weeks)',
    cfg_include_family:     'Include Family Share',
    cfg_min_rarity:         'Min rarity (%)',
    cfg_max_rarity:         'Max rarity (%)',
    cfg_dedupe_weeks:       'Dedup window (weeks)',
    cfg_premium_threshold:  'Premium threshold (%)',
    cfg_bargain_threshold:  'Bargain threshold (%)',
    cfg_max_candidates:     'Max candidates',
    cfg_max_price_sar:      'Max price (SAR)',
    cfg_cache_days:         'Cache duration (days)',
    cfg_min_savings:        'Min savings (%)',
    cfg_exclude_gray:       'Exclude gray-market',
    cfg_archive_after:      'Archive after (days)',

    // Errors / notices
    err_invalid_steam_id:  'Invalid Steam ID — must be 17 digits starting with 7656119',
    notice_client_only:    '🔒 API keys are stored in your browser only and never sent to any server.',
    notice_steam_cors:     '📡 Using Steam Community XML which supports CORS in the browser.',
    notice_privacy_high:   '🔒 Friend data — never rendered as image (privacy)',
    notice_itad_required:  '⚠️ This task requires an ITAD API Key',

    // Cron NL
    cron_nl_placeholder:   'Every Thursday at 2 PM...',
    cron_nl_btn:           'Translate',
    cron_nl_result:        'Result:',

    // Toast messages
    toast_copied:          '✅ Copied',
    toast_downloaded:      '✅ Downloaded',
    toast_link_copied:     '🔗 Link copied',
    toast_steam_ok:        '✅ Steam ID verified',
    toast_steam_err:       '❌ Could not verify Steam ID',
    toast_no_tasks:        '⚠️ Please enable at least one task',

    // Footer
    footer_made_by:        'Made with ❤️ for the Arabic Steam community',
    footer_tos_notice:     'Steam is a trademark of Valve Corporation. This tool is unofficial.',
    footer_github:         'GitHub',
    footer_docs:           'Docs',
    footer_license:        'License',
  }
};

/**
 * Get a translated string, with optional param interpolation
 * @param {string} key
 * @param {string} [lang='ar']
 * @param {Object} [params={}]
 * @returns {string}
 */
export function t(key, lang = 'ar', params = {}) {
  let str = translations[lang]?.[key] ?? translations['ar']?.[key] ?? key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return str;
}
