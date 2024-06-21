// Get the count of users for each user type
import User from "../models/User";
import UserType from "../models/UserTypes";

/**
 * Retrieves the count of users for each user type.
 * @returns {Promise<Array<{ userType: string, count: number }>>} An array of objects containing the user type and the count of users for that type.
 */
export const getUserTypeCounts = async () => {
  const userTypeCounts = await User.aggregate([
    {
      $group: {
        _id: "$userType",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "usertypes",
        localField: "_id",
        foreignField: "_id",
        as: "userType",
      },
    },
    {
      $unwind: "$userType",
    },
    {
      $project: {
        _id: 0,
        userType: "$userType.type",
        count: 1,
      },
    },
  ]);

  return userTypeCounts;
};

// Get all users of a specific user type
/**
 * Retrieves all users of a specific user type.
 * @param {string} userType - The type of user to retrieve.
 * @returns {Promise<User[]>} An array of User objects for the specified user type.
 * @throws {Error} If the specified user type is not found.
 */
export const getUsersByType = async (userType) => {
  const userTypeDoc = await UserType.findOne({ type: userType });
  if (!userTypeDoc) {
    throw new Error(`User type "${userType}" not found`);
  }

  const users = await User.find({ userType: userTypeDoc._id });
  return users;
};

// Get the permissions for a specific user type
/**
 * Retrieves the permissions for a specific user type.
 * @param {string} userType - The type of user to retrieve the permissions for.
 * @returns {Promise<Object>} An object containing the permissions for the specified user type.
 * @throws {Error} If the specified user type is not found.
 */
export const getUserTypePermissions = async (userType) => {
  const userTypeDoc = await UserType.findOne({ type: userType });
  if (!userTypeDoc) {
    throw new Error(`User type "${userType}" not found`);
  }

  return userTypeDoc.permissions;
};
