import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

connect();

const POST = async (req: Request) => {
    try {
        const { email, otp } = await req.json();

        const user = await User.findOne({ email });

        if (!user) {            
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 }); 
        }

        if (user.otp !== otp || user.otpExpiry < new Date()) {
            return new Response(JSON.stringify({ error: "Invalid or expired OTP" }), { status: 400 }); 
        }
        return new Response(JSON.stringify({ success: true }), { status: 200 }); 
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 }); 
    }
};      

export { POST };