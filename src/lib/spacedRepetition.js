// SM-2 Spaced Repetition Algorithm
// Tracks flashcard review state in localStorage

const STORAGE_KEY = "stockilearn_flashcard_progress";

export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

// SM-2 algorithm: quality 0-5 (0=Again, 3=Hard, 4=Good, 5=Easy)
export function saveProgress(termKey, quality) {
  const progress = getProgress();
  const card = progress[termKey] || { interval: 0, repetitions: 0, ease: 2.5, nextReview: null, lastReviewed: null };

  if (quality < 3) {
    card.repetitions = 0;
    card.interval = 1;
  } else {
    if (card.repetitions === 0) {
      card.interval = 1;
    } else if (card.repetitions === 1) {
      card.interval = 6;
    } else {
      card.interval = Math.round(card.interval * card.ease);
    }
    card.repetitions += 1;
  }

  card.ease = Math.max(1.3, card.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  card.lastReviewed = new Date().toISOString().split("T")[0];

  const next = new Date();
  next.setDate(next.getDate() + card.interval);
  card.nextReview = next.toISOString().split("T")[0];

  progress[termKey] = card;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return card;
}

export function getDueCards(allTerms) {
  const progress = getProgress();
  const today = new Date().toISOString().split("T")[0];
  return allTerms.filter(item => {
    const card = progress[item.term];
    if (!card) return true;
    return card.nextReview <= today;
  });
}

export function getStats(allTerms) {
  const progress = getProgress();
  const today = new Date().toISOString().split("T")[0];
  let due = 0, reviewed = 0, mastered = 0;
  for (const item of allTerms) {
    const card = progress[item.term];
    if (!card) continue;
    reviewed++;
    if (card.nextReview <= today) due++;
    if (card.interval >= 21) mastered++;
  }
  return {
    due: due + (allTerms.length - reviewed), // due + never seen
    reviewed,
    mastered,
    total: allTerms.length,
    learning: reviewed - mastered,
  };
}