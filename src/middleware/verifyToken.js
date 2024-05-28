import jwt from "jsonwebtoken";

// Middleware function to check for authentication
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach the user ID to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};