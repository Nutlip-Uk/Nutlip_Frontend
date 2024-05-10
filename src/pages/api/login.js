// // pages/api/login.js

import dbConnect from "../../libs/dbconnect";
// import { getSession } from "next-auth/react";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  await dbConnect();
  // const session = await getSession({ req });
  // if (!session) {
  //   res.status(401).json({ error: "Not authenticated" });
  //   return;
  // }
  // // If session exists, user is logged in
  // res.status(200).json({ message: "Success" });

  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid email" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(400)
          .json({ message: "Invalid or incorrect password" });
      }


      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      // Set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          maxAge: 86400, // 1 day
          sameSite: "strict",
          path: "/",
        })
      );

      // Set cookie
      // res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly: true`);
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.username,
          email: user.email,
          newUser:user.newUser
        },
      });
      console.log("user has been logged in");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
