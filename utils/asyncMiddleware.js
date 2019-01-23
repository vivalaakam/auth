/**
 * Created by vivalaakam on 22.01.2019.
 *
 * @flow
 */
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncMiddleware
