"use client";

import Navbar from "@/components/navbar/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialExpenseFormData } from "../utils";
import { useState, useEffect } from "react";
import { addExpenseAction, deleteExpenses, fetchAuthUserAction, fetchExpensesAction } from "@/actions";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { set } from "mongoose";
import Link from "next/link";

export default function Upload() {
    const [sum,setSum]=useState(0);
    const [ui,setUi] = useState(true);
    const [showExp,setShowExp]=useState([]);
    const [current,setCurrent]=useState(null);
 
  const [addExpense, setAddExpense] = useState(initialExpenseFormData);
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    const currentUser = await fetchAuthUserAction();
    return currentUser?.data?.email;
  }


  async function handleView(){
    setUi(false);
    try {
        const email = await fetchUser(); 
        console.log(email);
  
        if(email){
          const expense = await fetchExpensesAction(email);
          console.log(expense)
          setShowExp(expense)
          console.log(showExp)
        }
        sums();

        
  

      } catch (error) {
            throw new Error(error);
      } 

   
  
  }

  async function sums() {
    let totalSum = 0; 

    setSum(0);
    if (showExp?.data?.length > 0) {
        
        showExp.data.forEach((expense) => {
           
            if (expense.type === "Expense") {
                totalSum -= expense.amount; 
            } else {
                totalSum += expense.amount; 
            }
        });
    }

    setSum(totalSum);
}

useEffect(() => {
    sums(); 
}, [showExp]);

useEffect(() => {
    sums(); 
}, [loading]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (message, type = "info") => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: type === "success" ? "green" : "red",
      stopOnFocus: true,
    }).showToast();
  };

  async function handleSubmit(e) {
    e.preventDefault(); 
    setLoading(true);

    try {
      const email = await fetchUser(); 
      console.log(email);

      if(email){
        const result = await addExpenseAction(email, addExpense);
        console.log(result);
      }

      showToast("Transaction added successfully!", "success");
      setAddExpense(initialExpenseFormData); 
    } catch (error) {
      showToast("Failed to add transaction.", "error");
    } finally {
      setLoading(false);
    }
  }



  async function handleDelete(expense) {
    try {
        
        await deleteExpenses(expense);
        showToast("Expense deleted successfully!", "success");
        
        
        await handleView(); 
    } catch (error) {
        showToast("Failed to delete expense.", "error");
        console.error("Error deleting expense:", error);
    }
}


  useEffect(() => {
    console.log("Updated expenses:", showExp);
}, [showExp]);

  return (
    <div className="bg-black h-[100vh] p-5">
       
      <div className="p-10 mt-5 gap-5 flex">
        <Link href="/"><img src="/arrow.png" alt="logo" className="h-10 w-10"/></Link>
        <Button onClick={(e)=>(setUi(true))}>Add a Transaction</Button>
        <Button onClick={handleView}>View Transactions</Button>
        <div className="flex">
          
          <Button onClick={sums}>Total</Button>
          <div className="text-white p-2 font-bold ml-5">{
            sum===0? null :sum
}</div>
          <div>

          </div>
        </div>
      </div>
      <div className="h-[65vh] p-5 m-2 bg-zinc-800 rounded-xl">
        {
            ui?(
                <div>
                    <h2 className="text-xl text-white">Transactions</h2>
        <div className="bg-zinc-900 rounded-lg shadow-md p-5 mt-5 pl-10 mr-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-5 w-[94%]"
          >
            <select
              name="type"
              value={addExpense.type}
              onChange={handleChange}
              className="p-4 rounded-sm w-[20vw]"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="p-3 bg-zinc-800 rounded-lg text-white"
              value={addExpense.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="Amount"
              className="p-3 bg-zinc-800 rounded-lg text-white"
              value={addExpense.amount}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 p-3 text-white rounded-lg"
              disabled={loading} 
            >
              {loading ? "Adding..." : "Done"}
            </button>
          </form>
        </div>
                </div>
            ):(
                <div>
                    <h2 className="text-xl text-white p-5">Transactions</h2>
                    <div className="max-h-[50vh] overflow-y-auto scrollbar-hide">
                    {showExp?.data?.length > 0 ? (
              showExp?.data.map((expense, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-zinc-900 rounded-lg shadow-md mb-2">
                  <div className="flex flex-col">
                    <div className="text-white font-bold">{expense.title}</div>
                    {
                        expense.type==="Expense"?(<div className="text-red-400">{expense.amount}</div>):(<div className="text-green-400">{expense.amount}</div>)
                    }
                  </div>
                  <div className="flex">

                    <Button className="bg-red-950 text-white p-2 rounded-lg hover:bg-red-900" onClick={() => handleDelete(expense)}>Delete</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white">No transactions found.</div>
            )}
                    </div>
                    </div>
                
            )
        }
      </div>
    </div>
  );
}
