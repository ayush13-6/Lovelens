export const RATING_OPTIONS = [
  { value: 1, label: 'Not at all meaningful', short: 'Not at all' },
  { value: 2, label: 'Slightly meaningful', short: 'Slightly' },
  { value: 3, label: 'Moderately meaningful', short: 'Moderately' },
  { value: 4, label: 'Very meaningful', short: 'Very' },
  { value: 5, label: 'Extremely meaningful', short: 'Extremely' }
];

export const RAW_QUESTIONS = [
  // Words of Affirmation (1-5)
  {
    id: 1,
    category: 'words_of_affirmation',
    text: 'Hearing that someone appreciates me makes me feel loved.'
  },
  {
    id: 2,
    category: 'words_of_affirmation',
    text: 'I value being told what someone admires about me.'
  },
  {
    id: 3,
    category: 'words_of_affirmation',
    text: 'Encouraging words help me feel supported when I doubt myself.'
  },
  {
    id: 4,
    category: 'words_of_affirmation',
    text: 'A heartfelt message from someone I love can brighten my entire day.'
  },
  {
    id: 5,
    category: 'words_of_affirmation',
    text: 'I feel closer to someone when they openly express their affection for me.'
  },

  // Quality Time (6-10)
  {
    id: 6,
    category: 'quality_time',
    text: 'I feel loved when someone gives me their full attention without distractions.'
  },
  {
    id: 7,
    category: 'quality_time',
    text: 'Having meaningful conversations matters more to me than expensive gifts.'
  },
  {
    id: 8,
    category: 'quality_time',
    text: 'I appreciate when someone makes time for me despite a busy schedule.'
  },
  {
    id: 9,
    category: 'quality_time',
    text: 'Doing ordinary activities together makes me feel closer to someone.'
  },
  {
    id: 10,
    category: 'quality_time',
    text: 'I feel connected when someone is genuinely present rather than distracted by their phone.'
  },

  // Receiving Gifts (11-15)
  {
    id: 11,
    category: 'receiving_gifts',
    text: 'A thoughtful gift makes me feel that someone remembers and understands me.'
  },
  {
    id: 12,
    category: 'receiving_gifts',
    text: 'I value small surprises chosen especially for me.'
  },
  {
    id: 13,
    category: 'receiving_gifts',
    text: 'An object that reminds someone of a shared memory feels meaningful to me.'
  },
  {
    id: 14,
    category: 'receiving_gifts',
    text: 'I appreciate when someone puts thought into a gift, even if it costs very little.'
  },
  {
    id: 15,
    category: 'receiving_gifts',
    text: 'Receiving a small token on an important occasion helps me feel remembered.'
  },

  // Acts of Service (16-20)
  {
    id: 16,
    category: 'acts_of_service',
    text: 'I feel cared for when someone helps me with a task that is stressing me out.'
  },
  {
    id: 17,
    category: 'acts_of_service',
    text: 'It means a lot when someone notices what needs doing and helps without being asked.'
  },
  {
    id: 18,
    category: 'acts_of_service',
    text: 'I feel supported when someone follows through on a promise they made to help me.'
  },
  {
    id: 19,
    category: 'acts_of_service',
    text: 'Practical help during a difficult day makes me feel less alone.'
  },
  {
    id: 20,
    category: 'acts_of_service',
    text: 'I appreciate when someone takes a task off my plate to make my day easier.'
  },

  // Physical Touch (21-25)
  {
    id: 21,
    category: 'physical_touch',
    text: 'A hug from someone I love helps me feel emotionally connected.'
  },
  {
    id: 22,
    category: 'physical_touch',
    text: 'Holding hands makes me feel close to my partner.'
  },
  {
    id: 23,
    category: 'physical_touch',
    text: 'I appreciate affectionate physical gestures when we greet or say goodbye.'
  },
  {
    id: 24,
    category: 'physical_touch',
    text: 'Sitting close together or cuddling makes me feel cared for.'
  },
  {
    id: 25,
    category: 'physical_touch',
    text: 'When I am upset, a comforting hug can mean a lot to me.'
  }
];

/**
 * Returns interleaved questions so categories cycle smoothly:
 * e.g., Words -> Quality Time -> Gifts -> Service -> Touch, repeated 5 rounds.
 * This ensures balanced, non-block distribution while keeping questions completely deterministic.
 */
export function getInterleavedQuestions() {
  const groups = {
    words_of_affirmation: RAW_QUESTIONS.filter(q => q.category === 'words_of_affirmation'),
    quality_time: RAW_QUESTIONS.filter(q => q.category === 'quality_time'),
    receiving_gifts: RAW_QUESTIONS.filter(q => q.category === 'receiving_gifts'),
    acts_of_service: RAW_QUESTIONS.filter(q => q.category === 'acts_of_service'),
    physical_touch: RAW_QUESTIONS.filter(q => q.category === 'physical_touch'),
  };

  const order = [
    'words_of_affirmation',
    'quality_time',
    'receiving_gifts',
    'acts_of_service',
    'physical_touch'
  ];

  const interleaved = [];
  for (let i = 0; i < 5; i++) {
    for (const key of order) {
      if (groups[key][i]) {
        interleaved.push(groups[key][i]);
      }
    }
  }

  return interleaved;
}
