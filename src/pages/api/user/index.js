import User from "../../../models/User";
import UserType from "../../../models/UserTypes";
import {
  getUserTypeCounts,
  getUsersByType,
  getUserTypePermissions,
} from "../../../libs/user-types";

/**
 * Handles HTTP requests to the /api/users endpoint.
 *
 * Supports the following query parameters:
 * - `userType`: Retrieves users of the specified user type.
 * - `counts`: Retrieves the counts of users for each user type.
 * - `userType` and `permissions`: Retrieves the permissions for the specified user type.
 *
 * Returns the appropriate data or an error message in the response.
 *
 */
export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      // Handle GET requests
      if (query.userType) {
        // GET /api/users?userType=<userType>
        try {
          const users = await getUsersByType(query.userType);
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else if (query.counts) {
        // GET /api/users?counts=true
        try {
          const userTypeCounts = await getUserTypeCounts();
          res.status(200).json(userTypeCounts);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        res.status(400).json({ error: "Invalid query parameters" });
      }
      break;

    case "GET":
      // Handle GET requests for user type permissions
      if (query.userType && query.permissions) {
        // GET /api/users?userType=<userType>&permissions=true
        try {
          const permissions = await getUserTypePermissions(query.userType);
          res.status(200).json(permissions);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        res.status(400).json({ error: "Invalid query parameters" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
