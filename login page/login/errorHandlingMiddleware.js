// errorHandlingMiddleware.js

const errorHandlingMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res
      .status(500)
      .json({ message: "Something went wrong!", error: err.message });
  };
  
  module.exports = errorHandlingMiddleware;