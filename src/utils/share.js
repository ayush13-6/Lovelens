/**
 * Generates formatted text summary for sharing
 */
export function generateShareText(result, lang = 'en', categories = {}) {
  const topName = (categories[result.topCategory.categoryId] || result.topCategory).name;
  const secondName = (categories[result.secondCategory.categoryId] || result.secondCategory).name;

  let topText = '';
  let headingText = '❤️ LoveLens Relationship Profile';
  let breakdownHeader = 'My Category Breakdown:';
  let ctaText = 'Discover how you feel most loved with the free LoveLens test: https://lovelens.me/';

  if (lang === 'hinglish') {
    headingText = '❤️ LoveLens Relationship Profile';
    breakdownHeader = 'Mera Category Breakdown:';
    ctaText = 'Aap bhi apna love language test free me dein: https://lovelens.me/';
    topText = result.profileType === 'combined'
      ? `Mera leading profile ${topName} & ${secondName} ka blend hai!`
      : `Meri leading love language ${topName} hai! (${result.topCategory.rawScore}/25)`;
  } else if (lang === 'hi') {
    headingText = '❤️ लवलेंस संबंध प्रोफ़ाइल';
    breakdownHeader = 'मेरा स्कोर विवरण:';
    ctaText = 'निःशुल्क लवलेंस टेस्ट लें और अपनी प्रोफ़ाइल जानें: https://lovelens.me/';
    topText = result.profileType === 'combined'
      ? `मेरी प्रमुख प्रोफ़ाइल ${topName} और ${secondName} का सुंदर संयोजन है!`
      : `मेरी प्रमुख प्रेम भाषा ${topName} है! (${result.topCategory.rawScore}/25)`;
  } else if (lang === 'ja') {
    headingText = '❤️ LoveLens 愛の言語診断レポート';
    breakdownHeader = 'カテゴリー別スコア内訳:';
    ctaText = 'あなたの愛の言語を無料テストでチェック: https://lovelens.me/';
    topText = result.profileType === 'combined'
      ? `私の主要なプロファイルは「${topName}」と「${secondName}」です！`
      : `私の主要な愛の言語は「${topName}」です！（${result.topCategory.rawScore}/25点）`;
  } else if (lang === 'ru') {
    headingText = '❤️ Профиль отношений LoveLens';
    breakdownHeader = 'Мои результаты по категориям:';
    ctaText = 'Пройдите бесплатный тест LoveLens: https://lovelens.me/';
    topText = result.profileType === 'combined'
      ? `Мой ведущий профиль — гармония ${topName} и ${secondName}!`
      : `Мой ведущий язык любви — «${topName}»! (${result.topCategory.rawScore}/25)`;
  } else {
    topText = result.profileType === 'combined'
      ? `My leading love language is a blend of ${topName} & ${secondName}!`
      : `My leading love language is ${topName}! (${result.topCategory.rawScore}/25)`;
  }

  const scoresBreakdown = result.scores
    .map(s => {
      const name = (categories[s.categoryId] || s).name;
      return `• ${name}: ${s.rawScore}/25 (${s.percentage}%)`;
    })
    .join('\n');

  return `${headingText}\n\n${topText}\n\n${breakdownHeader}\n${scoresBreakdown}\n\n${ctaText}`;
}

/**
 * Native Web Share API helper
 */
export async function shareResult(result, lang = 'en', categories = {}) {
  const shareText = generateShareText(result, lang, categories);
  const shareData = {
    title: 'My LoveLens Profile',
    text: shareText,
    url: window.location.origin || 'https://lovelens.me/'
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, aborted: true };
      }
    }
  }

  // Fallback to clipboard
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareText);
      return { success: true, method: 'clipboard' };
    }
  } catch (clipErr) {
    console.error('Clipboard write error:', clipErr);
  }

  return { success: false, method: 'none' };
}

/**
 * Generates an elegant high-resolution share card image using Canvas.
 * Returns a data URL that can be downloaded or previewed.
 */
