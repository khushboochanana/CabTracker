/**################################################################################
 #                             Cab Route Definition                                  #
 ################################################################################ */

module.exports = (app, handler) => {
    app.get('/:id', handler.cabDetails);
};