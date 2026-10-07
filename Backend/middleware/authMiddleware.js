const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }
      req.userId = decodedUser.userId;
      next();
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired Token",
    });
  }
};
export default authMiddleware;
