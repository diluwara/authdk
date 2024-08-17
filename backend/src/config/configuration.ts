const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
export default () => ({
  port: parseInt(process.env.NODE_LOCAL_PORT, 10) || 3000,
  databaseUri: process.env.MONGO_URI || uri,
  reactPortUri: process.env.REACT_PORT_URI || 'http://localhost:3000',
});
