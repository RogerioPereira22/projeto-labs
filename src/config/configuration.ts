export default () => ({
  PORT: parseInt(process.env.PORT, 10),
  THROTTLE_TTL: parseInt(process.env.THROTTLE_TTL, 10),
  THROTTLE_LIMIT: parseInt(process.env.THROTTLE_LIMIT, 10),
  JWT_SECRET: process.env.JWT_SECRET,
});
