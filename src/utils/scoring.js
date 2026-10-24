import { RAW_QUESTIONS } from '../data/questions.js';
import { CATEGORIES } from '../data/categories.js';

export const SCORE_BANDS = [
  { min: 21, max: 25, label: 'Especially meaningful' },
  { min: 16, max: 20, label: 'Quite meaningful' },
  { min: 11, max: 15, label: 'Moderately meaningful' },
  { min: 5, max: 10, label: 'Less prominent in these answers' }
];

export function getScoreBand(score) {
  for (const band of SCORE_BANDS) {
    if (score >= band.min && score <= band.max) {
      return band.label;
    }
  }
  return 'Less prominent in these answers';
}

/**
 * Validates that all 25 questions have an integer answer between 1 and 5.
 * @param {Record<number, number>} answers - Map of questionId -> rating
 * @returns {{ valid: boolean, missingCount: number, error?: string }}
 */
export function validateAnswers(answers) {
  if (!answers || typeof answers !== 'object') {
    return { valid: false, missingCount: 25, error: 'Answers must be provided as an object.' };
  }

  const missing = [];
  const invalid = [];

  for (const q of RAW_QUESTIONS) {
    const val = answers[q.id];
    if (val === undefined || val === null) {
      missing.push(q.id);
    } else if (typeof val !== 'number' || val < 1 || val > 5 || !Number.isInteger(val)) {
      invalid.push(q.id);
    }
  }

  if (missing.length > 0) {
    return {
      valid: false,
      missingCount: missing.length,
      error: `Missing answers for ${missing.length} question(s): ${missing.join(', ')}.`
    };
  }

  if (invalid.length > 0) {
    return {
      valid: false,
      missingCount: invalid.length,
      error: `Invalid ratings for question(s): ${invalid.join(', ')}. Ratings must be integers between 1 and 5.`
    };
  }

  return { valid: true, missingCount: 0 };
}

/**
 * Calculates scores, percentages, ranking, and leading profile.
 * Throws an Error if any answer is missing or invalid.
 *
 * @param {Record<number, number>} answers - Map of question ID (1..25) to rating (1..5)
 * @returns {QuizResult}
 */
export function calculateQuizResult(answers) {
  const validation = validateAnswers(answers);
  if (!validation.valid) {
    throw new Error(validation.error || 'Cannot calculate results: incomplete answers.');
  }

  // Initialize raw scores
  const categoryTotals = {
    words_of_affirmation: 0,
    quality_time: 0,
    receiving_gifts: 0,
    acts_of_service: 0,
    physical_touch: 0
  };

  // Sum answers for each category
  for (const q of RAW_QUESTIONS) {
    categoryTotals[q.category] += answers[q.id];
  }

  // Build category score items
  const scores = Object.keys(categoryTotals).map(catId => {
    const rawScore = categoryTotals[catId];
    const percentage = Math.round((rawScore / 25) * 100);
    const band = getScoreBand(rawScore);
    const meta = CATEGORIES[catId];

    return {
      categoryId: catId,
      name: meta?.name || catId,
      shortName: meta?.shortName || catId,
      rawScore,
      maxScore: 25,
      percentage,
      band,
      color: meta?.color || '#C75C7A',
      bgSoft: meta?.bgSoft || '#FCEBF0',
      tagline: meta?.tagline || '',
      summary: meta?.summary || '',
      whatItMeans: meta?.whatItMeans || '',
      practicalWays: meta?.practicalWays || [],
      conversationStarter: meta?.conversationStarter || ''
    };
  });

  // Sort descending by rawScore.
  // In the event of an exact tie, stable sort preserves deterministic order
  scores.sort((a, b) => b.rawScore - a.rawScore);

  const topCategory = scores[0];
  const secondCategory = scores[1];
  const gap = topCategory.rawScore - secondCategory.rawScore;

  let profileType = 'prominent';
  let headline = '';
  let subheadline = '';
  let profileDescription = '';

  if (gap <= 2) {
    profileType = 'combined';
    headline = `Your leading profile is a blend of ${topCategory.name} and ${secondCategory.name}`;
    subheadline = `You scored ${topCategory.rawScore} in ${topCategory.name} and ${secondCategory.rawScore} in ${secondCategory.name}, showing that both expressions play a deeply complementary role in how you feel loved.`;
    profileDescription = `Because your scores are so close (${topCategory.rawScore} vs. ${secondCategory.rawScore} out of 25), you likely thrive when affection incorporates both ${topCategory.name.toLowerCase()} and ${secondCategory.name.toLowerCase()}. One without the other may feel incomplete.`;
  } else if (gap <= 4) {
    profileType = 'close';
    headline = `Your leading love language is ${topCategory.name}`;
    subheadline = `${topCategory.name} is your primary expression (${topCategory.rawScore}/25), with ${secondCategory.name} following closely behind (${secondCategory.rawScore}/25).`;
    profileDescription = `While ${topCategory.name} stands out as your most resonant expression, ${secondCategory.name} also carries notable weight in your emotional connection. Notice how these two preferences support one another in your daily relationships.`;
  } else {
    profileType = 'prominent';
    headline = `Your leading love language is ${topCategory.name}`;
    subheadline = `${topCategory.name} is distinctly prominent in your answers, scoring ${topCategory.rawScore} out of 25 (${topCategory.percentage}%).`;
    profileDescription = `${topCategory.name} clearly anchors your sense of security and intimacy in relationships. Focusing on this area provides the clearest path to feeling appreciated, grounded, and valued.`;
  }

  // ADDON FEATURE: Calculate single overall love language
  // If top scores tie, break tie by counting rating 5s ("Extremely meaningful"), then rating 4s
  let overallCategory = scores[0];
  let overallTieBroken = false;

  if (scores.length > 1 && scores[0].rawScore === scores[1].rawScore) {
    const tiedCats = scores.filter(s => s.rawScore === scores[0].rawScore);
    const countRating = (catId, rating) => {
      const catQuestions = RAW_QUESTIONS.filter(q => q.category === catId);
      return catQuestions.reduce((acc, q) => acc + (answers[q.id] === rating ? 1 : 0), 0);
    };

    const sortedTied = [...tiedCats].sort((a, b) => {
      const fiveDiff = countRating(b.categoryId, 5) - countRating(a.categoryId, 5);
      if (fiveDiff !== 0) return fiveDiff;
      const fourDiff = countRating(b.categoryId, 4) - countRating(a.categoryId, 4);
      return fourDiff;
    });

    overallCategory = sortedTied[0];
    overallTieBroken = true;
  }

  return {
    scores,
    topCategory,
    secondCategory,
    overallCategory,
    overallTieBroken,
    gap,
    profileType,
    headline,
    subheadline,
    profileDescription,
    completedAt: new Date().toISOString()
  };
}
