export default () => ({
    port: parseInt(process.env.PORT, 10) || 7000,
    database: process.env.MONGODB_URI,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpire: process.env.JWT_EXPIRE_LIMIT
  });