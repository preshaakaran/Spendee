'use server'

import connectToDB from "@/database"
import User from "@/models";
import Expense from "@/models/expense";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";



export async function registerUserAction(formData) {
  await connectToDB();
  try {
    const {userName, email, password} = formData;
    const checkUser = await User.findOne({email});
    if(checkUser) {
        return {
            message : "User already exists",
            success : false,
        }
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const newlyCreatedUser = new User({
        userName,
        email,
        password : hash,
    });

    const savedUser = await newlyCreatedUser.save();

    if(savedUser) {
        return {
            message : "User registered successfully",
            success : true,
            data : JSON.parse(JSON.stringify(savedUser)),
        }
    }else {
        return {
            message : "Error in registering user",
            success : false,
        }
    }
    
  } catch (error) {
    console.log(error);
    return {
        message : "Error in registering user",
        success : false,
    }
    
  }
}

export async function loginUserAction(formData) {
    await connectToDB();
    try {
        const {email, password} = formData;
        const checkUser = await User.findOne({email});
        if(!checkUser) {
            return {
                message : "Invalid credentials",
                success : false,
            }
        }
        const checkPassword = await bcryptjs.compare(password, checkUser.password);
        if(!checkPassword) {
            return {
                message : "Incorrect password",
                success : false,
            }
        }

        const createdTokenData ={
            id : checkUser._id,
            userName : checkUser.userName,
            email : checkUser.email,
        }

        const token = jwt.sign(createdTokenData, "DEFAULT_KEY", {
            expiresIn : "1d",
        });

        const getCookies = cookies();
        getCookies.set("token", token);

        return {
            message : "User logged in successfully",
            success : true,
            
        }
        
    }catch(error) {
        console.log(error);
        return {
            message : "Error in logging in user",
            success : false,
        }
    }
}


export async function fetchAuthUserAction() {
    await connectToDB();
    try {
      const getCookies = cookies();
      const token = getCookies.get("token")?.value || "";
      if (token === "") {
        return {
          success: false,
          message: "Token is invalid",
        };
      }
  
      const decodedToken = jwt.verify(token, "DEFAULT_KEY");
      const getUserInfo = await User.findOne({ _id: decodedToken.id });
  
      if (getUserInfo) {
        return {
          success: true,
          data: JSON.parse(JSON.stringify(getUserInfo)),
        };
      } else {
        return {
          success: false,
          message: "Some error occured ! Please try again",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Something went wrong! please try again",
      };
    }
  }

export async function logoutAction() {
    const getCookies = cookies();
    getCookies.set("token", "");
    return {
        message : "User logged out successfully",
        success : true,
    }
}



export async function addExpenseAction(email, formExp) {
    try {
        const { title, amount, type } = formExp;

        if (!title || !amount || !type) {
            return {
                message: "All fields are required.",
                success: false,
            };
        }

        const user = await User.findOne({ email });
        if (!user) {
            return {
                message: "User not found",
                success: false,
            };
        }


        const newExpense = new Expense({
            userId: user._id, 
            title,
            amount,
            type
        });

        const savedExp = await newExpense.save();
        if (savedExp) {
            return {
                message: "Expense added successfully",
                success: true,
                data: JSON.parse(JSON.stringify(savedExp)),
            };
        } else {
            return {
                message: "Error in saving expense",
                success: false,
            };
        }

    } catch (error) {
        console.error("Error in adding expense:", error);
        return {
            message: "Error in adding expense",
            success: false,
            error: error.message || "An unexpected error occurred.",
        };
    }
}


export async function fetchExpensesAction(email) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return {
                message: "User not found",
                success: false,
            };
        }

        
        const expenses = await Expense.find({ userId: user._id });
        if (expenses) {
            return {
                message: "Expenses fetched successfully",
                success: true,
                data: JSON.parse(JSON.stringify(expenses)),
            };
        } else {
            return {
                message: "Error in fetching expenses",
                success: false,
            };
        }

        
    } catch (error) {
        console.error("Error in fetching expenses:", error);
        return {
            message: "Error in fetching expenses",
            success: false,
            error: error.message || "An unexpected error occurred.",
        };

        
    }
}    


export async function deleteExpenses(expense) {
    try {
        const exp = await Expense.findById(expense._id);

        if (!exp) {
            return {
                message: "Expense not found.",
                success: false,
            };
        }

        await Expense.findByIdAndDelete(exp._id);

        return {
            message: "Expense deleted successfully.",
            success: true,
        };
        
    } catch (error) {
        console.error("Error in deleting expenses:", error);
        return {
            message: "Error in deleting expenses",
            success: false,
            error: error.message || "An unexpected error occurred.",
        };
    }
}


