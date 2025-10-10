import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel"; 
import { setSession } from "@/utils/Session";


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }
        const user = await User.login(email, password);
        
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        await setSession(user);  
        return NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
