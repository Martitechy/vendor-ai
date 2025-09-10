const authorizeRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        code: 403,
        status: "error",
        message: "Forbidden: You do not have permission",
        data: null,
      });
    }
    next();
  };
};
export { authorizeRole };
