const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getFlowers', mid.requiresLogin, controllers.Flower.getFlowers);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/password', mid.requiresLogin, controllers.Account.passwordPage);
  app.post('/password', mid.requiresSecure, controllers.Account.changePassword);
  app.get('/buy', mid.requiresLogin, controllers.Account.buyPage);
  app.get('/maker', mid.requiresLogin, controllers.Flower.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Flower.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
