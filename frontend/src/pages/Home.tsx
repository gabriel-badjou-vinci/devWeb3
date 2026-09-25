import ExpenseItem from "../components/ExpenseItem"
import ExpenseAdd from "../components/ExpenseAdd"
import useExpenses from "../hooks/useExpenses"

const Home = () => {
    const ue = useExpenses();
    return(
        <div>
            {ue.expenses.map((e) => 
                <div key={e.id}>
                    <ExpenseItem expenseItem={e} />    
                </div>
            )}
            <ExpenseAdd addExpense={ue.addExpense}/>
            <button onClick={ue.resetExpense}>Reset Data</button>
        </div>
    )
}

export default Home;