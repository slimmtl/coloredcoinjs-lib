var _ = require('lodash')
var inherits = require('util').inherits

var SQLiteProvider = require('../providers/sqlite')
var AbstractSQLColorDefinitionStorage = require('./abstractsql')

/**
 * @class ColorDefinitionSQLiteStorage
 * @extends AbstractSQLColorDefinitionStorage
 *
 * @param {Object} [opts]
 * @param {string} [opts.filename=cclib-defintions.sqlite3]
 */
function ColorDefinitionSQLiteStorage (opts) {
  this._opts = _.extend({
    filename: 'cclib-definitions.sqlite3'
  }, opts)

  var provider = new SQLiteProvider(this._opts.filename)
  AbstractSQLColorDefinitionStorage.call(this, provider)
}

inherits(ColorDefinitionSQLiteStorage, AbstractSQLColorDefinitionStorage)

ColorDefinitionSQLiteStorage.isAvailable = SQLiteProvider.isAvailable

/**
 * @return {string}
 */
ColorDefinitionSQLiteStorage.prototype.inspect = function () {
  return '<storage.definitions.ColorDefinitionSQLiteStorage ' + this._opts.filename + '>'
}

module.exports = ColorDefinitionSQLiteStorage