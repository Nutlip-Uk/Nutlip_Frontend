import connectToDb from "../../libs/dbconnect"; // Database connection
import User from "../../models/User"; // User schema
import UserType from "../../models/UserType";

async function Handler(req, res) {
  await connectToDb(); // Connect to database before handling request

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, email, password } = req.body;

  // User data validation
  const errors = {};
  if (!username) errors.username = "fullname is required";
  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  if (password.length < 6)
    errors.password =
      "Password must contain at least one uppercase, one lowercase, one number and minimum 6 characters";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  //* Check for existing user with the same email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }
  console.log(existingUser);

  try {
    const newUser = new User({
      username,
      email,
      password,
      userType: "",
      newUser: true,
    });

    const newUsertype = new UserType({
      userId: newUser._id,
      type: req.body.type ? req.body.type : "property_buyer",
    });

    newUser.userType = newUsertype._id;
    await newUser.save();
    await newUsertype.save();

    res.status(201).json({ message: "User created successfulaly" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
}

export default Handler;
