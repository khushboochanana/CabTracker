'use strict';

/**################################################################################
 #                             Cab Route Definition                                  #
 ################################################################################ */

module.exports = function (app, handler) {
  app.get('/:id', handler.cabDetails);
};