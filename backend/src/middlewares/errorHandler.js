import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  logger.error(`[${status}] ${message}`, err);
  
  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err })
  });
};

export default errorHandler;
