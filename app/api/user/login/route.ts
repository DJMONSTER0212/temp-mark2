import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
// import bcrypt from "bcrypt"
const bcrypt = require("bcrypt");
export async function POST(
    req : Request,
){
    try {
        const body = await req.json();
        
        const {rollno , password} = body;
        if(!rollno){
            return new NextResponse("Unauthorized",{status:401});
        }
        if(!password){
            return new NextResponse("Name is Required",{status:400});
        }
        let upperCaseRollno = rollno.toUpperCase();
        console.log(upperCaseRollno);
        const user = await prismadb.user.findUnique({
            where :{
                rollno : upperCaseRollno
            }
        });
        if(!user){
            return new NextResponse("User not found",{status:404});
        }
        else {
            const result  = await bcrypt.compare(password,user.password);
            if(result){
                return new NextResponse(JSON.stringify(user),{status:200});
            }
            else {
                return new NextResponse("Unauthorized",{status:401});
            }
        }
    } catch (error) {
        console.log("[USER LOGIN]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}