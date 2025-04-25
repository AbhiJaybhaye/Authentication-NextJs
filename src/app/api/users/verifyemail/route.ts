import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest){

    try {
        const {email, otp } = await request.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.otp !== otp || user.otpExpiry < new Date()) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

        if (user.isVerified) {
            return NextResponse.json({ error: "Email already verified" }, { status: 400 });
        }

        console.log("Find user before email=>",user);

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        
        console.log("Find user before email=>",user);
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}