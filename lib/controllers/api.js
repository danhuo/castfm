'use strict';

var Fm = require('douban.fm'),
    fm = new Fm();

/**
 * Get channels
 */
exports.channels = function(req, res) {
  fm.sdk.channels(function(err, channels){
    if (!err) {
      return res.json(channels);
    } else {
      return res.send(err);
    }
  });
};