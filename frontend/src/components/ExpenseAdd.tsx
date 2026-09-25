import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
    addExpense: (expense:Expense) => void
}

const ExpenseAdd = ({addExpense}:ExpenseAddProps) => {
    const ran = Number(Math.random());
    const idE = Date.now().toString();
    const exp : Expense = {
        id: idE,
        date: new Date().toISOString(),
        description: `New expense ${idE}`,
        payer: ran>0.5 ? "Alice" : "Bob",
        amount: ran*100
    }
    
    return(
        <div>
            <button onClick={()=>addExpense(exp)}>Add</button>
        </div>
    )
}

export default ExpenseAdd;