// ANSI escape codes
const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

// Helper to choose color based on HTTP status code
const getStatusColor = (status) => {
  if (status >= 500) return colors.red;
  if (status >= 400) return colors.yellow;
  if (status >= 300) return colors.cyan;
  if (status >= 200) return colors.green;
  return colors.reset;
};

// Middleware to console log requests
export const requestLogger = (req, res, next) => {
  // Listen for the response finish event to capture the final HTTP status code
  res.on('finish', () => {
    // req.ip works best when 'trust proxy' is configured if behind a reverse proxy
    const rawIp = req.ip || req.socket.remoteAddress || '';
    const clientIp = rawIp.replace(/^::ffff:/, '');
    const { method, originalUrl } = req;
    const { statusCode } = res;

    // Coloring to status code
    const statusColor = getStatusColor(statusCode);
    const status = `${statusColor}${statusCode}${colors.reset}`;

    console.log(`[${status}] ${clientIp} - ${method} ${originalUrl}`);
  });

  next();
};
