function verifyCsrf(req, res, next) {
  const cookieToken = req.cookies?.csrfToken;
  const headerToken = req.headers["x-csrf-token"] || req.body?.csrf;
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
  next();
};

module.exports = verifyCsrf;
