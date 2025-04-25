import { sendOTP } from "@/helpers/sendOTP";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

const POST = async (req: Request) => {
    try {
        const { email } = await req.json();

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.findOne({ email });

        console.log("User found", user);

        if (!user) {            
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 }); 
        }

        await sendOTP(email, otp);

        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        console.log("OTP sent to user", user);

        return new Response(JSON.stringify({ success: true }), { status: 200 }); 

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 }); 
    }
};

export { POST };