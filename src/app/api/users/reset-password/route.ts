import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

connect();

const POST = async (req: Request) => {

    try {
        const { email, password } = await req.json();
        const user = await User.findOne({ email }); 
        
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 }); 
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        return new Response(JSON.stringify({ success: true }), { status: 200 }); 
        
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 }); 
    }
};  

export { POST };