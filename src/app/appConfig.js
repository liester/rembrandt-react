const appConfig = {
  reduxLoggerEnabled: false,
  socketUrl: 'http://localhost:4001',
  apiBaseUrl: process.env.NODE_ENV == 'production'? 'http://rembrandt.proxibid.com:4001':'http://localhost:4001',
};

export default appConfig;
