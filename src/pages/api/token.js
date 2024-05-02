// auth.js

import jwt from "jsonwebtoken";

export function signToken(user) {
  // Create payload
  const payload = {
    id: user.id,
    email: user.email,
  };
  console.log(payload);
  // Sign token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
}
