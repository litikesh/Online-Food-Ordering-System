// The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
