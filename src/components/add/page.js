import { fetchAuthUserAction } from "@/actions"

export default async function Add(addExpense){
    const currentUser = await fetchAuthUserAction();
    const result = await addExpenseAction(currentUser?.data?.email, addExpense);

    return(
        <div>
            

            
        </div>
    )
}