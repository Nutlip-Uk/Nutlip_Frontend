// pages/api/logout.js

import { serialize } from "cookie";

export default async function logout(req, res) {
  // Clear the authentication cookie
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.JWT_SECRET !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );

  res.status(200).json({ message: "Logged out successfully" });
}
