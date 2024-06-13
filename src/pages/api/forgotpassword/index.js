// import connectDB from "../../../libs/dbconnect";
// import { hashPassword } from "../../../util/auth";
// import User from "../../../models/User";
// import { v4 as uuidv4 } from "uuid";

// export default async function handler(req, res) {
//   await connectDB();
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(400).json({ message: "Invalid email" });
//   }

//   const resetToken = uuidv4();
//   const hashedResetToken = await hashPassword(resetToken);

//   await db
//     .collection("users")
//     .updateOne({ email }, { $set: { resetToken: hashedResetToken } });

//   // Send reset token to user's email

//   res.status(200).json({ message: "Reset token sent to email" });
// }
