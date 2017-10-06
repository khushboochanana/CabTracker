'use strict';

/**################################################################################
 #                             	User Route Definition                             #
 ################################################################################ */

module.exports = function (app, handler) {
    app.post('/user', handler.addUser);
    app.put('/user/:id', handler.addUser);
    app.get('/user/:emailId', handler.me);
};