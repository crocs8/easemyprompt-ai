import { resetTokensIfNeeded, deductTokens } from "../services/token.service.js";

const tokenMiddleware = (cost) => {
  return async (req, res, next) => {
    const user = req.user;

    // reset tokens if new day
    resetTokensIfNeeded(user);

    // check & deduct
    const success = deductTokens(user, cost);
    if (!success) {
      return res.status(403).json({ message: "Insufficient tokens" });
    }

    await user.save();
    next();
  };
};

export default tokenMiddleware;
