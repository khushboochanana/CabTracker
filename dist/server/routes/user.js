'use strict';

/**################################################################################
 #                             	User Route Definition                             #
 ################################################################################ */

module.exports = function (app, handler) {
  app.get('/user/me', handler.me);
  app.post('/user/', handler.addUser);
};