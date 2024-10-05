'use client'

import { logoutAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


function LogOut() {
    const router = useRouter();
    async function handleLogOut() {
        await logoutAction();
    }    
    return (
        <button onClick={handleLogOut}>
            Logout
        </button>
    )
}

export default LogOut;