export function generateShareCardImage(result, lang = 'en', categories = {}) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const topMeta = categories[result.topCategory.categoryId] || result.topCategory;
    const secondMeta = categories[result.secondCategory.categoryId] || result.secondCategory;

    // 1. Warm Ivory Background
    ctx.fillStyle = '#FFF9F5';
    ctx.fillRect(0, 0, width, height);

    // Decorative top border
    const grad = ctx.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, '#FCEBF0');
    grad.addColorStop(0.5, '#C75C7A');
    grad.addColorStop(1, '#EEE8FA');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, 16);

    // Background circle accents
    ctx.beginPath();
    ctx.arc(1050, 150, 260, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(252, 235, 240, 0.45)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(120, 1080, 220, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(238, 232, 250, 0.45)';
    ctx.fill();

    // 2. Brand Header
    ctx.fillStyle = '#C75C7A';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('❤  LOVELENS', 100, 110);

    ctx.fillStyle = '#786B72';
    ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Personal Relationship Self-Discovery Profile', 100, 150);

    // 3. Central Card Frame
    const cardX = 100;
    const cardY = 190;
    const cardW = 1000;
    const cardH = 880;
    const radius = 28;

    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(83, 55, 68, 0.08)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 16;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = '#F0E4E8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.stroke();

    // 4. Leading Language Badge & Headline
    ctx.fillStyle = '#FCEBF0';
    ctx.beginPath();
    ctx.roundRect(160, 240, 260, 44, 22);
    ctx.fill();

    ctx.fillStyle = '#C75C7A';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('LEADING LOVE PROFILE', 185, 268);

    // Main result title
    ctx.fillStyle = '#30272C';
    ctx.font = 'italic bold 42px "DM Serif Display", Georgia, -apple-system, serif';
    const profileTitle = result.profileType === 'combined'
      ? `${topMeta.name} & ${secondMeta.name}`
      : topMeta.name;
    
    // Truncate if title is very long
    const displayTitle = profileTitle.length > 36 ? profileTitle.substring(0, 34) + '...' : profileTitle;
    ctx.fillText(displayTitle, 160, 335);

    // Subtitle / tagline
    ctx.fillStyle = '#786B72';
    ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    const tag = topMeta.tagline || 'How you connect and feel most appreciated';
    const displayTag = tag.length > 60 ? tag.substring(0, 58) + '...' : tag;
    ctx.fillText(displayTag, 160, 375);

    // Separator line
    ctx.strokeStyle = '#F0E4E8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(160, 415);
    ctx.lineTo(1040, 415);
    ctx.stroke();

    // 5. Category Scores
    const barStartY = 460;
    const rowHeight = 78;
    const barWidth = 400;
    const barHeight = 18;

    result.scores.forEach((cat, idx) => {
      const y = barStartY + (idx * rowHeight);
      const localized = categories[cat.categoryId] || cat;

      // Category Name
      ctx.fillStyle = '#30272C';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      const catNameDisplay = localized.name.length > 22 ? localized.name.substring(0, 20) + '..' : localized.name;
      ctx.fillText(catNameDisplay, 160, y + 16);

      // Raw score band
      ctx.fillStyle = '#786B72';
      ctx.font = '400 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(cat.band, 160, y + 42);

      // Score bar track
      const barX = 520;
      ctx.fillStyle = '#F4ECEF';
      ctx.beginPath();
      ctx.roundRect(barX, y + 4, barWidth, barHeight, 9);
      ctx.fill();

      // Score bar filled
      const fillW = Math.max(16, (cat.rawScore / 25) * barWidth);
      ctx.fillStyle = cat.categoryId === result.topCategory.categoryId ? '#C75C7A' : '#786B72';
      ctx.beginPath();
      ctx.roundRect(barX, y + 4, fillW, barHeight, 9);
      ctx.fill();

      // Numbers text
      ctx.fillStyle = '#30272C';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${cat.rawScore}/25`, barX + barWidth + 24, y + 18);

      ctx.fillStyle = '#786B72';
      ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${cat.percentage}%`, barX + barWidth + 24, y + 42);
    });

    // 6. Card Footer
    ctx.fillStyle = '#FFF9F5';
    ctx.beginPath();
    ctx.roundRect(160, 930, 880, 80, 16);
    ctx.fill();

    ctx.strokeStyle = '#F0E4E8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(160, 930, 880, 80, 16);
    ctx.stroke();

    ctx.fillStyle = '#C75C7A';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Take the free test at lovelens.me', 200, 978);

    ctx.fillStyle = '#786B72';
    ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('25 questions · 5 minutes · Private & Free', 640, 978);

    // 7. Watermark bottom
    ctx.fillStyle = '#A0939A';
    ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LoveLens — Educational self-reflection tool inspired by relationship frameworks', width / 2, 1140);
    ctx.textAlign = 'left';

    resolve(canvas.toDataURL('image/png'));
  });
}
