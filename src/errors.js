/**
 * Error
 *  +-- ColoredCoin
 *       +-- ColorDefinition
 *       |    +-- AlreadyRegistered
 *       |    +-- EPOBC
 *       |    |    +-- PaddingError
 *       |    +-- IncompatibilityError
 *       |    +-- IncorrectDesc
 *       |    +-- IncorrectColorId
 *       +-- ColorValue
 *       |    +-- IncompatibilityError
 *       |    +-- InvalidValuesLength
 *       +-- NotImplemented
 *       +-- Storage
 *       |    +-- ColorData
 *       |    |    +-- HaveAnotherValue
 *       |    +-- UnopenedYet
 *       +-- Tx
 *            +-- Composed
 *            |    +-- UncoloredOutput
 *            +-- Genesis
 *            |    +-- MultipleTarget
 *            |    +-- IncorrectColorId
 *            +-- InputNotFoundError
 *            +-- Operational
 *                 +-- FeeEstimator
 */

let spec = {
  name: 'ColoredCoin',
  message: 'Internal error',
  errors: [{
    name: 'ColorDefinition',
    message: 'Internal error',
    errors: [{
      name: 'AlreadyRegistered',
      message: '{0}: {1}.'
    }, {
      name: 'EPOBC',
      message: 'Internal error',
      errors: [{
        name: 'PaddingError',
        message: 'Required {0}, otherwise max 9223372036854775808.'
      }]
    }, {
      name: 'IncompatibilityError',
      message: '{0}'
    }, {
      name: 'IncorrectDesc',
      message: '{0} fail with color description: {1}.'
    }, {
      name: 'IncorrectColorId',
      message: '{0} fail with color id: {1}.'
    }]
  }, {
    name: 'ColorValue',
    message: 'Internal error',
    errors: [{
      name: 'IncompatibilityError',
      message: '{0}'
    }, {
      name: 'InvalidValuesLength',
      message: 'Array for ColorValue.sum should have at least one color value.'
    }]
  }, {
    name: 'NotImplemented',
    message: '{0}'
  }, {
    name: 'Storage',
    message: 'Internal error',
    errors: [{
      name: 'ColorData',
      message: 'Internal error',
      errors: [{
        name: 'HaveAnotherValue',
        message: 'Output {0}:{1} with color id {2} (color code: {3}) already have value {4}.'
      }]
    }, {
      name: 'UnopenedYet',
      message: 'Call open first.'
    }]
  }, {
    name: 'Tx',
    message: 'Internal error',
    errors: [{
      name: 'Composed',
      message: 'Internal error',
      errors: [{
        name: 'UncoloredOutput',
        message: 'ComposedTx output should be uncolored.'
      }]
    }, {
      name: 'Genesis',
      message: 'Internal error',
      errors: [{
        name: 'MultipleTarget',
        message: 'Genesis transactions may have only 1 target, you have: {0}.'
      }, {
        name: 'IncorrectColorId',
        message: 'Genesis transactions should have genesis color id, you have: {0}.'
      }]
    }, {
      name: 'InputNotFoundError',
      message: 'Can\'t find input on index {0}.'
    }, {
      name: 'Operational',
      message: 'Internal error',
      errors: [{
        name: 'FeeEstimator',
        message: '{0}'
      }]
    }]
  }]
}

require('error-system').extend(Error, spec)
module.exports = Error.ColoredCoin
