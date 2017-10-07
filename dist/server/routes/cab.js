'use strict';

/**################################################################################
 #                             Cab Route Definition                                  #
 ################################################################################ */

module.exports = function (app, handler) {
    app.post('/cab', handler.addRoster);
    app.put('/cab/:id', handler.addRoster);
    app.get('/cab/:id', handler.cabDetails);
};