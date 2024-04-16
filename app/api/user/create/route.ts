import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const bcrypt = require("bcrypt");

export async function POST(
    req : Request,
){
    try {
        const body = await req.json();
        const {firstName, lastName,rollno,mobileNo,dob,bGroup,stream,password,attendance,isFeePaid,transportManagement} = body;
        if(!firstName || !lastName || !rollno || !password ||!attendance||!isFeePaid||!transportManagement) return new Response('Missing fields',{status:404});
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await prismadb.user.create({
            data : {
                firstName,
                lastName,
                rollno,
                mobileNo,
                dob,
                bgroup: bGroup,
                password : hashedPassword,
                stream,
                attendance,
                isFeePaid,
                transportManagement
            }
        })
        if(user){
            return NextResponse.json(user,{status: 200});
        }

    } catch (error) {
        console.log("[USER create ERROR]",error);
        return new NextResponse("Something went wrong",{status:500});
    }
}