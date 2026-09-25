import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
    expenseItem : Expense
}

const ExpenseItem = ({expenseItem} : ExpenseItemProps) => {
    return(
        <div>
            <p>{expenseItem.date}</p>
            <p>{expenseItem.description}</p>
            <p>{expenseItem.payer}</p>
            <p>${expenseItem.amount.toFixed(2)}</p>
            <p>-----</p>
        </div>
    )
}

export default ExpenseItem;