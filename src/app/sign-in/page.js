"use client";

import { useState } from "react";
import { initialLoginFormData, userLoginFormControls } from "../utils";
import { loginUserAction } from "@/actions";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import CommonFormElement from "@/components/form-element/page";
import { Button } from "@/components/ui/button";
import { set } from "mongoose";

function SignIn() {
    const [loginFormData, setLoginFormData] = useState(initialLoginFormData);
    const router = useRouter();
    const [state, setState] = useState(false);
    
    async function handleSignIn() {
        const result = await loginUserAction(loginFormData);
        console.log(result);
        if (result?.success) router.push("/");
    }
  return (
    <div>
        {
            state ?(<div>
                <button onClick={() => setState(false)} className="text-lg">Close</button>
                <div className="bg-zinc-800 absolute z-50 p-10 rounded-2xl left-[40vw] top-[20vh] bg-opacity-50 backdrop-blur-lg">
                <form action={handleSignIn} className="">
                {
                    userLoginFormControls.map((controlItem) => (
                        <div key={controlItem.name} className="p-5">
                            <Label>{controlItem.label}</Label>
                            <CommonFormElement
                                value={loginFormData[controlItem.name]}
                                currentItem={controlItem}
                                onChange={(event) =>
                                    setLoginFormData({
                                        ...loginFormData,
                                        [event.target.name]: event.target.value,
                                    })
                                }
                            />
                        </div>
                    ))
                }
                <Button
                    type="submit">
                    Login
                    </Button>
              </form></div>
            </div>

                
            ) : <button onClick={() => setState(true)}>
            Log In
            </button>
        }
      
      
    </div>
  );
}

export default SignIn;
