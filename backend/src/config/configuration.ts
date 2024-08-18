export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUri: process.env.MONGO_URI || 'mongodb://localhost/nest',
  jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
});
