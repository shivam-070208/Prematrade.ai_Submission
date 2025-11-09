import User, { IUser } from "@/models/UserModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const Jwt_secret = process.env.JWT_SECRET || "temp_secret";

export async function setSession(user: IUser): Promise<void> {
  try {
    // Create the JWT payload with more user details
    const payload = {
      email: user.email,
      userId: user._id, // It's good to include the user ID in the payload
    };

    // Sign the JWT with a 30-day expiration
    const token = jwt.sign(payload, Jwt_secret, { expiresIn: "30d" });

    // Set the token in the cookies with security flags
    (await cookies()).set("auth_token", token, {
      httpOnly: true, // Prevents JavaScript access (mitigates XSS attacks)
      secure: process.env.NODE_ENV === "production", // Only set cookies over HTTPS in production
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      path: "/", // Cookie accessible to all routes
    });
  } catch (error) {
    console.error("Error setting session:", error);
    throw error;
  }
}

export async function checkSession(): Promise<IUser | null> {
  try {
    const token = (await cookies()).get("auth_token");

    if (!token) return null;

    const decoded = jwt.verify(token.value, Jwt_secret) as {
      email: string;
      userId: string;
    };

    if (decoded) {
      const user = await User.findOne({ email: decoded.email });
      return user;
    }

    return null;
  } catch (error) {
    console.error("Error checking session:", error);
    return null;
  }
}
