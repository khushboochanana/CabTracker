'use strict';

/**################################################################################
 #                             Cab Route Definition                                  #
 ################################################################################ */

module.exports = function (app, handler) {
  app.get('/cab/:id', handler.cabDetails);
};