const env =process.env.NODE_ENV;
console.log(env)
const appConfig = {
  reduxLoggerEnabled: false,
  socketUrl: process.env.NODE_ENV === "production"? 'http://rembrandt.proxibid.com:4001':'http://localhost:4001',
  apiBaseUrl: process.env.NODE_ENV === "production"? 'http://rembrandt.proxibid.com:4001':'http://localhost:4001',
};

export default appConfig;
