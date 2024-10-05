

import SignIn from "@/app/sign-in/page";
import LogOut from "../log-out";
import { redirect } from "next/navigation";
import SignUp from "@/app/sign-up/page";





export default function Navbar({currentUser}) {
    
    
    
    return (
        <div className="p-5 h-12 w-full bg-zinc-900 rounded-lg">
            <div className="container mx-auto flex justify-between items-center h-full">

                <div className="flex ">
                    <img src="/logo.png" alt="logo" className="h-11 w-11" />
                    <h1 className="text-white p-3 text-xl">Spendee</h1>
                </div>
                <div className="flex gap-10">
                    <button className=" text-white text-lg" >
                        {
                            currentUser?.success ? <LogOut /> : <SignIn />
                        }
                        </button>
                    <button className=" text-white text-lg">
                        {
                            currentUser?.success ? <div className="flex gap-5"><img src="/user.png" className="h-8 w-8" /><p>{currentUser?.data?.email}</p> </div> : <SignUp />
                        }
                    </button>
                </div>
            </div>
            
        </div>
    )
}    