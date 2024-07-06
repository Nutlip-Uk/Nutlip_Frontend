// pages/api/user/[userId].js
import dbConnect from "../../../libs/dbconnect";
import User from "../../../models/User";
import UserType from "../../../models/UserTypes";
import bcrypt from "bcrypt";
//import { getSession } from "next-auth/react";

/**
 * Handles HTTP requests to the `/api/user/[userId]` endpoint.
 *
 * Supports the following HTTP methods:
 * - `GET`: Retrieves the user with the specified `userId`.
 * - `PUT`: Updates the user with the specified `userId` with the provided `username` and `email`.
 * - `DELETE`: Deletes the user with the specified `userId`.
 *
 * The endpoint requires authentication. Only the user with the matching `userId` is allowed to access their own data.

 */
export default async function handler(req, res) {
  await dbConnect();
  // const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // const { userId } = req.query;

  // if (session.user.id !== userId) {
  //   return res.status(403).json({ message: "Forbidden" });
  // }
  // console.log(req.body);
  const { userId } = req.query;
  if (req.method === "GET") {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const {
        username,
        email,
        password,
        userType,
        Title,
        FirstName,
        MiddleName,
        LastName,
        Country,
        city,
        PostCode,
        Address1,
        Address2,
        BusinessName,
        CompanyName,
        CompanyNumber,
        PhoneNumber,
        MobileNumber,
        website,
        newUser,
      } = req.body;

      console.log("Received userType:", req.body);

      // Hash the new password if it's provided
      let hashedPassword = null;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      // Find the UserType document based on the provided userType string
      // Find the UserType document based on the provided userType string
      let userTypeId = undefined;
      if (userType) {
        const userTypeDoc = await UserType.findOne(
          { type: { $regex: new RegExp(`^${userType}$`, "i") } },
          { _id: 1, type: 1 } // Only select the _id and type fields
        );
        console.log("Found UserType:", userTypeDoc);
        if (userTypeDoc) {
          userTypeId = userTypeDoc._id;
        } else {
          const availableTypes = await UserType.find({}, "type");
          console.log("Available UserTypes:", availableTypes);
          return res
            .status(400)
            .json({ message: "Invalid user type", availableTypes });
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          username,
          email,
          password: hashedPassword || undefined, //? Use the new hashed password or keep the existing one
          userType: userTypeId, // Use the ObjectId of the found UserType document // ?
          Title,
          FirstName,
          MiddleName,
          LastName,
          Country,
          city,
          PostCode,
          Address1,
          Address2,
          BusinessName,
          CompanyName,
          CompanyNumber,
          PhoneNumber,
          MobileNumber,
          website,
          newUser,
        },
        { new: true, runValidators: true }
      ).populate("userType");
      if (password) {
        updatedUser.password = password;
      }

      // Update email if provided
      if (email) {
        updatedUser.email = email;
      }
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(updatedUser);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
