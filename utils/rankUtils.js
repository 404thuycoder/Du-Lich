/**
 * Ranking Utilities for WanderViệt
 */

const RANKS = [
  { name: 'Đồng', tier: 'I', min: 0 },
  { name: 'Đồng', tier: 'II', min: 100 },
  { name: 'Đồng', tier: 'III', min: 200 },
  { name: 'Bạc', tier: 'I', min: 300 },
  { name: 'Bạc', tier: 'II', min: 500 },
  { name: 'Bạc', tier: 'III', min: 700 },
  { name: 'Vàng', tier: 'I', min: 1000 },
  { name: 'Vàng', tier: 'II', min: 1300 },
  { name: 'Vàng', tier: 'III', min: 1600 },
  { name: 'Bạch Kim', tier: 'I', min: 2000 },
  { name: 'Bạch Kim', tier: 'II', min: 2400 },
  { name: 'Bạch Kim', tier: 'III', min: 2800 },
  { name: 'Kim Cương', tier: 'I', min: 3200 },
  { name: 'Kim Cương', tier: 'II', min: 3700 },
  { name: 'Kim Cương', tier: 'III', min: 4200 },
  { name: 'Huyền Thoại', tier: '', min: 5000 }
];

/**
 * Calculate rank and tier based on points
 * @param {number} points 
 * @returns {object} { rank, tier, nextThreshold }
 */
function calculateRank(points) {
  let currentRank = RANKS[0];
  let nextThreshold = RANKS[1].min;

  for (let i = 0; i < RANKS.length; i++) {
    if (points >= RANKS[i].min) {
      currentRank = RANKS[i];
      nextThreshold = RANKS[i + 1] ? RANKS[i + 1].min : null;
    } else {
      break;
    }
  }

  return {
    rank: currentRank.name,
    tier: currentRank.tier,
    nextThreshold: nextThreshold
  };
}

/**
 * Add XP to a user and update their rank
 * @param {string} userId 
 * @param {number} xpAmount 
 * @returns {Promise<object>} Updated user data
 */
async function addXP(userId, xpAmount, questId = null) {
  const User = require('../models/User');
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    if (questId) {
      user.claimedQuests = user.claimedQuests || [];
      if (user.claimedQuests.includes(questId)) {
        throw new Error('Nhiệm vụ này đã được nhận trước đó rồi.');
      }
      user.claimedQuests.push(questId);
    }

    user.points = Number(user.points || 0) + Number(xpAmount);
    const { rank, tier } = calculateRank(user.points);
    
    user.rank = rank;
    user.rankTier = tier;
    
    if (questId) {
      user.markModified('claimedQuests');
    }
    
    await user.save();
    return user;
  } catch (err) {
    console.error('Error adding XP for user', userId, ':', err);
    return null;
  }
}

module.exports = {
  RANKS,
  calculateRank,
  addXP
};
