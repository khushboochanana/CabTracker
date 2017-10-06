/**################################################################################
 #                             	User Route Definition                             #
 ################################################################################ */

module.exports = (app, handler) => {
    app.get('/user/me', handler.me);
    app.post('/user/', handler.addUser);
};