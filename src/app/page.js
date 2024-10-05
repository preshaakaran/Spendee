
import { fetchAuthUserAction } from "@/actions";
import LogOut from "@/components/log-out";

import Image from "next/image";
import Navbar from "@/components/navbar/page";
import { Button } from "@/components/ui/button";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import Link from "next/link";



export default async function Home() {
  const currentUser = await fetchAuthUserAction();
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
  


  
  

  return (
    <div className="bg-black h-[100vh] p-5">
      <Navbar currentUser={currentUser}/>

      <main className="flex justify-between p-10 m-10">
        <div className="text-white">
        <h2 className="text-5xl font-bold">
  Welcome, {currentUser?.success ? currentUser?.data?.userName : "User"}
</h2>
          
          <p className="text-3xl mt-5 w-[50vw]">Spendee helps users manage their finances by tracking daily expenses.</p>
          <div class="p-6 bg-zinc-900 rounded-lg shadow-md mt-5 text-xl">
          <ul class="list-disc list-inside space-y-2 w-[45vw]">
    
    <li class="flex items-center">
        <span class="mr-2 text-green-500">✔️</span>
        <span class="font-medium">Categorization:</span> Organize expenses into categories for better insight.
    </li>
    <li class="flex items-center">
        <span class="mr-2 text-green-500">✔️</span>
        <span class="font-medium">Expense Display:</span> View and filter expenses by date or category.
    </li>

    <li class="flex items-center">
        <span class="mr-2 text-green-500">✔️</span>
        <span class="font-medium">Budget Insights:</span> Set monthly budgets and track spending.
    </li>
    <li class="flex items-center">
        <span class="mr-2 text-green-500">✔️</span>
        <span class="font-medium">Data Persistence:</span> Use local storage to retain expenses across sessions.
    </li>
    <li class="flex items-center">
        <span class="mr-2 text-green-500">✔️</span>
        <span class="font-medium">User-friendly Interface:</span> Simple and responsive design for easy navigation.
    </li>
    
</ul>

</div>
      <Button className="mt-5 p-5 absolute left-[25vw] bg-violet-600 text-xl hover:bg-violet-700"><Link href={currentUser?.success ?'/upload':'/'} >Get Started</Link></Button>

        </div>

        <img src="/file.png" alt="logo" className="h-[60vh] w-[60vh]" />

      </main>
     

    </div>
  );
}