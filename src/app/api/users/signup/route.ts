import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){

    try {

        //fetching the request body
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json(
              { error: "Missing required fields", success: false},
              { status: 400 }
            );
          }

        //check if user already exists
        const user = await User.findOne({email});
        if(user){

            return NextResponse.json(
                {error: "User already exists", success: false}, 
                {status: 400}
            );
        };

        //hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

       
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        //storing the new user in the database
        const savedUser = await newUser.save(); 

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, {status: 201});
        

    } catch (error: any) {

        return NextResponse.json({
            error: error.message,
            success: false,
            },
            {status: 500}
        );
    };
}