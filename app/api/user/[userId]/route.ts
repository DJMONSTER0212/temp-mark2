import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    {params} : {params : {userId: string}}
){
    try {
        if(!params.userId) {
            return new NextResponse("userId is Required", { status: 400 });
        }
        console.log(params)
        const user = await prismadb.user.findUnique({
            where:{
                id : params.userId
            },
            include:{
                results : true
            }
        })
        // console.log(user)
        if(!user){
            return new NextResponse("User not found",{status:404});
        }
        else {
            return new NextResponse(JSON.stringify(user),{status:200});
        }
    } catch (error) {
        console.error("[GET USER]",error);
        return new NextResponse("Something went wrong",{status:500});
    }
}