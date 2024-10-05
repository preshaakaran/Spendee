"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


import { Button } from "@/components/ui/button";
import { useState } from "react";

import CommonFormElement from "@/components/form-element/page";
import { useRouter } from "next/navigation";
import { registerUserAction } from "@/actions";
import { initialSignUpFormData, userRegistrationFormControls } from "../utils";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';


function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const router = useRouter();
  const [state, setState] = useState(false);
  const showToast = (message, type = "info") => {
    Toastify({
      text: message,
      duration: 3000, // Duration in milliseconds
      close: true, // Show close button
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: type === "success" ? "green" : "red",
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
  };
  

  function handleSignUpBtnValid() {


    return Object.keys(signUpFormData).every(
      (key) => signUpFormData[key].trim() !== ""
    );
  }

  async function handleSignUp() {
    const result = await registerUserAction(signUpFormData);
    console.log(result);

    setState(false)
    showToast("Please Log In", "success");
  }

  return (
    <div>
      {
        state ? <div>
          <button onClick={() => setState(false)} className="text-lg">Close</button>
          <div className="bg-zinc-800 absolute z-50 p-10 rounded-2xl left-[40vw] top-[20vh] bg-opacity-50 backdrop-blur-lg">
        <h1>Registration</h1>
        <form action={handleSignUp} className="p-5">
          {userRegistrationFormControls.map((controlItem) => (
            <div key={controlItem.name}>
              <Label>{controlItem.label}</Label>
              <CommonFormElement
                
                value={signUpFormData[controlItem.name]}
                currentItem={controlItem}
                onChange={(event) =>
                  setSignUpFormData({
                    ...signUpFormData,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
          ))}
          <Button
            disabled={!handleSignUpBtnValid()}
            className="mt-5 disabled:opacity-65 "
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
        </div>
         : <button onClick={() => setState(true)}>Sign Up</button>
      }
    </div>
  );
}

export default SignUp;
