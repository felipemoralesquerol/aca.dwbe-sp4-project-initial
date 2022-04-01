module.exports = {
  secret: process.env.AUTH_SECRET || "algosecreto",
  expires: process.env.AUTH_EXPIRES || "12h",
  rounds: process.env.AUTH_ROUNDS || 10,
};
