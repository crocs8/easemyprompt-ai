import { TOKENS } from "../utils/constants.js";

export const resetTokensIfNeeded = (user) => {
  const today = new Date().toDateString();
  const lastReset = new Date(user.lastTokenReset).toDateString();

  if (today !== lastReset) {
    user.tokens = TOKENS.DAILY_RESET;
    user.lastTokenReset = new Date();
  }
};

export const deductTokens = (user, amount) => {
  if (user.tokens < amount) {
    return false;
  }
  user.tokens -= amount;
  return true;
};
