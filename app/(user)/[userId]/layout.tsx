import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
// import { useRouter } from 'next/router'
export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: {userId : string}
}) {
    
    if (!params) {
        redirect("/")
    }
    const user = await prismadb.user.findFirst({
        where:{
            id : params.userId
        }
    })
    if(!user){
        redirect("/")
    }
    return (
        <>
            {/* <Navbar /> */}
            {children}
        </>
    )
}