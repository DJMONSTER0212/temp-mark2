"use client";
import Link from "next/link"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useUserStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const userId = useUserStore((state)=>state.userId);
    const router = useRouter();
    console.log(userId)
    if(!userId){
        // router.push("/");
    }
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Link
                href={`/${userId}`}
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                <Image src={"/logomark2.png"} alt="collegelogo" width={50} height={50}/>
            </Link>

        </nav>
    )
}