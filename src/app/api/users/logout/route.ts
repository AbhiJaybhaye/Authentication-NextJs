import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = new NextResponse(
            JSON.stringify({
                message: "Logout successful",
                success: true,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Remove the 'token' cookie by setting it to an empty value and expiring it
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
