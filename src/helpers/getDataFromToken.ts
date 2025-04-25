import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const userId = decodedToken.id;
        const userUsername = decodedToken.username;
        const userEmail = decodedToken.email;

        return {userId, userUsername, userEmail};
               
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error.message);
    }
};