"use client"
import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/useStore"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    // const [isMounted, setIsmounted] = useState(false);
    const [isMounted, setIsmounted] = useState(false);



    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const setUserId = useUserStore((state) => state.setUserId)
    const [regno, setregno] = useState("");
    const [password, setPassword] = useState("");

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        try {
            console.log(regno,password)
            setIsLoading(true)
            const { data } = await axios.post(`/api/user/login`, { rollno: regno, password: password })
            if (data) {
                // console.log(data);
                setUserId(data.id);

                router.push(`/${data.id}`);
                toast.success("Logged In Successfully");

            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsmounted(true)
    }, []);

    if (!isMounted) return null;

    return (
        <div className={cn("grid gap-6 h-screen", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            // value={}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setregno(e.target.value)}
                            placeholder="2021..."
                            type="text"
                            autoCapitalize="none"
                            // autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder="password"
                            type="password"
                            autoCapitalize="none"
                            // autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />

                    </div>

                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                    </Button>
                </div>
            </form>

        </div>
    )
}