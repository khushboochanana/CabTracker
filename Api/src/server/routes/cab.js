/**################################################################################
 #                             Cab Route Definition                               #
 ################################################################################ */

module.exports = (app, handler) => {
    app.post('/cab', handler.addRoster);
    app.put('/cab/:id', handler.updateRoster);
    app.get('/cab/:id', handler.cabDetails);
};
