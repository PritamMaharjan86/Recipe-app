const config = {
  app: {
    port: process.env.PORT,
    saltKey: process.env.SALT_KEY,
    refreshTokenExpiryInMinute: process.env.REFRESH_TOKEN_EXPIRY_IN_MINUTE, // 1 day
    accessTokenExpiryInMinute: process.env.ACCESS_TOKEN_EXPIRY_IN_MINUTE
  },
  db: {
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
};
console.log("db", process.env.DB_USER);
export default config;
