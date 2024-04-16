import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const {examName,mathsMarks,physicsMarks,chemistryMarks,csmarks,englishMarks,overall,userId} = body;
        const user = await prismadb.user.findUnique({
            where:{
                id : userId
            }
        })
        if(!user){
            return new NextResponse("User not found",{status:404});
        }
        const result = await prismadb.result.create({
            data:{
                examName,
                mathsMarks,
                physicsMarks,
                chemistryMarks,
                csmarks,
                englishMarks,
                overall,
                userId
            }
        })
        return new NextResponse(JSON.stringify(result),{status:200});
    } catch (error) {
        console.error("[RESULT Create]", error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}