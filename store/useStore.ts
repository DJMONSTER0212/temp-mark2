import { create } from "zustand";


type User = {
    user : any
    userId : string,
    setUser : (newUser : any) => void,
    setUserId : (newUserId : string) => void
}

export const useUserStore = create<User>((set)=>({
    user : null,
    setUser : (newUser : any) => set({user : newUser}),
    userId : "",
    setUserId : (newUserId : string) => set({userId : newUserId})
}))

