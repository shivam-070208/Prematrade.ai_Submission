import { NextResponse } from "next/server";
import  { checkSession } from "@/utils/Session";


export async function GET() {
    try {
        const session = await checkSession();
        
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Authenticated", user: session },
            { status: 200 }
        );
    } catch (error) {
        console.error("Auth check failed:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
