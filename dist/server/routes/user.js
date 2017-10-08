'use strict';

/**################################################################################
 #                             	User Route Definition                             #
 ################################################################################ */

module.exports = function (app, handler) {
  app.post('/user', handler.addUser);
  app.post('/user/:cabId/notification', handler.notification);
  app.put('/user/:id', handler.updateUser);
  app.get('/user/:emailId', handler.me);
};