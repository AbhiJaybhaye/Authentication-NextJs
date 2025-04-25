import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

    try {
        
        const userDetails = await getDataFromToken(request);
        
        const { userId, userUsername, userEmail } = userDetails;

        if (!userDetails) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        

        const user = await User.findOne({ _id: userId , username: userUsername, email: userEmail }).select("-password");
        
        return NextResponse.json({
            message: "User found",
            success: true,
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}