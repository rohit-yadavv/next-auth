import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import connect from "@/dbconfig/dbconfig";

connect();
export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findOne({ _id: userID }).select('-password');
        return NextResponse.json({
            message: "User Found",
            data: user,
        })
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message
            }, { status: 500 }
        )
    }
}