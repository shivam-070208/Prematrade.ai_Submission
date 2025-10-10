import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel"; // Assuming you have a User model set up with Mongoose
import { setSession } from "@/utils/Session";

// Define the route for POST /api/signup
export async function POST(request: NextRequest) {
    try {
        const { username, email, password,firstname,lastname } = await request.json();

        // Basic validation
        if (!username || !email || !password||!firstname||!lastname) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        // Create the new user
        const newUser = await User.create({ username, email, password,lastname,firstname });

        await setSession(newUser);
        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });

    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
