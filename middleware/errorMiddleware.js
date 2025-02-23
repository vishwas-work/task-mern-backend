const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // console.error(`[${statusCode}] ${err.message}`);

  const errorResponses = {
    400: "Validation Failed",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Server Error",
  };

  res.status(statusCode).json({
    title: errorResponses[statusCode] || "Code Error",
    message: err.message,
    stackTrace: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  next();
};

export default errorHandler;
