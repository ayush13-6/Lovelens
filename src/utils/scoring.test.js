import { describe, it, expect } from 'vitest';
import { calculateQuizResult, validateAnswers, getScoreBand } from './scoring.js';
import { RAW_QUESTIONS } from '../data/questions.js';

describe('LoveLens Scoring Engine', () => {
  // Helper to generate answers object
  const makeAnswers = (fillValue) => {
    const answers = {};
    for (const q of RAW_QUESTIONS) {
      answers[q.id] = typeof fillValue === 'function' ? fillValue(q) : fillValue;
    }
    return answers;
  };

  // Test 1: All answers set to 1
  it('1. calculates correctly when all answers are set to 1', () => {
    const answers = makeAnswers(1);
    const result = calculateQuizResult(answers);

    expect(result.scores).toHaveLength(5);
    for (const score of result.scores) {
      expect(score.rawScore).toBe(5); // 5 questions * 1
      expect(score.percentage).toBe(20); // (5 / 25) * 100
      expect(score.band).toBe('Less prominent in these answers');
    }
    expect(result.gap).toBe(0);
    expect(result.profileType).toBe('combined');
  });

  // Test 2: All answers set to 5
  it('2. calculates correctly when all answers are set to 5', () => {
    const answers = makeAnswers(5);
    const result = calculateQuizResult(answers);

    expect(result.scores).toHaveLength(5);
    for (const score of result.scores) {
      expect(score.rawScore).toBe(25); // 5 questions * 5
      expect(score.percentage).toBe(100); // (25 / 25) * 100
      expect(score.band).toBe('Especially meaningful');
    }
    expect(result.gap).toBe(0);
    expect(result.profileType).toBe('combined');
  });

  // Test 3: A clear leading category (gap >= 5)
  it('3. identifies a clear leading category (gap >= 5 points)', () => {
    // Quality time = all 5s (25)
    // All other categories = all 2s (10)
    const answers = makeAnswers((q) => (q.category === 'quality_time' ? 5 : 2));
    const result = calculateQuizResult(answers);

    expect(result.topCategory.categoryId).toBe('quality_time');
    expect(result.topCategory.rawScore).toBe(25);
    expect(result.secondCategory.rawScore).toBe(10);
    expect(result.gap).toBe(15);
    expect(result.profileType).toBe('prominent');
    expect(result.headline).toContain('Your leading love language is Quality Time');
  });

  // Test 4: A tie between two categories (gap = 0)
  it('4. detects a tie / combined profile between two leading categories (gap <= 2)', () => {
    // Words of Affirmation = 24
    // Physical Touch = 24
    // Others = 15
    const answers = makeAnswers((q) => {
      if (q.category === 'words_of_affirmation' || q.category === 'physical_touch') {
        // 4 questions * 5 + 1 question * 4 = 24
        return q.id === 1 || q.id === 21 ? 4 : 5;
      }
      return 3; // 5 * 3 = 15
    });

    const result = calculateQuizResult(answers);
    expect(result.topCategory.rawScore).toBe(24);
    expect(result.secondCategory.rawScore).toBe(24);
    expect(result.gap).toBe(0);
    expect(result.profileType).toBe('combined');
    expect(result.headline).toContain('leading profile is a blend of');
  });

  // Test 5: A missing answer
  it('5. rejects calculation when any answer is missing', () => {
    const answers = makeAnswers(3);
    delete answers[14]; // Remove question 14

    const validation = validateAnswers(answers);
    expect(validation.valid).toBe(false);
    expect(validation.missingCount).toBe(1);
    expect(validation.error).toContain('Missing answers for 1 question');

    expect(() => calculateQuizResult(answers)).toThrow(/Missing answers/);
  });

  // Test 6: Correct ranking and score calculation for all five categories
  it('6. correctly ranks and calculates scores across all five categories', () => {
    // Set predictable distinctive scores:
    // Acts of Service: 5 * 5 = 25 (Rank 1)
    // Quality Time: 5 * 4 = 20 (Rank 2)
    // Words of Affirmation: 5 * 3 = 15 (Rank 3)
    // Physical Touch: 5 * 2 = 10 (Rank 4)
    // Receiving Gifts: 5 * 1 = 5 (Rank 5)
    const answers = makeAnswers((q) => {
      switch (q.category) {
        case 'acts_of_service': return 5;
        case 'quality_time': return 4;
        case 'words_of_affirmation': return 3;
        case 'physical_touch': return 2;
        case 'receiving_gifts': return 1;
        default: return 1;
      }
    });

    const result = calculateQuizResult(answers);

    // Verify ordering
    expect(result.scores.map(s => s.categoryId)).toEqual([
      'acts_of_service',
      'quality_time',
      'words_of_affirmation',
      'physical_touch',
      'receiving_gifts'
    ]);

    // Verify individual scores and percentages
    expect(result.scores[0].rawScore).toBe(25);
    expect(result.scores[0].percentage).toBe(100);
    expect(result.scores[0].band).toBe('Especially meaningful');

    expect(result.scores[1].rawScore).toBe(20);
    expect(result.scores[1].percentage).toBe(80);
    expect(result.scores[1].band).toBe('Quite meaningful');

    expect(result.scores[2].rawScore).toBe(15);
    expect(result.scores[2].percentage).toBe(60);
    expect(result.scores[2].band).toBe('Moderately meaningful');

    expect(result.scores[3].rawScore).toBe(10);
    expect(result.scores[3].percentage).toBe(40);
    expect(result.scores[3].band).toBe('Less prominent in these answers');

    expect(result.scores[4].rawScore).toBe(5);
    expect(result.scores[4].percentage).toBe(20);
    expect(result.scores[4].band).toBe('Less prominent in these answers');

    // Gap between rank 1 (25) and rank 2 (20) is 5 => prominent
    expect(result.gap).toBe(5);
    expect(result.profileType).toBe('prominent');
  });

  // Test for gap 3-4 points (close profile)
  it('correctly handles a close second category (gap of 3 or 4 points)', () => {
    // Top category = 22, second = 19 (gap = 3)
    const answers = makeAnswers((q) => {
      if (q.category === 'words_of_affirmation') {
        return [1, 2, 3].includes(q.id) ? 4 : 5; // 4 + 4 + 4 + 5 + 5 = 22
      }
      if (q.category === 'quality_time') {
        return q.id === 6 ? 3 : 4; // 3 + 4 + 4 + 4 + 4 = 19
      }
      return 2;
    });

    const result = calculateQuizResult(answers);
    expect(result.topCategory.categoryId).toBe('words_of_affirmation');
    expect(result.topCategory.rawScore).toBe(22);
    expect(result.secondCategory.categoryId).toBe('quality_time');
    expect(result.secondCategory.rawScore).toBe(19);
    expect(result.gap).toBe(3);
    expect(result.profileType).toBe('close');
    expect(result.subheadline).toContain('following closely behind');
  });

  // Validation: out-of-range or invalid answers
  it('rejects answers that are not numbers between 1 and 5', () => {
    const answers = makeAnswers(3);
    answers[5] = 6; // Out of range
    const validation = validateAnswers(answers);
    expect(validation.valid).toBe(false);
    expect(validation.error).toContain('Invalid ratings');
    expect(() => calculateQuizResult(answers)).toThrow(/Invalid ratings/);
  });

  // Questions dataset structure verification
  it('verifies that exactly 25 statements are defined with exactly 5 per category', () => {
    expect(RAW_QUESTIONS).toHaveLength(25);

    const categories = ['words_of_affirmation', 'quality_time', 'receiving_gifts', 'acts_of_service', 'physical_touch'];
    for (const cat of categories) {
      const items = RAW_QUESTIONS.filter(q => q.category === cat);
      expect(items).toHaveLength(5);
    }
  });
});
