export default (controllerFuntion) => (req, res, next) => Promise.resolve(controllerFuntion(req, res, next)).catch(next); 